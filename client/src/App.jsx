import { useState } from 'react'
import './App.css'

const slides = [
  { eyebrow: 'PRE-LOVED. RE-IMAGINED.', title: <>Good style deserves a <em>second life.</em></>, text: 'Discover quality traditional and western clothing with a story worth wearing.', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=95' },
  { eyebrow: 'TRADITIONAL COLLECTION', title: <>Culture meets <em>your style.</em></>, text: 'Find beautiful sarees, panjabis, kurtis and more—ready for their next celebration.', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1800&q=95' },
  { eyebrow: 'WESTERN COLLECTION', title: <>Wear it again. <em>Love it more.</em></>, text: 'Your next favourite denim, jacket, dress or everyday essential is waiting here.', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=95' },
]

const products = [
  { name: 'Classic Denim Jacket', brand: 'Levi\'s', price: '1,200', size: 'M', group: 'Men', style: 'Western', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Cotton Panjabi', brand: 'Aarong', price: '1,050', size: 'L', group: 'Men', style: 'Traditional', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Floral Summer Dress', brand: 'Zara', price: '1,350', size: 'S', group: 'Women', style: 'Western', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Handloom Cotton Saree', brand: 'Taan', price: '1,800', size: 'Free size', group: 'Women', style: 'Traditional', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Kids Denim Shirt', brand: 'Mothercare', price: '650', size: '8–9 Y', group: 'Kids', style: 'Western', image: 'https://images.unsplash.com/photo-1519238361156-2b2e6f8e4a8c?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Kids Festive Panjabi', brand: 'Yellow', price: '720', size: '6–7 Y', group: 'Kids', style: 'Traditional', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1200&q=90' },
]

function ProductCard({ product }) {
  return <article className="product-card"><div className="product-image"><img src={product.image} alt={product.name} /><button aria-label={`Save ${product.name}`}>♡</button><span className="style-badge">{product.style}</span></div><div className="product-details"><div><p className="product-category">{product.group}</p><h3>{product.name}</h3><p>{product.brand} · {product.size}</p></div><strong>৳ {product.price}</strong></div></article>
}

function App() {
  const [page, setPage] = useState('Home')
  const [slide, setSlide] = useState(0)
  const [signInOpen, setSignInOpen] = useState(false)
  const activeSlide = slides[slide]
  const shownProducts = page === 'Home' ? products.slice(0, 4) : products.filter((product) => product.group === page)

  const goToPage = (newPage) => { setPage(newPage); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const changeSlide = (direction) => setSlide((current) => (current + direction + slides.length) % slides.length)

  return <>
    <div className="topbar"><span>Free delivery inside Dhaka on orders over ৳ 1,500</span><a href="tel:+8801700000000">Need help? +880 1700-000000</a></div>
    <header className="navbar">
      <button className="logo" onClick={() => goToPage('Home')}>Retro<span>Fit</span></button>
      <nav>{['Home', 'Men', 'Women', 'Kids'].map((item) => <button className={page === item ? 'active' : ''} key={item} onClick={() => goToPage(item)}>{item}</button>)}<a href="#how-it-works">How it works</a></nav>
      <button className="login-button" onClick={() => setSignInOpen(true)}>Sign in <span>→</span></button>
    </header>

    <main>
      {page === 'Home' && <section className="hero-section">
        <div className="hero-copy"><p className="eyebrow">{activeSlide.eyebrow}</p><h1>{activeSlide.title}</h1><p className="hero-text">{activeSlide.text}</p><div className="hero-actions"><button className="primary-button" onClick={() => document.querySelector('#collection').scrollIntoView({ behavior: 'smooth' })}>Shop collection <span>→</span></button><button className="text-button" onClick={() => goToPage('Women')}>Explore traditional wear</button></div><div className="slider-dots">{slides.map((_, index) => <button aria-label={`Show slide ${index + 1}`} className={slide === index ? 'selected' : ''} key={index} onClick={() => setSlide(index)} />)}</div></div>
        <div className="hero-image-wrap"><div className="slider-window"><div className="slider-track" style={{ transform: `translateX(-${slide * 100}%)` }}>{slides.map((item, index) => <img src={item.image} alt={`RetroFit collection ${index + 1}`} key={item.image} />)}</div></div><button className="hero-arrow previous" onClick={() => changeSlide(-1)} aria-label="Previous slide">‹</button><button className="hero-arrow next" onClick={() => changeSlide(1)} aria-label="Next slide">›</button><div className="hero-note"><strong>4,000+</strong><br />clothes given a new story</div></div>
      </section>}

      <section className="values"><p><span>✦</span> Quality checked</p><p><span>✦</span> Traditional & western wear</p><p><span>✦</span> Made for your budget</p></section>

      <section className="shop-section" id="collection">
        <div className="section-heading"><div><p className="eyebrow">{page === 'Home' ? 'JUST IN' : `${page.toUpperCase()} COLLECTION`}</p><h2>{page === 'Home' ? 'Fresh finds, ready for you.' : `${page}'s clothing collection`}</h2></div>{page === 'Home' && <button onClick={() => goToPage('Women')}>View women’s wear →</button>}</div>
        {page !== 'Home' && <div className="collection-tabs"><button className="active">All clothing</button><button>Traditional</button><button>Western</button></div>}
        <div className="product-grid">{shownProducts.map((product) => <ProductCard key={product.name} product={product} />)}</div>
      </section>

      <section className="sell-section"><div><p className="eyebrow">YOUR CLOSET HAS VALUE</p><h2>Pass it on. Get paid.</h2></div><button className="light-button">Start selling <span>→</span></button></section>
      <section className="newsletter-section"><div className="newsletter-intro"><div className="newsletter-title"><span aria-hidden="true">✉</span><h2>Stay tuned</h2></div><p>Get fresh finds, styling inspiration and updates from RetroFit.</p></div><form className="newsletter-form" onSubmit={(event) => event.preventDefault()}><div className="newsletter-fields"><input type="email" aria-label="Email address" placeholder="Enter email address" required /><input type="tel" aria-label="Mobile number" placeholder="Enter mobile number" required /><button type="submit">Subscribe</button></div><div className="location-options"><label><input type="radio" name="location" defaultChecked /> I live in Bangladesh</label><label><input type="radio" name="location" /> I live outside Bangladesh</label></div></form></section>
      <section className="footer-panels" aria-label="Explore RetroFit"><a href="#how-it-works" className="footer-panel" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=900&q=85')" }}><span>Who we are</span></a><a href="#collection" className="footer-panel" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85')" }}><span>Categories</span></a><a href="mailto:retrofit@gmail.com" className="footer-panel" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=85')" }}><span>Customer service</span></a><a href="#collection" className="footer-panel" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85')" }}><span>Style guide</span></a><a href="#how-it-works" className="footer-panel" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85')" }}><span>More</span></a></section>
    </main>

    <footer id="how-it-works"><div className="footer-main"><div className="footer-brand"><button className="logo" onClick={() => goToPage('Home')}>Retro<span>Fit</span></button><p>Fashion with a future.</p></div><div className="footer-contact"><p>CONTACT</p><a href="mailto:retrofit@gmail.com">retrofit@gmail.com</a><a href="tel:+8801700000000">+880 1700-000000</a></div><div className="footer-follow"><p>FOLLOW US</p><div className="social-links" aria-label="Follow RetroFit"><a className="facebook" href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.8 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5H17V3.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.1H7.8V13h2.7v8h3.3Z" /></svg></a><a className="instagram" href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.7" r="1" /></svg></a><a className="tiktok" href="https://www.tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3c.3 2.3 1.6 3.8 4 4v3.1c-1.5 0-2.9-.5-4-1.4v6.6a5.3 5.3 0 1 1-4.6-5.2v3.1a2.3 2.3 0 1 0 1.5 2.1V3H15Z" /></svg></a></div></div></div><div className="footer-bottom"><p>© 2026 RetroFit. All rights reserved.</p></div></footer>
    {signInOpen && <div className="signin-overlay" role="presentation" onClick={() => setSignInOpen(false)}><section className="signin-dialog" role="dialog" aria-modal="true" aria-labelledby="signin-title" onClick={(event) => event.stopPropagation()}><button className="close-signin" onClick={() => setSignInOpen(false)} aria-label="Close sign in">×</button><p className="eyebrow">WELCOME BACK</p><h2 id="signin-title">Sign in to RetroFit</h2><p>Access your saved styles and keep fashion in circulation.</p><form onSubmit={(event) => event.preventDefault()}><label htmlFor="email">Email address</label><input id="email" type="email" placeholder="you@example.com" required /><label htmlFor="password">Password</label><input id="password" type="password" placeholder="Enter your password" required /><button className="primary-button" type="submit">Sign in <span>→</span></button></form><button className="create-account" type="button">New here? Create an account</button></section></div>}
  </>
}

export default App
