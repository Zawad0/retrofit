// Seeder: insert all demo products directly into MongoDB Atlas
// Run with: node seed.js
// Requires: npm install mongoose dotenv (already in server deps)

require('dotenv').config({ path: '../server/.env' })
const mongoose = require('mongoose')

const BASE = 'https://retrofit-iota.vercel.app/products'

const products = [
  // ─── Women / Western / Tops ───────────────────────────────────────────
  { name: 'Women\u2019s T-Shirt', brand: 'Tokyo', price: 650, size: 'M', group: 'Women', style: 'Western', type: 'Tops', condition: 'Good', usedFor: 'Used for 2 months', image: `${BASE}/womantshirt.jpg` },
  { name: 'Cotton Shirt', brand: 'Aarong', price: 850, size: 'S', group: 'Women', style: 'Western', type: 'Tops', condition: 'Good', usedFor: 'Used for 2 months', image: `${BASE}/womantop.jpg` },
  { name: 'Women\u2019s Jeans', brand: "Levi's", price: 1200, size: '28', group: 'Women', style: 'Western', type: 'Tops', condition: 'Good', usedFor: 'Used for 2 months', image: `${BASE}/womanjeans.jpg` },
  { name: 'Floral Frock', brand: 'Forever 21', price: 1350, size: 'S', group: 'Women', style: 'Western', type: 'Tops', condition: 'Good', usedFor: 'Used for 2 months', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Denim Jumpsuit', brand: 'Bershka', price: 1450, size: 'M', group: 'Women', style: 'Western', type: 'Tops', condition: 'Like New', usedFor: 'Used for 1 month', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90' },
  // ─── Women / Western / Scarf ──────────────────────────────────────────
  { name: 'Pastel Geometric Scarf', brand: 'Deshal', price: 100, size: 'Free size', group: 'Women', style: 'Western', type: 'Scarf', material: 'Light chiffon', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/scarves/pastel-geometric.jpg` },
  { name: 'Colour Block Scarf', brand: 'Aarong', price: 125, size: 'Free size', group: 'Women', style: 'Western', type: 'Scarf', material: 'Soft voile', usedFor: 'Used for 3 months', condition: 'Like New', image: `${BASE}/scarves/colour-block.jpg` },
  { name: 'Coral Stripe Scarf', brand: 'Kay Kraft', price: 150, size: 'Free size', group: 'Women', style: 'Western', type: 'Scarf', material: 'Cotton blend', usedFor: 'Used for 4 months', condition: 'Good', image: `${BASE}/scarves/coral-stripe.jpg` },
  { name: 'Blush Floral Scarf', brand: 'Deshal', price: 200, size: 'Free size', group: 'Women', style: 'Western', type: 'Scarf', material: 'Printed chiffon', usedFor: 'Used for 5 months', condition: 'Good', image: `${BASE}/scarves/blush-floral.jpg` },
  // ─── Women / Western / Nightwear ─────────────────────────────────────
  { name: 'Olive Leaf Nightdress', brand: 'Comfort Wear', price: 480, size: 'M', group: 'Women', style: 'Western', type: 'Nightwear', material: 'Soft cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/nightwear/olive-leaf-nightdress.png`, imageFit: 'contain' },
  { name: 'Charcoal Stripe Pajama Set', brand: 'Comfort Wear', price: 450, size: 'L', group: 'Women', style: 'Western', type: 'Nightwear', material: 'Cotton jersey', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/nightwear/charcoal-stripe-pajama.jpg`, imageFit: 'contain' },
  { name: 'Red Floral Nightdress', brand: 'Deshal', price: 400, size: 'M', group: 'Women', style: 'Western', type: 'Nightwear', material: 'Breathable cotton', usedFor: 'Used for 3 months', condition: 'Good', image: `${BASE}/nightwear/red-floral-nightdress.jpg`, imageFit: 'contain' },
  { name: 'Blush Floral Nightdress', brand: 'Comfort Wear', price: 350, size: 'L', group: 'Women', style: 'Western', type: 'Nightwear', material: 'Printed cotton', usedFor: 'Used for 4 months', condition: 'Good', image: `${BASE}/nightwear/blush-floral-nightdress.jpg`, imageFit: 'contain' },
  // ─── Women / Traditional / Saree ─────────────────────────────────────
  { name: 'Rose Gold Katan Saree', brand: 'Katan', price: 1000, size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Katan silk', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/sarees/katan-4.jpg` },
  { name: 'Black & Red Katan Saree', brand: 'Katan', price: 950, size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Katan silk', usedFor: 'Used for 4 months', condition: 'Like New', image: `${BASE}/sarees/katan-3.jpg` },
  { name: 'Fuchsia Floral Katan Saree', brand: 'Katan', price: 1000, size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Katan silk', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/sarees/katan-5.jpg` },
  { name: 'Emerald Green Katan Saree', brand: 'Katan', price: 900, size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Katan silk', usedFor: 'Used for 3 months', condition: 'Good', image: `${BASE}/sarees/katan-green.jpg` },
  { name: 'Wine Red Katan Saree', brand: 'Katan', price: 980, size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Katan silk', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/sarees/katan-maroon.jpg` },
  { name: 'Black Monipuri Saree', brand: 'Monipuri', price: 850, size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Monipuri cotton', usedFor: 'Used for 5 months', condition: 'Good', image: `${BASE}/sarees/monipuri-black.jpg` },
  { name: 'Lavender Monipuri Saree', brand: 'Monipuri', price: 800, size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Monipuri cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/sarees/monipuri-purple.jpg` },
  { name: 'Blue & White Monipuri Saree', brand: 'Monipuri', price: 900, size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Monipuri cotton', usedFor: 'Used for 4 months', condition: 'Good', image: `${BASE}/sarees/monipuri-blue.jpg` },
  { name: 'Sunshine Yellow Monipuri Saree', brand: 'Monipuri', price: 950, size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Monipuri cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/sarees/monipuri-yellow.jpg` },
  { name: 'Yellow Border Monipuri Saree', brand: 'Monipuri', price: 750, size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Monipuri cotton', usedFor: 'Used for 6 months', condition: 'Good', image: `${BASE}/sarees/monipuri-yellow-border.jpg` },
  { name: 'Purple Embellished Cotton Saree', brand: 'Cotton', price: 900, size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Soft cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/sarees/cotton-purple.jpg` },
  { name: 'Mauve Cotton Saree', brand: 'Cotton', price: 700, size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Pure cotton', usedFor: 'Used for 5 months', condition: 'Good', image: `${BASE}/sarees/cotton-mauve.jpg` },
  { name: 'Olive Green Cotton Saree', brand: 'Cotton', price: 850, size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Pure cotton', usedFor: 'Used for 3 months', condition: 'Like New', image: `${BASE}/sarees/cotton-green.jpg` },
  { name: 'Olive Cotton Silk Saree', brand: 'Cotton Silk', price: 1000, size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Cotton silk blend', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/sarees/cotton-silk-olive.jpg` },
  // ─── Women / Traditional / Salwar Kameez ─────────────────────────────
  { name: 'Maroon Embroidered Salwar Kameez', brand: 'Aarong', price: 600, size: 'M', group: 'Women', style: 'Traditional', type: 'Salwar Kameez', material: 'Embroidered cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/salwar-kameez/maroon-embroidered.jpg` },
  { name: 'Blush Formal Salwar Kameez', brand: 'Kay Kraft', price: 550, size: 'M', group: 'Women', style: 'Traditional', type: 'Salwar Kameez', material: 'Embroidered georgette', usedFor: 'Used for 3 months', condition: 'Like New', image: `${BASE}/salwar-kameez/blush-formal.jpg` },
  { name: 'Sky Blue Classic Salwar Kameez', brand: 'Deshal', price: 450, size: 'L', group: 'Women', style: 'Traditional', type: 'Salwar Kameez', material: 'Soft cotton', usedFor: 'Used for 4 months', condition: 'Good', image: `${BASE}/salwar-kameez/sky-blue-classic.jpg` },
  { name: 'Olive Floral Salwar Kameez', brand: 'Aarong', price: 350, size: 'M', group: 'Women', style: 'Traditional', type: 'Salwar Kameez', material: 'Cotton blend', usedFor: 'Used for 5 months', condition: 'Good', image: `${BASE}/salwar-kameez/olive-floral.jpg` },
  { name: 'Heart Print Salwar Kameez', brand: 'Kay Kraft', price: 500, size: 'M', group: 'Women', style: 'Traditional', type: 'Salwar Kameez', material: 'Printed cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/salwar-kameez/heart-print.jpg` },
  // ─── Women / Traditional / Kurti ─────────────────────────────────────
  { name: 'White & Blue Print Kurti', brand: 'Aarong', price: 700, size: 'M', group: 'Women', style: 'Traditional', type: 'Kurti', material: 'Printed cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/kurtis/white-blue-print.jpg`, imageFit: 'contain' },
  { name: 'Maroon Floral Kurti', brand: 'Kay Kraft', price: 600, size: 'L', group: 'Women', style: 'Traditional', type: 'Kurti', material: 'Cotton blend', usedFor: 'Used for 3 months', condition: 'Like New', image: `${BASE}/kurtis/maroon-floral.jpg`, imageFit: 'contain' },
  { name: 'Ruby Red Kurti', brand: 'Deshal', price: 500, size: 'M', group: 'Women', style: 'Traditional', type: 'Kurti', material: 'Soft cotton', usedFor: 'Used for 4 months', condition: 'Good', image: `${BASE}/kurtis/ruby-red.jpg`, imageFit: 'contain' },
  { name: 'Mustard Block Print Kurti', brand: 'Aarong', price: 400, size: 'M', group: 'Women', style: 'Traditional', type: 'Kurti', material: 'Printed cotton', usedFor: 'Used for 5 months', condition: 'Good', image: `${BASE}/kurtis/mustard-block-print.jpg`, imageFit: 'contain' },
  // ─── Men / Western / Blazer ───────────────────────────────────────────
  { name: 'Burgundy Textured Blazer', brand: 'Raymond', price: 1600, size: 'M', group: 'Men', style: 'Western', type: 'Blazer', material: 'Textured cotton blend', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/blazers/burgundy-textured-blazer.jpg` },
  { name: 'Camel Textured Blazer', brand: 'Ecstasy', price: 1400, size: 'L', group: 'Men', style: 'Western', type: 'Blazer', material: 'Wool blend', usedFor: 'Used for 3 months', condition: 'Good', image: `${BASE}/blazers/camel-textured-blazer.jpg` },
  { name: 'Black Formal Blazer', brand: 'Zara', price: 1200, size: 'M', group: 'Men', style: 'Western', type: 'Blazer', material: 'Polyester blend', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/blazers/black-formal-blazer.jpg`, imageFit: 'contain' },
  { name: 'Navy Classic Blazer', brand: 'Mango Man', price: 800, size: 'XL', group: 'Men', style: 'Western', type: 'Blazer', material: 'Premium cotton blend', usedFor: 'Used for 4 months', condition: 'Good', image: `${BASE}/blazers/navy-classic-blazer.jpg`, imageFit: 'contain' },
  // ─── Men / Western / T-Shirt ──────────────────────────────────────────
  { name: 'Limited T-Shirt', brand: 'Nike', price: 180, size: 'M', group: 'Men', style: 'Western', type: 'T-Shirt', material: 'Cotton jersey', usedFor: 'Used for 15 days', condition: 'Like New', image: `${BASE}/men-tshirt.jpg` },
  { name: 'Brown Oversized T-Shirt', brand: 'Urban Thread', price: 450, size: 'L', group: 'Men', style: 'Western', type: 'T-Shirt', material: 'Heavyweight cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/tshirts/brown-oversized-tshirt.jpg` },
  { name: 'Charcoal Graphic T-Shirt', brand: 'Drift', price: 350, size: 'XL', group: 'Men', style: 'Western', type: 'T-Shirt', material: 'Cotton jersey', usedFor: 'Used for 3 months', condition: 'Good', image: `${BASE}/tshirts/charcoal-graphic-tshirt.jpg` },
  { name: 'Washed Graphic T-Shirt', brand: 'Street Core', price: 500, size: 'L', group: 'Men', style: 'Western', type: 'T-Shirt', material: 'Washed cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/tshirts/washed-graphic-tshirt.jpg` },
  { name: 'Black Oversized T-Shirt', brand: 'H&M', price: 250, size: 'L', group: 'Men', style: 'Western', type: 'T-Shirt', material: 'Soft cotton', usedFor: 'Used for 4 months', condition: 'Good', image: `${BASE}/tshirts/black-oversized-tshirt.jpg` },
  { name: 'Espresso Oversized T-Shirt', brand: 'Zara', price: 400, size: 'M', group: 'Men', style: 'Western', type: 'T-Shirt', material: 'Premium cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/tshirts/espresso-oversized-tshirt.jpg` },
  // ─── Men / Western / Shirt ────────────────────────────────────────────
  { name: 'Classic Shirt', brand: 'Ralph Lauren', price: 340, size: 'L', group: 'Men', style: 'Western', type: 'Shirt', material: 'Cotton', usedFor: 'Used for 2 months', condition: 'Good', image: `${BASE}/men-shirt.jpg` },
  { name: 'Oatmeal Linen Shirt', brand: 'Unbranded', price: 420, size: 'M', group: 'Men', style: 'Western', type: 'Shirt', material: 'Linen blend', usedFor: 'Used for 3 months', condition: 'Good', image: `${BASE}/shirts/oatmeal-linen.jpg` },
  { name: 'White Linen Shirt', brand: 'H&M', price: 500, size: 'L', group: 'Men', style: 'Western', type: 'Shirt', material: 'Pure linen', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/shirts/white-linen.jpg` },
  { name: 'Sky Blue Band Collar Shirt', brand: 'Yellow', price: 460, size: 'M', group: 'Men', style: 'Western', type: 'Shirt', material: 'Cotton linen', usedFor: 'Used for 2 months', condition: 'Good', image: `${BASE}/shirts/sky-blue-kurta.jpg` },
  { name: 'Blush Band Collar Shirt', brand: 'Aarong', price: 480, size: 'L', group: 'Men', style: 'Western', type: 'Shirt', material: 'Soft cotton', usedFor: 'Used for 15 days', condition: 'Like New', image: `${BASE}/shirts/blush-kurta.jpg` },
  { name: 'Teal Linen Shirt', brand: 'Nautica', price: 650, size: 'L', group: 'Men', style: 'Western', type: 'Shirt', material: 'Linen blend', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/shirts/teal-linen.jpg` },
  { name: 'Sand Linen Shirt', brand: 'Mango Man', price: 520, size: 'M', group: 'Men', style: 'Western', type: 'Shirt', material: 'Linen blend', usedFor: 'Used for 4 months', condition: 'Good', image: `${BASE}/shirts/sand-linen.jpg` },
  { name: 'Cream Stripe Shirt', brand: 'Zara', price: 600, size: 'XL', group: 'Men', style: 'Western', type: 'Shirt', material: 'Cotton blend', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/shirts/cream-stripe.jpg` },
  { name: 'Olive Stripe Shirt', brand: 'Unbranded', price: 350, size: 'M', group: 'Men', style: 'Western', type: 'Shirt', material: 'Cotton', usedFor: 'Used for 3 months', condition: 'Good', image: `${BASE}/shirts/olive-stripe.jpg` },
  { name: 'Navy Stripe Shirt', brand: 'Showoff', price: 550, size: 'M', group: 'Men', style: 'Western', type: 'Shirt', material: 'Cotton blend', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/shirts/navy-stripe.jpg` },
  { name: 'Grey Stripe Overshirt', brand: 'H&M', price: 575, size: 'L', group: 'Men', style: 'Western', type: 'Shirt', material: 'Soft cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/shirts/grey-stripe.jpg` },
  { name: 'Maroon Check Shirt', brand: 'Zara', price: 450, size: 'L', group: 'Men', style: 'Western', type: 'Shirt', material: 'Cotton flannel', usedFor: 'Used for 3 months', condition: 'Good', image: `${BASE}/shirts/maroon-check.jpg` },
  { name: 'Stone Check Shirt', brand: 'M&S', price: 700, size: 'XL', group: 'Men', style: 'Western', type: 'Shirt', material: 'Brushed cotton', usedFor: 'Used for 15 days', condition: 'Like New', image: `${BASE}/shirts/stone-check.jpg` },
  // ─── Men / Western / Jersey ───────────────────────────────────────────
  { name: 'Manchester City Home Jersey', brand: 'Puma', price: 400, size: 'L', group: 'Men', style: 'Western', type: 'Jersey', material: 'Breathable polyester', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/jerseys/manchester-city-jersey.jpg`, imageFit: 'contain' },
  { name: 'Barcelona Home Jersey', brand: 'Nike', price: 380, size: 'M', group: 'Men', style: 'Western', type: 'Jersey', material: 'Breathable polyester', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/jerseys/barcelona-home-jersey.jpg`, imageFit: 'contain' },
  { name: 'Barcelona Purple Jersey', brand: 'Nike', price: 350, size: 'L', group: 'Men', style: 'Western', type: 'Jersey', material: 'Lightweight polyester', usedFor: 'Used for 3 months', condition: 'Good', image: `${BASE}/jerseys/barcelona-purple-jersey.jpg`, imageFit: 'contain' },
  { name: 'Arsenal Home Jersey', brand: 'Adidas', price: 320, size: 'XL', group: 'Men', style: 'Western', type: 'Jersey', material: 'Moisture-wicking polyester', usedFor: 'Used for 2 months', condition: 'Good', image: `${BASE}/jerseys/arsenal-home-jersey.jpg`, imageFit: 'contain' },
  { name: 'Real Madrid Green Jersey', brand: 'Adidas', price: 280, size: 'M', group: 'Men', style: 'Western', type: 'Jersey', material: 'Lightweight polyester', usedFor: 'Used for 4 months', condition: 'Good', image: `${BASE}/jerseys/real-madrid-green-jersey.jpg`, imageFit: 'contain' },
  { name: 'Real Madrid Home Jersey', brand: 'Adidas', price: 250, size: 'L', group: 'Men', style: 'Western', type: 'Jersey', material: 'Breathable polyester', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/jerseys/real-madrid-home-jersey.jpg`, imageFit: 'contain' },
  // ─── Men / Traditional / Punjabi ─────────────────────────────────────
  { name: 'Embroidered Panjabi', brand: 'Aarong', price: 650, size: 'L', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Cotton blend', usedFor: 'Used for 3 months', condition: 'Good', image: `${BASE}/men-punjabi.jpg` },
  { name: 'Royal Festive Punjabi', brand: 'Aarong', price: 800, size: 'L', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Silk blend', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/punjabi-royal.jpg` },
  { name: 'Lavender Printed Punjabi', brand: 'Aarong', price: 780, size: 'L', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Cotton blend', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/punjabis/lavender-printed.jpg` },
  { name: 'Sage Green Classic Punjabi', brand: 'Yellow', price: 520, size: 'M', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Soft cotton', usedFor: 'Used for 4 months', condition: 'Good', image: `${BASE}/punjabis/sage-classic.jpg` },
  { name: 'Navy Floral Punjabi', brand: 'Kay Kraft', price: 720, size: 'L', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Printed cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/punjabis/navy-floral.jpg` },
  { name: 'Mustard Motif Punjabi', brand: 'Aarong', price: 680, size: 'XL', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Cotton blend', usedFor: 'Used for 3 months', condition: 'Good', image: `${BASE}/punjabis/mustard-printed.jpg` },
  { name: 'Mauve Embroidered Punjabi', brand: 'Deshal', price: 750, size: 'M', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Embroidered cotton', usedFor: 'Used for 15 days', condition: 'Like New', image: `${BASE}/punjabis/mauve-embroidered.jpg` },
  { name: 'Mint Stripe Punjabi', brand: 'Ecstasy', price: 600, size: 'L', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Cotton blend', usedFor: 'Used for 2 months', condition: 'Good', image: `${BASE}/punjabis/mint-striped.jpg` },
  { name: 'Ivory Chain Print Punjabi', brand: 'Aarong', price: 700, size: 'XL', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Premium cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/punjabis/ivory-chain-print.jpg` },
  { name: 'Silver Patterned Punjabi', brand: 'Kay Kraft', price: 800, size: 'L', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Jacquard cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: `${BASE}/punjabis/silver-patterned.jpg` },
  // ─── Kids / Newborn ───────────────────────────────────────────────────
  { name: 'Cherry Baby Bath Suit', brand: 'Mothercare', price: 320, size: '6\u201312 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Soft cotton', usedFor: 'Used for 15 days', condition: 'Like New', image: `${BASE}/baby-bath-suit.jpg` },
  { name: 'Newborn Baby Jumpsuit', brand: 'Baby Shop', price: 330, size: '0\u20136 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Soft cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/newborn-baby-jumpsuit.jpg` },
  { name: 'Floral Newborn Swimsuit', brand: 'Baby Shop', price: 300, size: '0\u20133 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Cotton blend', usedFor: 'Used for 15 days', condition: 'Like New', image: `${BASE}/newborn/floral-swimsuit.jpg` },
  { name: 'Lavender Bird Print Dress', brand: 'Mothercare', price: 320, size: '0\u20133 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Soft cotton', usedFor: 'Used for 2 months', condition: 'Good', image: `${BASE}/newborn/lavender-dress.jpg` },
  { name: 'Berry Floral Baby Dress', brand: 'Baby Shop', price: 300, size: '0\u20136 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/newborn/berry-dress.jpg` },
  { name: 'Heart Print Newborn Set', brand: 'Mothercare', price: 350, size: '0\u20136 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Muslin cotton', usedFor: 'Used for 3 months', condition: 'Good', image: `${BASE}/newborn/heart-set.jpg` },
  { name: 'Pink Bow Baby Romper', brand: 'Baby Shop', price: 310, size: '0\u20133 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Cotton blend', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/newborn/pink-bow-romper.jpg` },
  { name: 'Pink Collar Baby Romper', brand: 'Mothercare', price: 330, size: '0\u20136 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Soft cotton', usedFor: 'Used for 2 months', condition: 'Good', image: `${BASE}/newborn/pink-collar-romper.jpg` },
  { name: 'Bear Print Baby Bodysuit', brand: 'Baby Shop', price: 350, size: '0\u20133 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Pure cotton', usedFor: 'Used for 15 days', condition: 'Like New', image: `${BASE}/newborn/bear-bodysuit.jpg` },
  { name: 'Animal Polo Short Set', brand: 'Mothercare', price: 350, size: '0\u20136 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Cotton blend', usedFor: 'Used for 1 month', condition: 'Good', image: `${BASE}/newborn/animal-polo-set.jpg` },
  { name: 'Sailor Stripe Baby Romper', brand: 'Baby Shop', price: 320, size: '0\u20136 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Soft knit cotton', usedFor: 'Used for 2 months', condition: 'Good', image: `${BASE}/newborn/sailor-romper.jpg` },
  { name: 'Beach Print Newborn Romper', brand: 'H&M', price: 310, size: '0\u20133 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Organic cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/newborn/beach-romper.jpg` },
  { name: 'Cloud Print Baby Bodysuit', brand: 'Baby Shop', price: 280, size: '0\u20133 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Soft cotton', usedFor: 'Used for 15 days', condition: 'Like New', image: `${BASE}/newborn/cloud-bodysuit.jpg` },
  // ─── Kids / 1-3 years ─────────────────────────────────────────────────
  { name: 'Cotton Co-ord Set', brand: 'Yellow', price: 350, size: '1\u20132 Y', group: 'Kids', style: 'Western', type: '1\u20133 years', material: 'Pure cotton', usedFor: 'Used for 1 month', condition: 'Good', image: `${BASE}/cotton-co-ord-set.jpg`, imageFit: 'contain' },
  // ─── Kids / 4-7 years ─────────────────────────────────────────────────
  { name: 'Smocked Puff Sleeve Dress', brand: 'Mothercare', price: 350, size: '4\u20137 Y', group: 'Kids', style: 'Western', type: '4\u20137 years', material: 'Cotton blend', usedFor: 'Used for 2 months', condition: 'Good', image: `${BASE}/smocked-baby-dress.jpg`, imageFit: 'contain' },
  // ─── Kids / 8-12 years ────────────────────────────────────────────────
  { name: 'Kids Casual Outfit', brand: 'H&M', price: 420, size: '8\u201312 Y', group: 'Kids', style: 'Western', type: '8\u201312 years', material: 'Cotton blend', usedFor: 'Used for 2 months', condition: 'Good', image: `${BASE}/kid.jpg` },
  { name: 'Grey Co-ord Set', brand: 'Stussy', price: 480, size: '8\u201312 Y', group: 'Kids', style: 'Western', type: '8\u201312 years', material: 'Soft cotton blend', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/8-12-years/grey-co-ord-set.jpg`, imageFit: 'contain' },
  { name: 'Black Embroidered Kurti', brand: 'Deshal', price: 450, size: '8\u201312 Y', group: 'Kids', style: 'Traditional', type: '8\u201312 years', material: 'Embroidered georgette', usedFor: 'Used for 2 months', condition: 'Good', image: `${BASE}/8-12-years/black-embroidered-kurti.jpg`, imageFit: 'contain' },
  { name: 'Red Print Kurti', brand: 'Aarong', price: 430, size: '8\u201312 Y', group: 'Kids', style: 'Traditional', type: '8\u201312 years', material: 'Printed cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: `${BASE}/8-12-years/red-print-kurti.jpg`, imageFit: 'contain' },
  { name: 'Yellow Printed Kurti', brand: 'Kay Kraft', price: 400, size: '8\u201312 Y', group: 'Kids', style: 'Traditional', type: '8\u201312 years', material: 'Soft cotton', usedFor: 'Used for 3 months', condition: 'Good', image: `${BASE}/8-12-years/yellow-kurti.jpg`, imageFit: 'contain' },
]

async function seed() {
  const uri = process.env.MONGODB_URI.replace('mongodb.net/', 'mongodb.net/retrofit')
  console.log('Connecting to MongoDB…')
  await mongoose.connect(uri)

  const db = mongoose.connection.db
  const collection = db.collection('products')

  // Remove existing demo products (those without a seller) to avoid duplicates
  const { deletedCount } = await collection.deleteMany({ seller: { $exists: false } })
  console.log(`Removed ${deletedCount} existing demo products.`)

  // Insert all demo products
  const docs = products.map((p) => ({
    ...p,
    category: p.group,
    imageUrl: p.image,
    imageFit: p.imageFit || 'cover',
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

  const result = await collection.insertMany(docs)
  console.log(`✓ Seeded ${result.insertedCount} products into the retrofit database.`)
  await mongoose.disconnect()
}

seed().catch((err) => { console.error(err); process.exit(1) })
