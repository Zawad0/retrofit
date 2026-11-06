import { useEffect, useState } from 'react';
import './marketplace-features.css';
import { API_BASE } from './api.js';
const getToken = () => localStorage.getItem('token');
const callApi = async (url, options = {}) => { const res = await fetch(url.startsWith('/api/') ? API_BASE + url.slice(4) : url, { ...options, headers: { Authorization: 'Bearer ' + (getToken() || ''), ...(options.body ? { 'Content-Type': 'application/json' } : {}) } }); const data = await res.json(); if (!res.ok) throw new Error(data.message || 'Request failed'); return data; };
const idOf = (item) => item?._id || item?.id;
export function WishlistButton({ product }) { const [saved, setSaved] = useState(false); useEffect(() => { if (getToken()) callApi('/api/users/wishlist').then((d) => setSaved((d.wishlist || d || []).some((x) => String(idOf(x)) === String(idOf(product))))).catch(() => { }); }, [product]); return <button className="feature-heart" onClick={async (e) => { e.stopPropagation(); if (!getToken()) return alert('Please sign in first.'); try { await callApi('/api/users/wishlist/' + idOf(product), { method: 'POST' }); setSaved(!saved); } catch (err) { alert(err.message); } }} aria-label="Toggle wishlist">{saved ? '♥' : '♡'}</button>; }
export function WishlistPage() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const load = () => {
    if (!getToken()) { setError('Sign in to view your wishlist.'); return; }
    callApi('/api/users/wishlist').then((data) => setItems(data.wishlist || data || [])).catch((err) => setError(err.message));
  };
  useEffect(() => { if (open) load(); }, [open]);
  const remove = async (productId) => {
    try { await callApi('/api/users/wishlist/' + productId, { method: 'DELETE' }); setItems((current) => current.filter((item) => idOf(item) !== productId)); }
    catch (err) { setError(err.message); }
  };
  return <>
    <button className="wishlist-launcher" type="button" onClick={() => { setError(''); setOpen(true); }}>a Wishlist</button>
    {open && <div className="wishlist-backdrop" onClick={() => setOpen(false)}>
      <section className="wishlist-drawer" role="dialog" aria-modal="true" aria-label="Your wishlist" onClick={(event) => event.stopPropagation()}>
        <header className="wishlist-drawer-header"><div><span className="feature-eyebrow">YOUR SAVED FINDS</span><h2>Wishlist</h2></div><button type="button" aria-label="Close wishlist" onClick={() => setOpen(false)}>�</button></header>
        {error && <p role="alert" className="feature-error">{error}</p>}
        {!error && items.length === 0 && <p>Your wishlist is empty. Save something you love from the marketplace.</p>}
        <div className="wishlist-items">{items.map((item) => <article className="wishlist-item" key={idOf(item)}>
          <img src={item.images?.[0]?.url || item.image || ''} alt={item.name || item.title || 'Saved product'} />
          <div><strong>{item.name || item.title || 'Pre-loved find'}</strong><p>{item.price ? 'Tk ' + item.price : ''}</p></div>
          <button type="button" onClick={() => remove(idOf(item))}>Remove</button>
        </article>)}</div>
      </section>
    </div>}
  </>;
}
export function SellerOffers() { const [offers, setOffers] = useState([]); const [error, setError] = useState(''); const load = () => callApi('/api/offers/seller').then((d) => setOffers(d.offers || d || [])).catch((e) => setError(e.message)); useEffect(() => { load(); }, []); const decide = async (o, status) => { try { await callApi('/api/offers/' + o._id, { method: 'PUT', body: JSON.stringify({ status }) }); load(); } catch (e) { setError(e.message); } }; return <section className="feature-page"><h2>Buyer Offers</h2>{error && <p>{error}</p>}{offers.map((o) => <article className="feature-offer" key={o._id}><div><strong>{o.product?.name || 'Product'}</strong><span>BDT {o.offeredPrice} - {o.buyer?.name || 'Buyer'} - {o.status}</span></div>{o.status === 'Pending' && <div><button onClick={() => decide(o, 'Accepted')}>Accept</button><button onClick={() => decide(o, 'Rejected')}>Reject</button></div>}</article>)}</section>; }
export default function MarketplaceFeaturePanel({ product }) { const [offerOpen, setOfferOpen] = useState(false); const [price, setPrice] = useState(''); const [notice, setNotice] = useState(''); const [reviews, setReviews] = useState([]); const [rating, setRating] = useState(5); const [comment, setComment] = useState(''); const loadReviews = () => callApi('/api/products/' + idOf(product) + '/reviews').then((d) => setReviews(d.reviews || d || [])).catch(() => { }); useEffect(() => { if (product) loadReviews(); }, [product]); const sendOffer = async (e) => { e.preventDefault(); try { await callApi('/api/offers', { method: 'POST', body: JSON.stringify({ product: idOf(product), offeredPrice: Number(price) }) }); setNotice('Offer sent.'); setOfferOpen(false); } catch (e) { setNotice(e.message); } }; const sendReview = async (e) => { e.preventDefault(); try { await callApi('/api/products/' + idOf(product) + '/reviews', { method: 'POST', body: JSON.stringify({ rating: Number(rating), comment }) }); setComment(''); setNotice('Review submitted.'); loadReviews(); } catch (e) { setNotice(e.message); } }; return <div className="marketplace-feature-panel"><div className="feature-actions"><WishlistButton product={product} /><button type="button" onClick={() => { if (!getToken()) return setNotice('Please sign in to make an offer.'); setPrice(String(Math.max(1, Math.floor(Number(product.price || 1) * .85)))); setOfferOpen(true); }}>Make an Offer</button></div>{notice && <p role="status">{notice}</p>}{offerOpen && <div className="feature-modal-backdrop"><form className="feature-modal" onSubmit={sendOffer}><button type="button" onClick={() => setOfferOpen(false)}>Close</button><h3>Make an Offer</h3><p>Listed price: BDT {product.price}</p><label>Your offer <input type="number" min="1" max={product.price} value={price} onChange={(e) => setPrice(e.target.value)} required /></label><button type="submit">Send offer</button></form></div>}<section className="feature-reviews"><h3>Reviews {product.averageRating ? Number(product.averageRating).toFixed(1) + ' / 5' : ''}</h3>{reviews.map((r) => <article className="feature-review" key={r._id}><strong>{r.rating} / 5</strong><span>{r.user?.name || 'Customer'}</span><p>{r.comment}</p></article>)}<form onSubmit={sendReview}><label>Rating <select value={rating} onChange={(e) => setRating(e.target.value)}>{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}</select></label><label>Review <textarea value={comment} onChange={(e) => setComment(e.target.value)} required maxLength="1200" /></label><button type="submit">Submit Review</button><small>Only delivered buyers may submit a review.</small></form></section></div>; }
