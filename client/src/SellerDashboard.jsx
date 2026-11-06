import { useEffect, useState } from 'react';
import { uploadProductImage } from './cloudinaryUpload.js';
import './SellerDashboard.css';

import { API_BASE as API } from './api.js';
const groups = ['Women', 'Men', 'Kids', 'Accessories'];
const conditions = ['New', 'Like New', 'Good', 'Fair'];

export default function SellerDashboard({ onProductsChanged }) {
  const [products, setProducts] = useState([]); const [sales, setSales] = useState([]); const [tab, setTab] = useState('Listings');
  const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [error, setError] = useState(''); const [notice, setNotice] = useState('');
  const token = localStorage.getItem('token');
  const request = async (path, options = {}) => {
    const response = await fetch(`${API}/seller${path}`, { ...options, headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), Authorization: `Bearer ${token}`, ...options.headers } });
    const data = await response.json(); if (!response.ok) throw new Error(data.message || 'Request failed'); return data;
  };
  const load = async () => {
    setLoading(true); setError('');
    try { const [listingData, salesData] = await Promise.all([request('/products'), request('/sales')]); setProducts(listingData); setSales(salesData.sales || []); }
    catch (e) { setError(e.message); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const submit = async (event) => {
    event.preventDefault(); setError(''); setNotice(''); setSaving(true); const form = event.currentTarget;
    try {
      const image = await uploadProductImage(form.image.files[0], token); const group = form.group.value;
      const product = { name: form.name.value.trim(), description: form.description.value.trim(), price: Number(form.price.value), group, category: group, type: form.type.value.trim(), style: form.style.value, size: form.size.value.trim(), brand: form.brand.value.trim(), material: form.material.value.trim(), usedFor: form.usedFor.value.trim(), condition: form.condition.value, image, imageUrl: image };
      const response = await fetch(`${API}/products`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(product) }); const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not create listing.');
      form.reset(); setNotice('Listing submitted for admin review.'); setTab('Listings'); await load(); onProductsChanged?.();
    } catch (e) { setError(e.message); } finally { setSaving(false); }
  };
  const salesByProduct = new Map(sales.map((sale) => [String(sale.product), sale]));
  const activeCount = products.filter((p) => p.status === 'available' && (p.moderationStatus || 'approved') === 'approved').length;
  const totalSales = sales.reduce((sum, sale) => sum + sale.revenue, 0);
  return <section className="seller-dashboard">
    <header className="seller-heading"><div><p className="eyebrow">SELLER STUDIO</p><h1>Your dashboard</h1><p>Manage your listings and follow each item’s journey.</p></div><button type="button" className="seller-refresh" onClick={load}>Refresh</button></header>
    <div className="seller-summary"><article><span>Active listings</span><strong>{activeCount}</strong></article><article><span>Units sold</span><strong>{sales.reduce((sum, sale) => sum + sale.units, 0)}</strong></article><article><span>Sales value</span><strong>৳ {totalSales.toLocaleString()}</strong></article></div>
    <nav className="seller-tabs"><button className={tab === 'Listings' ? 'active' : ''} onClick={() => setTab('Listings')}>My listings</button><button className={tab === 'Add product' ? 'active' : ''} onClick={() => setTab('Add product')}>Add a product</button></nav>
    {error && <p className="seller-message error" role="alert">{error}</p>}{notice && <p className="seller-message success" role="status">{notice}</p>}
    {tab === 'Listings' && (loading ? <p className="seller-empty">Loading your listings…</p> : products.length ? <div className="seller-listings">{products.map((product) => { const sale = salesByProduct.get(String(product._id)); return <article className="seller-listing" key={product._id}><img src={product.image || product.imageUrl} alt=""/><div className="seller-listing-copy"><span className={`seller-status ${product.moderationStatus || 'approved'}`}>{product.moderationStatus || 'approved'}</span><h2>{product.name}</h2><p>{product.group} · {product.type || product.style} · ৳ {product.price}</p><small>Inventory: {product.status} · {sale?.units || 0} sold · ৳ {(sale?.revenue || 0).toLocaleString()} sales</small></div></article>; })}</div> : <p className="seller-empty">No listings yet. Add your first product to get started.</p>)}
    {tab === 'Add product' && <form className="seller-product-form" onSubmit={submit}><label>Product name<input name="name" required maxLength="120" /></label><div className="seller-form-grid"><label>Category<select name="group" defaultValue="Women">{groups.map((g) => <option key={g}>{g}</option>)}</select></label><label>Type<input name="type" placeholder="e.g. Saree, Shirt" /></label><label>Style<select name="style" defaultValue="Western"><option>Western</option><option>Traditional</option></select></label><label>Size<input name="size" required placeholder="M, 32, Free size" /></label><label>Price (৳)<input name="price" type="number" min="1" step="1" required /></label><label>Condition<select name="condition" defaultValue="Good">{conditions.map((c) => <option key={c}>{c}</option>)}</select></label><label>Brand<input name="brand" /></label><label>Material<input name="material" /></label><label>Used for<input name="usedFor" placeholder="e.g. 3 months" /></label><label className="seller-upload-field">Product photo<input name="image" type="file" accept="image/jpeg,image/png,image/webp" required /><small>JPEG, PNG or WebP, up to 5 MB.</small></label><label className="seller-description-field">Description<textarea name="description" rows="4" maxLength="2000" /></label></div><button className="primary-button" type="submit" disabled={saving}>{saving ? 'Uploading and saving…' : 'Upload and submit listing'} <span>→</span></button></form>}
  </section>;
}
