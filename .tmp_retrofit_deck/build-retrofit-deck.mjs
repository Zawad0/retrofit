import pptxgen from 'pptxgenjs';
import path from 'node:path';

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'RetroFit Team';
pptx.subject = 'RetroFit project presentation';
pptx.title = 'RetroFit — Fashion with a Future';
pptx.company = 'RetroFit';
pptx.lang = 'en-BD';
pptx.theme = {
  headFontFace: 'Georgia',
  bodyFontFace: 'Aptos',
  lang: 'en-US',
};
pptx.defineLayout({ name: 'CUSTOM_WIDE', width: 13.333, height: 7.5 });
pptx.layout = 'CUSTOM_WIDE';
pptx.margin = 0;

const W = 13.333;
const H = 7.5;
const C = {
  ink: '12372A',
  forest: '17382E',
  rust: 'BD6042',
  gold: 'EDC783',
  paper: 'FFFDF8',
  warm: 'ECE7DE',
  moss: '657269',
  line: 'DADBD2',
  white: 'FFFFFF',
  black: '111611',
};
const root = process.cwd();
const asset = (...p) => path.join(root, 'client', 'src', 'assets', ...p);

function rect(slide, x, y, w, h, fill, transparency = 0) {
  slide.addShape(pptx.ShapeType.rect, { x, y, w, h, line: { color: fill, transparency: 100 }, fill: { color: fill, transparency } });
}
function line(slide, x, y, w, h = 0.012, color = C.line) {
  rect(slide, x, y, w, h, color);
}
function text(slide, value, x, y, w, h, opts = {}) {
  slide.addText(value, {
    x, y, w, h,
    margin: opts.margin ?? 0,
    fontFace: opts.fontFace ?? 'Aptos',
    fontSize: opts.fontSize ?? 18,
    color: opts.color ?? C.ink,
    bold: opts.bold ?? false,
    breakLine: false,
    fit: 'shrink',
    valign: opts.valign ?? 'mid',
    align: opts.align ?? 'left',
    paraSpaceAfterPt: opts.paraSpaceAfterPt ?? 0,
    italic: opts.italic ?? false,
    charSpacing: opts.charSpacing,
    bullet: opts.bullet,
    breakLine: opts.breakLine,
  });
}
function image(slide, p, x, y, w, h, sizing = 'cover') {
  const options = { path: p, x, y, w, h };
  if (sizing === 'contain') options.sizing = { type: 'contain', x, y, w, h };
  else options.sizing = { type: 'crop', x, y, w, h };
  slide.addImage(options);
}
function header(slide, section, n) {
  text(slide, section.toUpperCase(), 0.64, 0.36, 3.6, 0.24, { fontSize: 9, color: C.rust, bold: true, charSpacing: 1.4 });
  text(slide, `0${n}`, 12.2, 0.34, 0.48, 0.24, { fontSize: 9, color: C.moss, bold: true, align: 'right', charSpacing: 1 });
}
function title(slide, value, sub, n, section) {
  header(slide, section, n);
  text(slide, value, 0.64, 0.88, 11.8, 0.72, { fontFace: 'Georgia', fontSize: 30, color: C.ink, bold: true });
  if (sub) text(slide, sub, 0.66, 1.65, 10.9, 0.36, { fontSize: 13, color: C.moss });
  line(slide, 0.64, 2.18, 12.05);
}
function footer(slide) {
  line(slide, 0.64, 7.06, 12.05, 0.01);
  text(slide, 'RETROFIT  •  FASHION WITH A FUTURE', 0.64, 7.14, 4.5, 0.16, { fontSize: 7.5, color: C.moss, bold: true, charSpacing: 0.7 });
}
function dot(slide, x, y, fill = C.rust, size = 0.12) { slide.addShape(pptx.ShapeType.ellipse, { x, y, w: size, h: size, line: { color: fill, transparency: 100 }, fill: { color: fill } }); }

// 1 — Cover
{
  const s = pptx.addSlide();
  s.background = { color: C.forest };
  image(s, asset('hero.png'), 7.75, 0, 5.583, H);
  rect(s, 7.75, 0, 5.583, H, C.forest, 48);
  image(s, asset('retrofit-logo.svg'), 0.68, 0.52, 1.7, 0.43, 'contain');
  text(s, 'A sustainable marketplace\nfor pre-owned fashion.', 0.72, 1.58, 6.6, 1.75, { fontFace: 'Georgia', fontSize: 34, color: C.paper, bold: true, valign: 'top' });
  text(s, 'RetroFit connects people who want to pass on quality clothing with shoppers looking for affordable style.', 0.76, 3.58, 5.7, 0.82, { fontSize: 17, color: 'E9E4DA', valign: 'top' });
  line(s, 0.75, 5.2, 1.08, 0.03, C.gold);
  text(s, 'PROJECT PRESENTATION  •  2026', 0.76, 5.43, 3.8, 0.22, { fontSize: 9.5, color: C.gold, bold: true, charSpacing: 1.2 });
  text(s, 'Fashion with a future.', 0.76, 6.65, 3.5, 0.26, { fontSize: 12, color: 'E9E4DA', italic: true });
}

// 2 — Problem
{
  const s = pptx.addSlide();
  title(s, 'Good clothing should not become waste.', 'RetroFit is designed around a simple opportunity: make reuse visible, affordable, and easy.', 2, 'The challenge');
  text(s, 'Too many quality garments leave wardrobes without finding a new owner.', 0.7, 2.74, 4.4, 1.0, { fontFace: 'Georgia', fontSize: 23, bold: true, color: C.ink, valign: 'top' });
  text(s, 'At the same time, students and budget-conscious shoppers need stylish options at accessible prices.', 0.7, 4.02, 4.5, 0.74, { fontSize: 16, color: C.moss, valign: 'top' });
  line(s, 5.58, 2.7, 0.012, 3.62, C.line);
  image(s, asset('community', 'community-aesthetic.jpg'), 6.06, 2.65, 2.78, 3.72);
  image(s, asset('community', 'community-courtyard.jpg'), 9.08, 2.65, 3.0, 3.72);
  text(s, 'The gap', 6.08, 6.48, 2, 0.2, { fontSize: 9, color: C.rust, bold: true, charSpacing: 1 });
  text(s, 'Quality garments  →  thoughtful shoppers', 6.08, 6.69, 5.1, 0.24, { fontSize: 14, color: C.ink, bold: true });
  footer(s);
}

// 3 — Solution
{
  const s = pptx.addSlide();
  title(s, 'RetroFit gives pre-loved fashion a clear next step.', 'A responsive marketplace experience that supports discovery, transparency, and circulation.', 3, 'Our solution');
  image(s, asset('women-hero.jpg'), 0.68, 2.58, 4.18, 3.98);
  rect(s, 0.68, 5.62, 4.18, 0.94, C.ink, 13);
  text(s, 'DISCOVER', 0.94, 5.86, 1.3, 0.18, { fontSize: 10, color: C.paper, bold: true, charSpacing: 1.2 });
  text(s, 'Curated categories and detailed products', 0.94, 6.08, 3.32, 0.23, { fontSize: 13, color: C.paper });
  const x = 5.48;
  text(s, 'The marketplace brings together:', x, 2.7, 5.4, 0.32, { fontSize: 16, color: C.moss });
  [['Affordable finds', 'Pre-owned styles across women, men, and kids.'], ['Honest information', 'Price, size, material, condition, and use history.'], ['A selling pathway', 'An easy request form to start rehoming an item.']].forEach((item, i) => {
    const y = 3.28 + i * 0.91;
    dot(s, x, y + 0.08);
    text(s, item[0], x + 0.28, y, 2.2, 0.22, { fontSize: 16, color: C.ink, bold: true });
    text(s, item[1], x + 0.28, y + 0.3, 5.7, 0.3, { fontSize: 13, color: C.moss });
  });
  footer(s);
}

// 4 — User journey
{
  const s = pptx.addSlide();
  title(s, 'The experience is simple for both sides of the marketplace.', 'Each interaction moves clothing closer to its next useful life.', 4, 'User journey');
  const steps = [
    ['01', 'Explore', 'Browse Women, Men, and Kids collections by category.'],
    ['02', 'Evaluate', 'Open a product to check price, brand, size, material, and condition.'],
    ['03', 'Save or buy', 'Add favourite finds to wishlist or place them in the cart.'],
    ['04', 'Sell', 'Submit clothing details and a photo through the selling form.'],
  ];
  steps.forEach((st, i) => {
    const x = 0.7 + i * 3.1;
    text(s, st[0], x, 2.7, 0.5, 0.24, { fontSize: 11, color: C.rust, bold: true, charSpacing: 1 });
    line(s, x, 3.1, 2.35, 0.02, i === 3 ? C.gold : C.ink);
    text(s, st[1], x, 3.38, 2.3, 0.32, { fontFace: 'Georgia', fontSize: 20, color: C.ink, bold: true });
    text(s, st[2], x, 3.87, 2.45, 0.72, { fontSize: 13, color: C.moss, valign: 'top' });
  });
  image(s, asset('products', 'sarees', 'monipuri-purple.jpg'), 0.7, 5.63, 2.36, 0.9);
  image(s, asset('products', 'shirts', 'white-linen.jpg'), 3.8, 5.63, 2.36, 0.9);
  image(s, asset('products', 'newborn', 'pink-bow-romper.jpg'), 6.9, 5.63, 2.36, 0.9);
  image(s, asset('products', 'kurtis', 'ruby-red.jpg'), 10.0, 5.63, 2.36, 0.9);
  footer(s);
}

// 5 — Implemented product
{
  const s = pptx.addSlide();
  title(s, 'The current product already delivers a polished shopping flow.', 'The frontend focuses on product discovery and a clear, trust-building presentation.', 5, 'Implemented experience');
  image(s, asset('homepage.jpg'), 0.68, 2.58, 5.9, 3.94);
  const feats = [
    ['Collection navigation', 'Women, Men, and Kids sections with category filters.'],
    ['Product details', 'Modal view with image zoom and key garment attributes.'],
    ['Shopping actions', 'Wishlist, cart, search, and newsletter interactions.'],
    ['Responsive styling', 'Layouts adapt for desktop and mobile screens.'],
  ];
  feats.forEach((f, i) => {
    const y = 2.67 + i * 0.88;
    text(s, '—', 7.06, y, 0.26, 0.22, { fontSize: 17, color: C.rust, bold: true });
    text(s, f[0], 7.36, y, 2.15, 0.22, { fontSize: 15, color: C.ink, bold: true });
    text(s, f[1], 9.52, y, 2.65, 0.26, { fontSize: 12.6, color: C.moss });
  });
  footer(s);
}

// 6 — Tech stack/API
{
  const s = pptx.addSlide();
  title(s, 'A MERN foundation supports the marketplace.', 'The implemented backend exposes a focused product API while the React app powers the interface.', 6, 'Technology');
  const columns = [
    ['FRONTEND', 'React 19\nVite 8\nResponsive CSS'],
    ['BACKEND', 'Node.js\nExpress 4\nCORS + dotenv'],
    ['DATA', 'MongoDB\nMongoose\nProduct schema'],
  ];
  columns.forEach((c, i) => {
    const x = 0.68 + i * 4.0;
    line(s, x, 2.83, 3.28, 0.03, i === 1 ? C.rust : C.ink);
    text(s, c[0], x, 3.16, 2.6, 0.2, { fontSize: 10, color: C.rust, bold: true, charSpacing: 1.2 });
    text(s, c[1], x, 3.62, 3.0, 1.35, { fontFace: 'Georgia', fontSize: 22, color: C.ink, bold: true, valign: 'top' });
  });
  line(s, 0.68, 5.63, 12.0, 0.02, C.line);
  text(s, 'IMPLEMENTED PRODUCT ENDPOINTS', 0.68, 5.9, 3.2, 0.2, { fontSize: 9.5, color: C.rust, bold: true, charSpacing: 1.1 });
  text(s, 'GET  /api/products     GET  /api/products/:id     POST  /api/products', 0.68, 6.25, 9.5, 0.34, { fontFace: 'Courier New', fontSize: 16, color: C.ink, bold: true });
  footer(s);
}

// 7 — Architecture
{
  const s = pptx.addSlide();
  title(s, 'The system separates the customer experience from product data.', 'A simple client–API–database path keeps responsibilities clear as the product grows.', 7, 'Architecture');
  const blocks = [
    { x: 0.75, label: 'React + Vite', body: 'Product browsing\nCart & wishlist UI\nSell request flow', fill: C.paper, stroke: C.ink },
    { x: 5.07, label: 'Express API', body: 'Route handlers\nControllers\nProduct validation', fill: 'F6E9E4', stroke: C.rust },
    { x: 9.39, label: 'MongoDB', body: 'Product records\nPrice & condition\nImage URL fields', fill: 'EEF1EA', stroke: C.forest },
  ];
  line(s, 2.92, 4.39, 1.67, 0.03, C.moss);
  line(s, 7.24, 4.39, 1.67, 0.03, C.moss);
  [4.43, 8.75].forEach(x => { s.addShape(pptx.ShapeType.chevron, { x, y: 4.25, w: 0.18, h: 0.28, line: { color: C.moss, transparency: 100 }, fill: { color: C.moss } }); });
  blocks.forEach(b => {
    rect(s, b.x, 3.1, 3.17, 2.44, b.fill);
    line(s, b.x, 3.1, 3.17, 0.04, b.stroke);
    text(s, b.label, b.x + 0.27, 3.53, 2.62, 0.32, { fontFace: 'Georgia', fontSize: 20, color: C.ink, bold: true });
    text(s, b.body, b.x + 0.27, 4.14, 2.46, 0.95, { fontSize: 14, color: C.moss, valign: 'top' });
  });
  text(s, 'Future deployment target: Vercel for the frontend • Render for the backend', 0.75, 6.11, 9.6, 0.28, { fontSize: 14, color: C.moss });
  footer(s);
}

// 8 — Frontend in detail
{
  const s = pptx.addSlide();
  title(s, 'Frontend: a branded, responsive shopping experience.', 'The React single-page interface manages navigation and interaction state without leaving the marketplace.', 8, 'Frontend');
  image(s, asset('women-hero.jpg'), 0.68, 2.58, 3.22, 3.95);
  image(s, asset('men-hero.jpg'), 3.98, 2.58, 3.22, 3.95);
  text(s, 'What the React frontend manages', 7.72, 2.7, 4.4, 0.32, { fontFace: 'Georgia', fontSize: 22, color: C.ink, bold: true });
  [['Page state', 'Home, collection, category, search, and How It Works views.'], ['Interaction state', 'Active products, image zoom, cart, wishlist, and modals.'], ['Product rendering', 'Reusable product cards backed by catalog data and filters.'], ['Responsive layout', 'CSS media queries keep the experience usable on mobile.']].forEach((f, i) => {
    const y = 3.34 + i * 0.7;
    dot(s, 7.75, y + 0.075, i === 3 ? C.gold : C.rust, 0.1);
    text(s, f[0], 8.02, y, 1.82, 0.22, { fontSize: 14.5, color: C.ink, bold: true });
    text(s, f[1], 9.95, y, 2.28, 0.42, { fontSize: 11.3, color: C.moss, valign: 'top' });
  });
  footer(s);
}

// 9 — Backend in detail
{
  const s = pptx.addSlide();
  title(s, 'Backend: Express routes organise product operations.', 'The current API focuses on product retrieval and listing creation, with a clean controller–model separation.', 9, 'Backend');
  const stages = [
    ['Routes', 'productRoutes.js', 'Defines GET and POST endpoints.'],
    ['Controllers', 'productController.js', 'Handles requests, responses, and errors.'],
    ['Models', 'Product.js', 'Enforces MongoDB product fields.'],
  ];
  line(s, 2.55, 4.04, 8.18, 0.03, C.moss);
  stages.forEach((st, i) => {
    const x = 0.72 + i * 4.15;
    dot(s, x + 1.78, 3.88, i === 1 ? C.rust : C.forest, 0.25);
    text(s, st[0].toUpperCase(), x, 2.76, 3.2, 0.2, { fontSize: 10, color: C.rust, bold: true, align: 'center', charSpacing: 1.2 });
    text(s, st[1], x, 3.15, 3.2, 0.32, { fontFace: 'Courier New', fontSize: 16, color: C.ink, bold: true, align: 'center' });
    text(s, st[2], x + 0.24, 4.62, 2.7, 0.52, { fontSize: 13.2, color: C.moss, align: 'center', valign: 'top' });
  });
  text(s, 'Middleware: express.json() parses incoming request data • CORS supports frontend access • dotenv loads environment configuration', 0.73, 5.83, 11.8, 0.43, { fontSize: 14, color: C.ink, align: 'center' });
  footer(s);
}

// 10 — Data model
{
  const s = pptx.addSlide();
  title(s, 'Database: the product model captures the information shoppers need.', 'MongoDB stores a flexible product document, while Mongoose validates key listing fields.', 10, 'Data model');
  rect(s, 0.7, 2.62, 4.03, 3.85, 'F3EEE5');
  text(s, 'PRODUCT DOCUMENT', 0.98, 2.94, 2.6, 0.2, { fontSize: 10, color: C.rust, bold: true, charSpacing: 1.15 });
  text(s, 'Product', 0.98, 3.35, 2.2, 0.34, { fontFace: 'Georgia', fontSize: 27, color: C.ink, bold: true });
  line(s, 0.98, 3.88, 3.43, 0.02, C.line);
  text(s, 'name\ndescription\nprice\ndiscount\ncategory\nsize\nbrand\ncondition\nimageUrl\ncreatedAt / updatedAt', 0.98, 4.12, 2.6, 1.9, { fontFace: 'Courier New', fontSize: 14, color: C.ink, valign: 'top' });
  text(s, 'Validation rules protect the listing quality.', 5.34, 2.78, 5.2, 0.32, { fontFace: 'Georgia', fontSize: 23, color: C.ink, bold: true });
  [['Required', 'name, description, price, category, size, and condition'], ['Controlled values', 'category: Men / Women / Kids / Accessories'], ['Condition options', 'New / Like New / Good / Fair'], ['Timestamps', 'Mongoose records creation and update time automatically']].forEach((f, i) => {
    const y = 3.54 + i * 0.67;
    text(s, f[0], 5.35, y, 1.4, 0.2, { fontSize: 14.2, color: C.rust, bold: true });
    text(s, f[1], 6.93, y, 5.2, 0.26, { fontSize: 13.2, color: C.moss });
  });
  footer(s);
}

// 11 — Full stack flow
{
  const s = pptx.addSlide();
  title(s, 'Full-stack flow: a product request moves cleanly through the system.', 'This pattern connects the visual website to persistent product records.', 11, 'Integration');
  const cells = [
    ['1', 'Shopper action', 'Open a collection or submit a new listing.'],
    ['2', 'React request', 'The client calls the API endpoint.'],
    ['3', 'Express controller', 'The server validates and processes the request.'],
    ['4', 'MongoDB response', 'The database returns saved product data.'],
  ];
  line(s, 1.18, 4.18, 10.95, 0.03, C.moss);
  cells.forEach((c, i) => {
    const x = 0.74 + i * 3.1;
    dot(s, x + 1.22, 4.03, i === 1 ? C.rust : C.forest, 0.3);
    text(s, c[0], x + 1.275, 4.07, 0.19, 0.16, { fontSize: 8, color: C.white, bold: true, align: 'center' });
    text(s, c[1], x, 2.85, 2.75, 0.28, { fontFace: 'Georgia', fontSize: 19, color: C.ink, bold: true, align: 'center' });
    text(s, c[2], x + 0.18, 4.77, 2.4, 0.55, { fontSize: 12.6, color: C.moss, align: 'center', valign: 'top' });
  });
  text(s, 'GET /api/products  →  browse catalog     •     GET /api/products/:id  →  open details     •     POST /api/products  →  create listing', 0.8, 6.05, 11.75, 0.28, { fontFace: 'Courier New', fontSize: 13.3, color: C.ink, align: 'center', bold: true });
  footer(s);
}

// 12 — Build status
{
  const s = pptx.addSlide();
  title(s, 'The project has a working product experience and a clear path to full marketplace operations.', 'Separating today’s implementation from the next release keeps the presentation honest and actionable.', 12, 'Build status');
  text(s, 'IMPLEMENTED NOW', 0.72, 2.72, 3.2, 0.2, { fontSize: 10, color: C.rust, bold: true, charSpacing: 1.2 });
  text(s, 'NEXT FULL-STACK MILESTONE', 6.98, 2.72, 4.2, 0.2, { fontSize: 10, color: C.rust, bold: true, charSpacing: 1.2 });
  const current = ['Responsive React marketplace UI', 'Product catalog browsing & filtering', 'Search, wishlist, cart, and modal details', 'Sell-request and newsletter forms', 'Express + MongoDB product API'];
  const future = ['JWT authentication and user profiles', 'Live product creation from the seller dashboard', 'Orders, payments, and purchase history', 'Admin listing review and user management', 'Cloud image storage and production deployment'];
  [current, future].forEach((list, gi) => list.forEach((item, i) => {
    const x = gi ? 6.98 : 0.72;
    const y = 3.25 + i * 0.56;
    dot(s, x, y + 0.065, gi ? C.gold : C.forest, 0.1);
    text(s, item, x + 0.27, y, 5.4, 0.24, { fontSize: 14.2, color: C.ink });
  }));
  footer(s);
}

// 13 — Roadmap
{
  const s = pptx.addSlide();
  title(s, 'Next, RetroFit can become a complete trusted marketplace.', 'The current product experience is the base for secure transactions, seller tools, and moderation.', 13, 'Roadmap');
  const now = [['User accounts', 'Registration, login, and role-based access.'], ['Product operations', 'Connect listings to the live API and add seller controls.']];
  const next = [['Marketplace trust', 'Listing approval, reviews, and order history.'], ['Growth features', 'Payments, messaging, recommendations, and analytics.']];
  text(s, 'BUILD NEXT', 0.7, 2.7, 2, 0.22, { fontSize: 10, color: C.rust, bold: true, charSpacing: 1.2 });
  text(s, 'EXPAND AFTER', 6.97, 2.7, 2.2, 0.22, { fontSize: 10, color: C.rust, bold: true, charSpacing: 1.2 });
  [now, next].forEach((group, gi) => group.forEach((it, i) => {
    const x = gi ? 6.97 : 0.7;
    const y = 3.22 + i * 1.24;
    text(s, `0${i + 1}`, x, y, 0.38, 0.2, { fontSize: 10, color: C.rust, bold: true });
    text(s, it[0], x + 0.55, y - 0.02, 3.55, 0.26, { fontFace: 'Georgia', fontSize: 19, color: C.ink, bold: true });
    text(s, it[1], x + 0.55, y + 0.39, 4.62, 0.37, { fontSize: 13.5, color: C.moss });
  }));
  line(s, 0.7, 6.05, 12.0, 0.02, C.gold);
  text(s, 'RetroFit turns a smaller wardrobe decision into a more sustainable fashion habit.', 0.7, 6.28, 11.5, 0.4, { fontFace: 'Georgia', fontSize: 20, color: C.forest, bold: true });
  footer(s);
}

// 14 — Closing
{
  const s = pptx.addSlide();
  s.background = { color: C.forest };
  image(s, asset('community', 'community-reading-room.jpg'), 8.44, 0, 4.893, H);
  rect(s, 8.44, 0, 4.893, H, C.forest, 42);
  image(s, asset('retrofit-logo.svg'), 0.72, 0.58, 1.8, 0.46, 'contain');
  text(s, 'A better next chapter\nfor every good garment.', 0.74, 1.82, 6.86, 1.35, { fontFace: 'Georgia', fontSize: 34, color: C.paper, bold: true, valign: 'top' });
  text(s, 'RetroFit combines an engaging React marketplace with a scalable Express and MongoDB foundation—making sustainable fashion easier to discover, share, and grow.', 0.78, 3.64, 6.48, 0.95, { fontSize: 17, color: 'E9E4DA', valign: 'top' });
  line(s, 0.77, 5.45, 1.12, 0.03, C.gold);
  text(s, 'THANK YOU', 0.78, 5.71, 2.2, 0.22, { fontSize: 11, color: C.gold, bold: true, charSpacing: 1.5 });
  text(s, 'Fashion with a future.', 0.78, 6.67, 3.4, 0.24, { fontSize: 12, color: 'E9E4DA', italic: true });
}

await pptx.writeFile({ fileName: path.join(root, 'RetroFit_FullStack_Website_Presentation.pptx') });
