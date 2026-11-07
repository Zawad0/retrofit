import { useCallback, useEffect, useState } from 'react'
import './AdminDashboard.css'
import { API_BASE as API } from './api.js'

const tabs = ['Users', 'Products Moderation', 'Orders Overview']
const statuses = ['Placed', 'Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled']

async function adminRequest(path, options = {}) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API}/admin${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(data.message || 'The request could not be completed.')
    error.status = response.status
    throw error
  }
  return data
}

function accessMessage(error) {
  if (error.status === 401) return 'Sign in with your administrator account to open this dashboard.'
  if (error.status === 403) return 'This account does not have admin access yet. Follow the one-time setup steps below, then sign out and sign in again.'
  return error.message || 'Could not load the admin dashboard. Please try again.'
}

export default function AdminDashboard() {
  const [tab, setTab] = useState(tabs[0])
  const [stats, setStats] = useState({})
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState('')
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [nextStats, nextUsers, nextProducts, nextOrders] = await Promise.all([
        adminRequest('/stats'),
        adminRequest('/users'),
        adminRequest('/products'),
        adminRequest('/orders'),
      ])
      setStats(nextStats)
      setUsers(nextUsers)
      setProducts(nextProducts)
      setOrders(nextOrders)
    } catch (requestError) {
      setError({ message: accessMessage(requestError), status: requestError.status })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const runAction = async (id, action) => {
    setBusy(id)
    setError(null)
    try {
      await action()
      await load()
    } catch (requestError) {
      setError({ message: accessMessage(requestError), status: requestError.status })
    } finally {
      setBusy('')
    }
  }

  const moderate = (id, moderationStatus) => runAction(id, () => adminRequest(`/products/${id}/moderate`, {
    method: 'PUT', body: JSON.stringify({ moderationStatus }),
  }))
  const updateOrder = (id, status) => runAction(id, () => adminRequest(`/orders/${id}`, {
    method: 'PUT', body: JSON.stringify({ status }),
  }))
  const verifyBkashPayment = (id) => runAction(id, () => adminRequest(`/orders/${id}`, {
    method: 'PUT', body: JSON.stringify({ paymentStatus: 'paid' }),
  }))
  const approveSeller = (id) => runAction(id, () => adminRequest(`/users/${id}/role`, {
    method: 'PUT', body: JSON.stringify({ role: 'seller' }),
  }))
  const removeUser = (id) => {
    if (!window.confirm('Remove this user? This cannot be undone.')) return
    return runAction(id, () => adminRequest(`/users/${id}`, { method: 'DELETE' }))
  }

  return <section className="admin-dashboard">
    <header className="admin-heading">
      <div>
        <p className="eyebrow">RETROFIT · CONTROL ROOM</p>
        <h1>Admin dashboard</h1>
        <p>Review listings, support the community, and keep orders moving.</p>
      </div>
      <button className="admin-refresh" onClick={load} disabled={loading}>
        {loading ? 'Updating…' : '↻ Refresh overview'}
      </button>
    </header>

    {error && <div className="admin-notice" role="alert">
      <div><strong>{error.status === 401 || error.status === 403 ? 'Admin access needed' : 'Something needs attention'}</strong><p>{error.message}</p></div>
      {(error.status === 401 || error.status === 403) && <details className="admin-access-guide">
        <summary>Set up admin access</summary>
        <ol>
          <li>Set a valid MongoDB Atlas connection string in <code>server/.env</code>.</li>
          <li>From the <code>server</code> folder, run <code>node scripts/set-admin-role.js chaitymetrouni@gmail.com</code>.</li>
          <li>Sign out and sign in again so the app refreshes your account role.</li>
        </ol>
        <small>The setup command changes only the matching account's role. It never prints database credentials.</small>
      </details>}
      <button className="admin-notice-close" onClick={() => setError(null)} aria-label="Dismiss notice">×</button>
    </div>}

    <div className="admin-stats" aria-label="Store summary">
      {[
        ['Total users', stats.totalUsers, 'People in the community'],
        ['Total orders', stats.totalOrders, 'Orders placed'],
        ['Paid revenue', `৳ ${Number(stats.totalRevenue || 0).toLocaleString()}`, 'Confirmed payments'],
        ['Pending listings', stats.pendingProducts, 'Waiting for review'],
      ].map(([label, value, caption], index) => <article className={`admin-stat admin-stat-${index + 1}`} key={label}>
        <span>{label}</span><strong>{loading ? '—' : value ?? '0'}</strong><small>{caption}</small>
      </article>)}
    </div>

    <div className="admin-workspace">
      <nav className="admin-tabs" role="tablist" aria-label="Admin sections">
        {tabs.map((name) => <button key={name} role="tab" aria-selected={tab === name} className={tab === name ? 'active' : ''} onClick={() => setTab(name)}>{name}</button>)}
      </nav>

      {loading ? <div className="admin-loading" role="status"><span className="admin-spinner" />Loading dashboard data…</div> : <>
        {tab === 'Users' && <div className="admin-table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead><tbody>
          {users.map((user) => <tr key={user._id}><td data-label="Name">{user.name}</td><td data-label="Email">{user.email}</td><td data-label="Role"><span className="admin-pill">{user.role}</span>{user.sellerRequested && <small className="seller-request-badge">seller requested</small>}</td><td data-label="Joined">{new Date(user.createdAt).toLocaleDateString()}</td><td data-label="Actions" className="admin-row-actions">{user.sellerRequested && <button disabled={busy === user._id} onClick={() => approveSeller(user._id)}>Approve seller</button>}{user.role !== 'admin' && <button className="admin-danger" disabled={busy === user._id} onClick={() => removeUser(user._id)}>Remove</button>}</td></tr>)}
        </tbody></table>{!users.length && <p className="admin-empty">No users found yet.</p>}</div>}

        {tab === 'Products Moderation' && <div className="admin-listings">
          {products.map((product) => <article className="admin-listing" key={product._id}>
            <img src={product.image || product.imageUrl} alt={product.name} loading="lazy" />
            <div className="admin-listing-info"><span className={`admin-pill status-${product.moderationStatus || 'approved'}`}>{product.moderationStatus || 'approved'}</span><h2>{product.name}</h2><p>{product.group} · {product.type || product.style} · ৳ {Number(product.price).toLocaleString()}</p><small>Seller: {product.seller?.name || '—'}{product.seller?.email ? ` · ${product.seller.email}` : ''}</small></div>
            <div className="admin-actions"><button disabled={busy === product._id} onClick={() => moderate(product._id, 'approved')}>Approve</button><button className="admin-danger" disabled={busy === product._id} onClick={() => moderate(product._id, 'rejected')}>Reject</button></div>
          </article>)}
          {!products.length && <p className="admin-empty">All caught up. No listings need review.</p>}
        </div>}

        {tab === 'Orders Overview' && <div className="admin-table-wrap"><table><thead><tr><th>Order</th><th>Buyer</th><th>Date</th><th>Total</th><th>Payment</th><th>TrxID / sender</th><th>Payment review</th><th>Order status</th></tr></thead><tbody>
          {orders.map((order) => <tr key={order._id}><td data-label="Order">{order.orderReference}</td><td data-label="Buyer">{order.user?.name || order.deliveryDetails?.fullName || 'Guest'}</td><td data-label="Date">{new Date(order.createdAt).toLocaleDateString()}</td><td data-label="Total">৳ {Number(order.total).toLocaleString()}</td><td data-label="Payment">{order.paymentMethod === 'cash' ? 'Cash on delivery' : order.paymentMethod}<br /><small>{order.paymentStatus || 'pending'}</small></td><td data-label="TrxID / sender">{order.bkashDetails?.transactionId ? <><strong>{order.bkashDetails.transactionId}</strong><br /><small>{order.bkashDetails.payerNumber}</small></> : '—'}</td><td data-label="Payment review">{order.paymentMethod === 'bkash' && order.paymentStatus !== 'paid' ? <button disabled={busy === order._id} onClick={() => verifyBkashPayment(order._id)}>Verify received</button> : order.paymentStatus === 'paid' ? 'Verified' : 'Pay on delivery'}</td><td data-label="Order status"><select aria-label={`Status for ${order.orderReference}`} value={order.status} disabled={busy === order._id} onChange={(event) => updateOrder(order._id, event.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}
        </tbody></table>{!orders.length && <p className="admin-empty">No orders to show yet.</p>}</div>}
      </>}
    </div>
  </section>
}
