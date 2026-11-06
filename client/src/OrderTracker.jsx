import { useEffect, useState } from 'react';
import { API_BASE } from './api.js';

const STAGES = ['Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
const token = () => localStorage.getItem('token');

export default function OrderTracker({ reference: initialReference = '', orderId, canUpdate = false, onUpdate }) {
  const [reference, setReference] = useState(initialReference);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function load(value = reference) {
    const clean = value.trim().toUpperCase();
    if (!/^RF-[A-F0-9]{6}$/.test(clean)) { setError('Enter a tracking code such as RF-A1B2C3.'); return; }
    setBusy(true); setError('');
    try {
      const response = await fetch(`${API_BASE}/orders/tracking/${encodeURIComponent(clean)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Tracking lookup failed.');
      setOrder(data.order);
    } catch (err) { setError(err.message); setOrder(null); }
    finally { setBusy(false); }
  }

  useEffect(() => { if (initialReference) load(initialReference); }, [initialReference]);

  async function advance() {
    if (!orderId || !order) return;
    const next = STAGES[STAGES.indexOf(order.status) + 1];
    if (!next) return;
    setBusy(true); setError('');
    try {
      const response = await fetch(`${API_BASE}/orders/${orderId}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` }, body: JSON.stringify({ status: next }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not update order.');
      setOrder(data.order); onUpdate?.(data.order);
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  const activeIndex = STAGES.indexOf(order?.status);
  return <section className="order-tracker">
    {!initialReference && <form className="tracker-search" onSubmit={(event) => { event.preventDefault(); load(); }}>
      <label htmlFor="tracking-reference">Track an order</label><div><input id="tracking-reference" value={reference} onChange={(event) => setReference(event.target.value)} placeholder="RF-A1B2C3" /><button disabled={busy}>{busy ? 'Checking...' : 'Track order'}</button></div>
    </form>}
    {error && <p className="tracker-error" role="alert">{error}</p>}
    {order && <div className="tracker-card">
      <div className="tracker-heading"><div><span>TRACKING REFERENCE</span><strong>{order.trackingReference}</strong></div><span className="tracker-current">{order.status}</span></div>
      <ol className="tracker-steps">{STAGES.map((stage, index) => <li key={stage} className={index < activeIndex ? 'complete' : index === activeIndex ? 'current' : ''}>
        <span className="tracker-dot">{index < activeIndex ? '✓' : index + 1}</span><span className="tracker-label">{stage}</span>
        <small>{order.statusHistory?.find((entry) => entry.status === stage)?.changedAt ? new Date(order.statusHistory.find((entry) => entry.status === stage).changedAt).toLocaleDateString() : ''}</small>
      </li>)}</ol>
      {canUpdate && orderId && activeIndex >= 0 && activeIndex < STAGES.length - 1 && <button className="tracker-advance" type="button" disabled={busy} onClick={advance}>Mark as {STAGES[activeIndex + 1]}</button>}
    </div>}
  </section>;
}
