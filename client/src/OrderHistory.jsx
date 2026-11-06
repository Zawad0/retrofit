import { useEffect, useState } from 'react';
import { API_BASE } from './api.js';
import EcoMetrics from './EcoMetrics.jsx';
import OrderTracker from './OrderTracker.jsx';

function useOrders(endpoint) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const refresh = () => fetch(`${API_BASE}${endpoint}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` } })
    .then(async (response) => { const data = await response.json(); if (!response.ok) throw new Error(data.message || 'Unable to load orders.'); setOrders(data.orders || []); })
    .catch((err) => setError(err.message));
  useEffect(() => { refresh(); }, [endpoint]);
  return { orders, error, refresh };
}

export function OrderHistory() {
  const { orders, error } = useOrders('/orders/history');
  return <main className="order-history-page"><div className="order-history-title"><span>YOUR RETROFIT ACCOUNT</span><h1>Order history</h1><p>Follow every order from our closet to your door.</p></div>
    <EcoMetrics scope="me" />
    {error && <p className="tracker-error" role="alert">{error}</p>}
    {!error && orders.length === 0 && <p className="order-empty">Your order history will appear here after checkout.</p>}
    <div className="order-history-list">{orders.map((order) => <article className="order-history-card" key={order._id || order.trackingReference}>
      <div className="order-history-meta"><strong>{order.trackingReference || order.orderReference}</strong><span>{new Date(order.createdAt).toLocaleDateString()}</span><span>{order.total ? `Tk ${order.total}` : ''}</span></div>
      <OrderTracker reference={order.trackingReference} />
    </article>)}</div>
  </main>;
}

export function SellerOrderManager() {
  const { orders, error, refresh } = useOrders('/orders/seller');
  return <section className="seller-order-manager"><div className="seller-order-heading"><div><span>FULFILLMENT</span><h2>Order tracking</h2></div><button type="button" onClick={refresh}>Refresh</button></div>
    {error && <p className="tracker-error" role="alert">{error}</p>}
    {!error && orders.length === 0 && <p>No customer orders to fulfill yet.</p>}
    {orders.map((order) => <article className="seller-order-card" key={order._id}><div><strong>{order.trackingReference || order.orderReference || 'Order'}</strong><span>{order.status}</span></div><OrderTracker reference={order.trackingReference} orderId={order._id} canUpdate onUpdate={refresh} /></article>)}
  </section>;
}
