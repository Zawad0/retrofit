import { useEffect, useState } from 'react'
import './AdminDashboard.css'
import { API_BASE as API } from './api.js'

const statuses = ['Placed', 'Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled']

export default function AdminDashboard() {
  const [tab, setTab] = useState('Users')
  const [stats, setStats] = useState({})
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')
  const [busy, setBusy] = useState('')
  const token = () => localStorage.getItem('token')
  const request = async (path, options = {}) => {
    const response = await fetch(`${API}/admin${path}`, { ...options, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}`, ...options.headers } })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Request failed')
    return data
  }
  const load = async () => {
    try {
      setError('')
      const [s, u, p, o] = await Promise.all([request('/stats'), request('/users'), request('/products'), request('/orders')])
      setStats(s); setUsers(u); setProducts(p); setOrders(o)
    } catch (e) { setError(e.message) }
  }
  useEffect(() => { load() }, [])
  const moderate = async (id, moderationStatus) => { setBusy(id); try { await request(`/products/${id}/moderate`, { method: 'PUT', body: JSON.stringify({ moderationStatus }) }); await load() } catch (e) { setError(e.message) } finally { setBusy('') } }
  const updateOrder = async (id, status) => { setBusy(id); try { await request(`/orders/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }); await load() } catch (e) { setError(e.message) } finally { setBusy('') } }
  const verifyBkashPayment = async (id) => { setBusy(id); try { await request(`/orders/${id}`, { method: 'PUT', body: JSON.stringify({ paymentStatus: 'paid' }) }); await load() } catch (e) { setError(e.message) } finally { setBusy('') } }
  const approveSeller = async (id) => { setBusy(id); try { await request(`/users/${id}/role`, { method: 'PUT', body: JSON.stringify({ role: 'seller' }) }); await load() } catch (e) { setError(e.message) } finally { setBusy('') } }
  const removeUser = async (id) => { if (!window.confirm('Remove this user? This cannot be undone.')) return; setBusy(id); try { await request(`/users/${id}`, { method: 'DELETE' }); await load() } catch (e) { setError(e.message) } finally { setBusy('') } }
  return <section className="admin-dashboard">
    <header className="admin-heading"><div><p className="eyebrow">RETROFIT ADMIN</p><h1>Dashboard</h1><p>Review listings, support the community, and keep orders moving.</p></div><button className="admin-refresh" onClick={load}>Refresh</button></header>
    {error && <p className="admin-error" role="alert">{error}</p>}
    <div className="admin-stats">{[['Total users', stats.totalUsers], ['Total orders', stats.totalOrders], ['Revenue', `৳ ${Number(stats.totalRevenue || 0).toLocaleString()}`], ['Pending listings', stats.pendingProducts]].map(([label, value]) => <article key={label}><span>{label}</span><strong>{value ?? '—'}</strong></article>)}</div>
    <nav className="admin-tabs">{['Users', 'Products Moderation', 'Orders Overview'].map((name) => <button key={name} className={tab === name ? 'active' : ''} onClick={() => setTab(name)}>{name}</button>)}</nav>
    {tab === 'Users' && <div className="admin-table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th></th></tr></thead><tbody>{users.map((u) => <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td><span className="admin-pill">{u.role}</span>{u.sellerRequested && <small className="seller-request-badge">seller requested</small>}</td><td>{new Date(u.createdAt).toLocaleDateString()}</td><td>{u.sellerRequested && <button disabled={busy === u._id} onClick={() => approveSeller(u._id)}>Approve seller</button>} {u.role !== 'admin' && <button className="admin-danger" disabled={busy === u._id} onClick={() => removeUser(u._id)}>Remove</button>}</td></tr>)}</tbody></table>{!users.length && <p className="admin-empty">No users found.</p>}</div>}
    {tab === 'Products Moderation' && <div className="admin-listings">{products.map((p) => <article className="admin-listing" key={p._id}><img src={p.image || p.imageUrl} alt=""/><div className="admin-listing-info"><span className="admin-pill">{p.moderationStatus || 'approved'}</span><h2>{p.name}</h2><p>{p.group} · {p.type || p.style} · ৳ {p.price}</p><small>Seller: {p.seller?.name || '—'}{p.seller?.email ? ` · ${p.seller.email}` : ''}</small></div><div className="admin-actions"><button disabled={busy === p._id} onClick={() => moderate(p._id, 'approved')}>Approve</button><button className="admin-danger" disabled={busy === p._id} onClick={() => moderate(p._id, 'rejected')}>Reject</button></div></article>)}{!products.length && <p className="admin-empty">No pending listings.</p>}</div>}
    {tab === 'Orders Overview' && <div className="admin-table-wrap"><table><thead><tr><th>Order</th><th>Buyer</th><th>Date</th><th>Total</th><th>Payment</th><th>TrxID / sender</th><th>Payment review</th><th>Order status</th></tr></thead><tbody>{orders.map((o) => <tr key={o._id}><td>{o.orderReference}</td><td>{o.user?.name || o.deliveryDetails?.fullName || 'Guest'}</td><td>{new Date(o.createdAt).toLocaleDateString()}</td><td>৳ {Number(o.total).toLocaleString()}</td><td>{o.paymentMethod === 'cash' ? 'Cash on delivery' : o.paymentMethod}<br /><small>{o.paymentStatus || 'pending'}</small></td><td>{o.bkashDetails?.transactionId ? <><strong>{o.bkashDetails.transactionId}</strong><br /><small>{o.bkashDetails.payerNumber}</small></> : '—'}</td><td>{o.paymentMethod === 'bkash' && o.paymentStatus !== 'paid' ? <button disabled={busy === o._id} onClick={() => verifyBkashPayment(o._id)}>Verify received</button> : o.paymentStatus === 'paid' ? 'Verified' : 'Pay on delivery'}</td><td><select value={o.status} disabled={busy === o._id} onChange={(e) => updateOrder(o._id, e.target.value)}>{statuses.map((s) => <option key={s}>{s}</option>)}</select></td></tr>)}</tbody></table>{!orders.length && <p className="admin-empty">No orders found.</p>}</div>}
  </section>
}
