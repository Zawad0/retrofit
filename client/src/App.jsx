import { useEffect, useState } from 'react'
import retrofitLogo from './assets/retrofit-logo.svg'
import womanTshirt from './assets/products/womantshirt.jpg'
import womanTop from './assets/products/womantop.jpg'
import womanJeans from './assets/products/womanjeans.jpg'
import womanScarf from './assets/products/womenscaff.jpg'
import kidsPicture from './assets/products/kid.jpg'
import menSuit from './assets/products/men-suit.jpg'
import menShirt from './assets/products/men-shirt.jpg'
import menTshirt from './assets/products/men-tshirt.jpg'
import menPunjabi from './assets/products/men-punjabi.jpg'
import babyBathSuit from './assets/products/baby-bath-suit.jpg'
import cottonCoOrdSet from './assets/products/cotton-co-ord-set.jpg'
import smockedBabyDress from './assets/products/smocked-baby-dress.jpg'
import newbornBabyJumpsuit from './assets/products/newborn-baby-jumpsuit.jpg'
import sareeCategory from './assets/women-categories/saree.jpg'
import salwarKameezCategory from './assets/women-categories/salwar-kameez.jpg'
import kurtiCategory from './assets/women-categories/kurti.jpg'
import nightwearCategory from './assets/women-categories/nightwear.jpg'
import './App.css'

const slides = [
  { group: 'Women', eyebrow: 'WOMEN’S COLLECTION', title: <>Style made for<br /><em>your next story.</em></>, text: 'Discover beautiful women’s traditional and western clothing ready for a second life.', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=95' },
  { group: 'Kids', eyebrow: 'KIDS’ COLLECTION', title: <>Little looks,<br /><em>big smiles.</em></>, text: 'Find comfortable, colourful clothes for every little adventure.', image: kidsPicture },
  { group: 'Men', eyebrow: 'MEN’S COLLECTION', title: <>Classic fits for<br /><em>every day.</em></>, text: 'Explore quality western and traditional styles with plenty of life left in them.', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1800&q=95' },
]

const womenCategories = [
  { name: 'Saree', style: 'Traditional', type: 'Saree', image: sareeCategory },
  { name: 'Salwar Kameez', style: 'Traditional', type: 'Salwar Kameez', image: salwarKameezCategory },
  { name: 'Kurti', style: 'Traditional', type: 'Kurti', image: kurtiCategory },
  { name: 'Scarf', style: 'Western', image: womanScarf },
  { name: 'Nightwear', style: 'Western', image: nightwearCategory },
  { name: 'Tops', style: 'Western', image: womanTop },
]

const products = [
  { name: 'Women’s T-Shirt', brand: 'Tokyo', price: '650', size: 'M', group: 'Women', style: 'Western', image: womanTshirt },
  { name: 'Cotton Shirt', brand: 'Aarong', price: '850', size: 'S', group: 'Women', style: 'Western', image: womanTop },
  { name: 'Women’s Jeans', brand: 'Levi\'s', price: '1,200', size: '28', group: 'Women', style: 'Western', image: womanJeans },
  { name: 'Women’s Scarf', brand: 'Deshal', price: '750', size: 'Free size', group: 'Women', style: 'Western', image: womanScarf },
  { name: 'Floral Frock', brand: 'Forever 21', price: '1,350', size: 'S', group: 'Women', style: 'Western', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Denim Jumpsuit', brand: 'Bershka', price: '1,450', size: 'M', group: 'Women', style: 'Western', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Handloom Cotton Saree', brand: 'Taan', price: '1,800', size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Salwar Kameez Set', brand: 'Aarong', price: '1,650', size: 'M', group: 'Women', style: 'Traditional', type: 'Salwar Kameez', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Printed Kurti', brand: 'Kay Kraft', price: '950', size: 'L', group: 'Women', style: 'Traditional', type: 'Kurti', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Warm Chador', brand: 'Deshal', price: '1,100', size: 'Free size', group: 'Women', style: 'Traditional', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Long Kurti', brand: 'Kay Kraft', price: '1,050', size: 'M', group: 'Women', style: 'Traditional', type: 'Kurti', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Short Kurti', brand: 'Aarong', price: '890', size: 'S', group: 'Women', style: 'Traditional', type: 'Kurti', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Cotton Pyjama', brand: 'Deshal', price: '650', size: 'M', group: 'Women', style: 'Traditional', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Classic Men’s Suit', brand: 'Zara', price: '2,400', size: 'L', group: 'Men', style: 'Western', image: menSuit },
  { name: 'Classic Shirt', brand: 'Ralph Lauren', price: '1,100', size: 'L', group: 'Men', style: 'Western', image: menShirt },
  { name: 'Limited T-Shirt', brand: 'Nike', price: '850', size: 'M', group: 'Men', style: 'Western', image: menTshirt },
  { name: 'Embroidered Panjabi', brand: 'Aarong', price: '1,250', size: 'L', group: 'Men', style: 'Traditional', image: menPunjabi },
  { name: 'Sports Jersey', brand: 'Adidas', price: '900', size: 'M', group: 'Men', style: 'Western', image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Straight Fit Jeans', brand: 'Levi\'s', price: '1,250', size: '32', group: 'Men', style: 'Western', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Cotton Trousers', brand: 'M&S', price: '1,000', size: '34', group: 'Men', style: 'Western', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Cherry Baby Bath Suit', brand: 'Mothercare', price: '650', size: '6–12 M', group: 'Kids', style: 'Western', image: babyBathSuit },
  { name: 'Cotton Co-ord Set', brand: 'Yellow', price: '720', size: '1–2 Y', group: 'Kids', style: 'Western', image: cottonCoOrdSet, imageFit: 'contain' },
  { name: 'Smocked Puff Sleeve Dress', brand: 'Mothercare', price: '820', size: '1–2 Y', group: 'Kids', style: 'Western', image: smockedBabyDress, imageFit: 'contain' },
  { name: 'Newborn Baby Jumpsuit', brand: 'Baby Shop', price: '750', size: '0–6 M', group: 'Kids', style: 'Western', image: newbornBabyJumpsuit },
]

function ProductCard({ product, showPrice = true }) {
  return <article className="product-card"><div className="product-image"><img className={product.imageFit === 'contain' ? 'image-contain' : ''} src={product.image} alt={product.name} /><button aria-label={`Save ${product.name}`}>♡</button></div><div className="product-details"><div><p className="product-category">{product.group}</p><h3>{product.name}</h3><p>{product.brand} · {product.size}</p></div>{showPrice && <strong>৳ {product.price}</strong>}</div></article>
}

function App() {
  const [page, setPage] = useState('Home')
  const [collectionStyle, setCollectionStyle] = useState('All clothing')
  const [traditionalType, setTraditionalType] = useState('')
  const [womenMenuOpen, setWomenMenuOpen] = useState(false)
  const [womenCategoryPage, setWomenCategoryPage] = useState(false)
  const [slide, setSlide] = useState(0)
  const [signInOpen, setSignInOpen] = useState(false)
  const activeSlide = slides[slide]
  const collectionLinkLabel = activeSlide.group === 'Kids' ? 'View kids’ wear →' : `View ${activeSlide.group.toLowerCase()}’s wear →`
  const collectionProducts = page === 'Home' ? products.filter((product) => product.group === activeSlide.group) : products.filter((product) => product.group === page && (collectionStyle === 'All clothing' || product.style === collectionStyle) && (collectionStyle !== 'Traditional' || !traditionalType || product.type === traditionalType))
  const shownProducts = page === 'Home' ? collectionProducts.slice(0, 4) : collectionProducts

  const goToPage = (newPage) => { setPage(newPage); setCollectionStyle(newPage === 'Women' ? 'Traditional' : 'All clothing'); setTraditionalType(''); setWomenCategoryPage(newPage === 'Women'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const goToWomenCollection = (style, type = '') => { setPage('Women'); setCollectionStyle(style); setTraditionalType(type); setWomenCategoryPage(false); setWomenMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const changeSlide = (direction) => setSlide((current) => (current + direction + slides.length) % slides.length)

  useEffect(() => {
    if (page !== 'Home') return undefined
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 4000)
    return () => window.clearInterval(timer)
  }, [page])

  return <>
    <div className="topbar"><span>Free delivery inside Dhaka on orders over ৳ 1,500</span><a href="tel:+8801700000000">Need help? +880 1700-000000</a></div>
    <header className="navbar">
      <div className="nav-top"><button className="logo" onClick={() => goToPage('Home')} aria-label="RetroFit home"><img className="brand-logo-image" src={retrofitLogo} alt="RetroFit" /></button><p className="brand-tagline">REWEAR · RELOVE · REPEAT</p><div className="nav-actions"><button className="search-button" aria-label="Search products">⌕ <span>Search styles</span></button><button className="wishlist-button" aria-label="Saved styles">♡</button><button className="login-button" onClick={() => setSignInOpen(true)}>Sign in <span>→</span></button></div></div>
      <nav className="primary-nav"><button className={page === 'Home' ? 'active' : ''} onClick={() => goToPage('Home')}>Home</button><button className={page === 'Men' ? 'active' : ''} onClick={() => goToPage('Men')}>Men</button><div className="women-nav-item" onMouseEnter={() => setWomenMenuOpen(true)} onMouseLeave={() => setWomenMenuOpen(false)}><button className={page === 'Women' ? 'active' : ''} onClick={() => goToPage('Women')} aria-expanded={womenMenuOpen}>Women</button>{womenMenuOpen && <div className="women-mega-menu"><div className="women-menu-categories">{womenCategories.map((category) => <button key={category.name} onClick={() => goToWomenCollection(category.style, category.type)}>{category.name}</button>)}</div><button className="women-menu-image" onClick={() => goToPage('Women')} aria-label="Shop women’s collection"><span>Shop women’s<br />collection <b>→</b></span></button></div>}</div><button className={page === 'Kids' ? 'active' : ''} onClick={() => goToPage('Kids')}>Kids</button><a href="#collection">New arrivals</a><a href="#how-it-works">How it works</a><a href="#newsletter">Community</a></nav>
    </header>

    <main>
      {page === 'Home' && <section className="hero-section">
        <div className="hero-copy"><p className="eyebrow">{activeSlide.eyebrow}</p><h1>{activeSlide.title}</h1><p className="hero-text">{activeSlide.text}</p><div className="hero-actions"><button className="primary-button" onClick={() => document.querySelector('#collection').scrollIntoView({ behavior: 'smooth' })}>Shop the edit <span>→</span></button><button className="text-button" onClick={() => document.querySelector('#collection').scrollIntoView({ behavior: 'smooth' })}>Explore the collection</button></div><div className="slider-dots">{slides.map((_, index) => <button aria-label={`Show slide ${index + 1}`} className={slide === index ? 'selected' : ''} key={index} onClick={() => setSlide(index)} />)}</div></div>
        <div className="hero-image-wrap"><div className="slider-window"><div className="slider-track" style={{ transform: `translateX(-${slide * 100}%)` }}>{slides.map((item, index) => <img src={item.image} alt={`RetroFit collection ${index + 1}`} key={item.image} />)}</div></div><button className="hero-arrow previous" onClick={() => changeSlide(-1)} aria-label="Previous slide">‹</button><button className="hero-arrow next" onClick={() => changeSlide(1)} aria-label="Next slide">›</button></div>
      </section>}

      <section className="values" aria-label="RetroFit promises"><div className="values-track">{['Give Clothes A New Story', 'Premium Brands For Less', 'Gently Used & Ready To Wear', 'Luxury Looks At Thrift Prices', 'Smart Fashion For Smart Savings', 'Eco-Conscious Closet', 'Give Clothes A New Story', 'Premium Brands For Less', 'Gently Used & Ready To Wear', 'Luxury Looks At Thrift Prices', 'Smart Fashion For Smart Savings', 'Eco-Conscious Closet'].map((message, index) => <p key={`${message}-${index}`}>{message}</p>)}</div></section>

      {page === 'Women' && womenCategoryPage ? <section className="women-categories" id="collection"><h1>Shop by category</h1><div className="women-category-grid">{womenCategories.map((category) => <button className={`women-category-card ${category.name.toLowerCase().replaceAll(' ', '-')}`} key={category.name} onClick={() => goToWomenCollection(category.style, category.type)}><img src={category.image} alt={category.name} /><span>{category.name}</span></button>)}</div></section> : <section className="shop-section" id="collection">
        <div className="section-heading"><div><p className="eyebrow">{page === 'Home' ? 'JUST IN' : `${page.toUpperCase()} COLLECTION`}</p><h2>{page === 'Home' ? `Fresh ${activeSlide.group.toLowerCase()} finds, ready for you.` : `${page}'s clothing collection`}</h2></div>{page === 'Home' && <button onClick={() => goToPage(activeSlide.group)}>{collectionLinkLabel}</button>}</div>
        {page !== 'Home' && <><div className="collection-tabs">{(page === 'Women' ? ['Traditional', 'Western'] : ['All clothing', 'Traditional', 'Western']).map((style) => <button key={style} className={collectionStyle === style ? 'active' : ''} onClick={() => { setCollectionStyle(style); setTraditionalType('') }}>{style}</button>)}</div>{page === 'Women' && collectionStyle === 'Traditional' && <div className="subcategory-tabs" aria-label="Traditional clothing types">{['Saree', 'Salwar Kameez', 'Kurti'].map((type) => <button key={type} className={traditionalType === type ? 'active' : ''} onClick={() => setTraditionalType((current) => current === type ? '' : type)}>{type}</button>)}</div>}</>}
        <div className="product-grid">{shownProducts.map((product) => <ProductCard key={product.name} product={product} showPrice={page !== 'Home'} />)}</div>
      </section>}

      <section className="sell-section"><div><p className="eyebrow">YOUR CLOSET HAS VALUE</p><h2>Pass it on. Get paid.</h2></div><button className="light-button">Start selling <span>→</span></button></section>
      <section className="newsletter-section" id="newsletter"><div className="newsletter-intro"><div className="newsletter-title"><span aria-hidden="true">✉</span><h2>Stay tuned</h2></div><p>Get fresh finds, styling inspiration and updates from RetroFit.</p></div><form className="newsletter-form" onSubmit={(event) => event.preventDefault()}><div className="newsletter-fields"><input type="email" aria-label="Email address" placeholder="Enter email address" required /><input type="tel" aria-label="Mobile number" placeholder="Enter mobile number" required /><button type="submit">Subscribe</button></div></form></section>
      <section className="footer-panels" aria-label="Explore RetroFit"><a href="#how-it-works" className="footer-panel" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=900&q=85')" }}><span>Who we are</span></a><a href="#collection" className="footer-panel" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85')" }}><span>Categories</span></a><a href="mailto:retrofit@gmail.com" className="footer-panel" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=85')" }}><span>Customer service</span></a><a href="#collection" className="footer-panel" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85')" }}><span>Style guide</span></a><a href="#how-it-works" className="footer-panel" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85')" }}><span>More</span></a></section>
    </main>

    <footer id="how-it-works"><div className="footer-main"><div className="footer-brand"><button className="logo" onClick={() => goToPage('Home')}><img className="brand-logo-image" src={retrofitLogo} alt="RetroFit" /></button><p>Fashion with a future.</p></div><div className="footer-contact"><p>CONTACT</p><a href="mailto:retrofit@gmail.com">retrofit@gmail.com</a><a href="tel:+8801700000000">+880 1700-000000</a></div><div className="footer-follow"><p>FOLLOW US</p><div className="social-links" aria-label="Follow RetroFit"><a className="facebook" href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.8 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5H17V3.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.1H7.8V13h2.7v8h3.3Z" /></svg></a><a className="instagram" href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.7" r="1" /></svg></a><a className="tiktok" href="https://www.tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3c.3 2.3 1.6 3.8 4 4v3.1c-1.5 0-2.9-.5-4-1.4v6.6a5.3 5.3 0 1 1-4.6-5.2v3.1a2.3 2.3 0 1 0 1.5 2.1V3H15Z" /></svg></a></div></div></div><div className="footer-bottom"><p>© 2026 RetroFit. All rights reserved.</p></div></footer>
    {signInOpen && <div className="signin-overlay" role="presentation" onClick={() => setSignInOpen(false)}><section className="signin-dialog" role="dialog" aria-modal="true" aria-labelledby="signin-title" onClick={(event) => event.stopPropagation()}><button className="close-signin" onClick={() => setSignInOpen(false)} aria-label="Close sign in">×</button><p className="eyebrow">WELCOME BACK</p><h2 id="signin-title">Sign in to RetroFit</h2><p>Access your saved styles and keep fashion in circulation.</p><form onSubmit={(event) => event.preventDefault()}><label htmlFor="email">Email address</label><input id="email" type="email" placeholder="you@example.com" required /><label htmlFor="password">Password</label><input id="password" type="password" placeholder="Enter your password" required /><button className="primary-button" type="submit">Sign in <span>→</span></button></form><button className="create-account" type="button">New here? Create an account</button></section></div>}
  </>
}

export default App
