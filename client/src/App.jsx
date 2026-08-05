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
import royalPunjabi from './assets/products/punjabi-royal.jpg'
import floralSwimsuit from './assets/products/newborn/floral-swimsuit.jpg'
import lavenderDress from './assets/products/newborn/lavender-dress.jpg'
import berryDress from './assets/products/newborn/berry-dress.jpg'
import heartSet from './assets/products/newborn/heart-set.jpg'
import pinkBowRomper from './assets/products/newborn/pink-bow-romper.jpg'
import pinkCollarRomper from './assets/products/newborn/pink-collar-romper.jpg'
import bearBodysuit from './assets/products/newborn/bear-bodysuit.jpg'
import animalPoloSet from './assets/products/newborn/animal-polo-set.jpg'
import sailorRomper from './assets/products/newborn/sailor-romper.jpg'
import beachRomper from './assets/products/newborn/beach-romper.jpg'
import cloudBodysuit from './assets/products/newborn/cloud-bodysuit.jpg'
import sareeCategory from './assets/women-categories/saree.jpg'
import salwarKameezCategory from './assets/women-categories/salwar-kameez.jpg'
import kurtiCategory from './assets/women-categories/kurti.jpg'
import nightwearCategory from './assets/women-categories/nightwear.jpg'
import menTshirtCategory from './assets/men-categories/tshirt.jpg'
import menSuitCategory from './assets/men-categories/suit.jpg'
import menJerseyCategory from './assets/men-categories/jersey.jpg'
import menShirtCategory from './assets/men-categories/shirt.jpg'
import katan4 from './assets/products/sarees/katan-4.jpg'
import katan3 from './assets/products/sarees/katan-3.jpg'
import katan5 from './assets/products/sarees/katan-5.jpg'
import katanGreen from './assets/products/sarees/katan-green.jpg'
import katanMaroon from './assets/products/sarees/katan-maroon.jpg'
import monipuriBlack from './assets/products/sarees/monipuri-black.jpg'
import monipuriPurple from './assets/products/sarees/monipuri-purple.jpg'
import monipuriBlue from './assets/products/sarees/monipuri-blue.jpg'
import monipuriYellow from './assets/products/sarees/monipuri-yellow.jpg'
import monipuriYellowBorder from './assets/products/sarees/monipuri-yellow-border.jpg'
import cottonPurple from './assets/products/sarees/cotton-purple.jpg'
import cottonMauve from './assets/products/sarees/cotton-mauve.jpg'
import cottonGreen from './assets/products/sarees/cotton-green.jpg'
import cottonSilkOlive from './assets/products/sarees/cotton-silk-olive.jpg'
import lavenderPrintedPunjabi from './assets/products/punjabis/lavender-printed.jpg'
import sageClassicPunjabi from './assets/products/punjabis/sage-classic.jpg'
import navyFloralPunjabi from './assets/products/punjabis/navy-floral.jpg'
import mustardPrintedPunjabi from './assets/products/punjabis/mustard-printed.jpg'
import mauveEmbroideredPunjabi from './assets/products/punjabis/mauve-embroidered.jpg'
import mintStripedPunjabi from './assets/products/punjabis/mint-striped.jpg'
import ivoryChainPrintPunjabi from './assets/products/punjabis/ivory-chain-print.jpg'
import silverPatternedPunjabi from './assets/products/punjabis/silver-patterned.jpg'
import oatmealLinenShirt from './assets/products/shirts/oatmeal-linen.jpg'
import whiteLinenShirt from './assets/products/shirts/white-linen.jpg'
import skyBlueKurtaShirt from './assets/products/shirts/sky-blue-kurta.jpg'
import blushKurtaShirt from './assets/products/shirts/blush-kurta.jpg'
import tealLinenShirt from './assets/products/shirts/teal-linen.jpg'
import sandLinenShirt from './assets/products/shirts/sand-linen.jpg'
import creamStripeShirt from './assets/products/shirts/cream-stripe.jpg'
import oliveStripeShirt from './assets/products/shirts/olive-stripe.jpg'
import navyStripeShirt from './assets/products/shirts/navy-stripe.jpg'
import greyStripeShirt from './assets/products/shirts/grey-stripe.jpg'
import maroonCheckShirt from './assets/products/shirts/maroon-check.jpg'
import stoneCheckShirt from './assets/products/shirts/stone-check.jpg'
import './App.css'
import './product-modal.css'

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

const menCategories = [
  { name: 'Punjabi', type: 'Punjabi', image: royalPunjabi },
  { name: 'Shirt', type: 'Shirt', image: menShirtCategory },
  { name: 'T-Shirt', type: 'T-Shirt', image: menTshirtCategory },
  { name: 'Jersey', type: 'Jersey', image: menJerseyCategory },
  { name: 'Suit', type: 'Suit', image: menSuitCategory },
]

const kidsCategories = [
  { name: 'Newborn', type: 'Newborn', image: newbornBabyJumpsuit },
  { name: '2–8 years', type: '2–8 years', image: cottonCoOrdSet },
  { name: '8–12 years', type: '8–12 years', image: smockedBabyDress },
  { name: '12–18 years', type: '12–18 years', image: kidsPicture },
]

const products = [
  { name: 'Women’s T-Shirt', brand: 'Tokyo', price: '650', size: 'M', group: 'Women', style: 'Western', image: womanTshirt },
  { name: 'Cotton Shirt', brand: 'Aarong', price: '850', size: 'S', group: 'Women', style: 'Western', image: womanTop },
  { name: 'Women’s Jeans', brand: 'Levi\'s', price: '1,200', size: '28', group: 'Women', style: 'Western', image: womanJeans },
  { name: 'Women’s Scarf', brand: 'Deshal', price: '750', size: 'Free size', group: 'Women', style: 'Western', image: womanScarf },
  { name: 'Floral Frock', brand: 'Forever 21', price: '1,350', size: 'S', group: 'Women', style: 'Western', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Denim Jumpsuit', brand: 'Bershka', price: '1,450', size: 'M', group: 'Women', style: 'Western', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Rose Gold Katan Saree', brand: 'Katan', price: '1,200', size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Katan silk', usedFor: 'Used for 2 months', condition: 'Like New', image: katan4 },
  { name: 'Black & Red Katan Saree', brand: 'Katan', price: '1,150', size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Katan silk', usedFor: 'Used for 4 months', condition: 'Like New', image: katan3 },
  { name: 'Fuchsia Floral Katan Saree', brand: 'Katan', price: '1,200', size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Katan silk', usedFor: 'Used for 1 month', condition: 'Like New', image: katan5 },
  { name: 'Emerald Green Katan Saree', brand: 'Katan', price: '1,100', size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Katan silk', usedFor: 'Used for 3 months', condition: 'Good', image: katanGreen },
  { name: 'Wine Red Katan Saree', brand: 'Katan', price: '1,200', size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Katan silk', usedFor: 'Used for 2 months', condition: 'Like New', image: katanMaroon },
  { name: 'Black Monipuri Saree', brand: 'Monipuri', price: '850', size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Monipuri cotton', usedFor: 'Used for 5 months', condition: 'Good', image: monipuriBlack },
  { name: 'Lavender Monipuri Saree', brand: 'Monipuri', price: '800', size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Monipuri cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: monipuriPurple },
  { name: 'Blue & White Monipuri Saree', brand: 'Monipuri', price: '900', size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Monipuri cotton', usedFor: 'Used for 4 months', condition: 'Good', image: monipuriBlue },
  { name: 'Sunshine Yellow Monipuri Saree', brand: 'Monipuri', price: '950', size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Monipuri cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: monipuriYellow },
  { name: 'Yellow Border Monipuri Saree', brand: 'Monipuri', price: '750', size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Monipuri cotton', usedFor: 'Used for 6 months', condition: 'Good', image: monipuriYellowBorder },
  { name: 'Purple Embellished Cotton Saree', brand: 'Cotton', price: '1,050', size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Soft cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: cottonPurple },
  { name: 'Mauve Cotton Saree', brand: 'Cotton', price: '700', size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Pure cotton', usedFor: 'Used for 5 months', condition: 'Good', image: cottonMauve },
  { name: 'Olive Green Cotton Saree', brand: 'Cotton', price: '850', size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Pure cotton', usedFor: 'Used for 3 months', condition: 'Like New', image: cottonGreen },
  { name: 'Olive Cotton Silk Saree', brand: 'Cotton Silk', price: '1,100', size: 'Free size', group: 'Women', style: 'Traditional', type: 'Saree', material: 'Cotton silk blend', usedFor: 'Used for 2 months', condition: 'Like New', image: cottonSilkOlive },
  { name: 'Salwar Kameez Set', brand: 'Aarong', price: '1,650', size: 'M', group: 'Women', style: 'Traditional', type: 'Salwar Kameez', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Printed Kurti', brand: 'Kay Kraft', price: '950', size: 'L', group: 'Women', style: 'Traditional', type: 'Kurti', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Warm Chador', brand: 'Deshal', price: '1,100', size: 'Free size', group: 'Women', style: 'Traditional', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Long Kurti', brand: 'Kay Kraft', price: '1,050', size: 'M', group: 'Women', style: 'Traditional', type: 'Kurti', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Short Kurti', brand: 'Aarong', price: '890', size: 'S', group: 'Women', style: 'Traditional', type: 'Kurti', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Cotton Pyjama', brand: 'Deshal', price: '650', size: 'M', group: 'Women', style: 'Traditional', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Classic Men’s Suit', brand: 'Zara', price: '2,400', size: 'L', group: 'Men', style: 'Western', type: 'Suit', image: menSuit },
  { name: 'Classic Shirt', brand: 'Ralph Lauren', price: '340', size: 'L', group: 'Men', style: 'Western', type: 'Shirt', material: 'Cotton', usedFor: 'Used for 2 months', condition: 'Good', image: menShirt },
  { name: 'Limited T-Shirt', brand: 'Nike', price: '180', size: 'M', group: 'Men', style: 'Western', type: 'T-Shirt', material: 'Cotton jersey', usedFor: 'Used for 15 days', condition: 'Like New', image: menTshirt },
  { name: 'Embroidered Panjabi', brand: 'Aarong', price: '650', size: 'L', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Cotton blend', usedFor: 'Used for 3 months', condition: 'Good', image: menPunjabi },
  { name: 'Royal Festive Punjabi', brand: 'Aarong', price: '800', size: 'L', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Silk blend', usedFor: 'Used for 1 month', condition: 'Like New', image: royalPunjabi },
  { name: 'Lavender Printed Punjabi', brand: 'Aarong', price: '780', size: 'L', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Cotton blend', usedFor: 'Used for 1 month', condition: 'Like New', image: lavenderPrintedPunjabi },
  { name: 'Sage Green Classic Punjabi', brand: 'Yellow', price: '520', size: 'M', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Soft cotton', usedFor: 'Used for 4 months', condition: 'Good', image: sageClassicPunjabi },
  { name: 'Navy Floral Punjabi', brand: 'Kay Kraft', price: '720', size: 'L', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Printed cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: navyFloralPunjabi },
  { name: 'Mustard Motif Punjabi', brand: 'Aarong', price: '680', size: 'XL', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Cotton blend', usedFor: 'Used for 3 months', condition: 'Good', image: mustardPrintedPunjabi },
  { name: 'Mauve Embroidered Punjabi', brand: 'Deshal', price: '750', size: 'M', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Embroidered cotton', usedFor: 'Used for 15 days', condition: 'Like New', image: mauveEmbroideredPunjabi },
  { name: 'Mint Stripe Punjabi', brand: 'Ecstasy', price: '600', size: 'L', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Cotton blend', usedFor: 'Used for 2 months', condition: 'Good', image: mintStripedPunjabi },
  { name: 'Ivory Chain Print Punjabi', brand: 'Aarong', price: '700', size: 'XL', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Premium cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: ivoryChainPrintPunjabi },
  { name: 'Silver Patterned Punjabi', brand: 'Kay Kraft', price: '800', size: 'L', group: 'Men', style: 'Traditional', type: 'Punjabi', material: 'Jacquard cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: silverPatternedPunjabi },
  { name: 'Oatmeal Linen Shirt', brand: 'Unbranded', price: '420', size: 'M', group: 'Men', style: 'Western', type: 'Shirt', material: 'Linen blend', usedFor: 'Used for 3 months', condition: 'Good', image: oatmealLinenShirt },
  { name: 'White Linen Shirt', brand: 'H&M', price: '500', size: 'L', group: 'Men', style: 'Western', type: 'Shirt', material: 'Pure linen', usedFor: 'Used for 1 month', condition: 'Like New', image: whiteLinenShirt },
  { name: 'Sky Blue Band Collar Shirt', brand: 'Yellow', price: '460', size: 'M', group: 'Men', style: 'Western', type: 'Shirt', material: 'Cotton linen', usedFor: 'Used for 2 months', condition: 'Good', image: skyBlueKurtaShirt },
  { name: 'Blush Band Collar Shirt', brand: 'Aarong', price: '480', size: 'L', group: 'Men', style: 'Western', type: 'Shirt', material: 'Soft cotton', usedFor: 'Used for 15 days', condition: 'Like New', image: blushKurtaShirt },
  { name: 'Teal Linen Shirt', brand: 'Nautica', price: '650', size: 'L', group: 'Men', style: 'Western', type: 'Shirt', material: 'Linen blend', usedFor: 'Used for 2 months', condition: 'Like New', image: tealLinenShirt },
  { name: 'Sand Linen Shirt', brand: 'Mango Man', price: '520', size: 'M', group: 'Men', style: 'Western', type: 'Shirt', material: 'Linen blend', usedFor: 'Used for 4 months', condition: 'Good', image: sandLinenShirt },
  { name: 'Cream Stripe Shirt', brand: 'Zara', price: '600', size: 'XL', group: 'Men', style: 'Western', type: 'Shirt', material: 'Cotton blend', usedFor: 'Used for 1 month', condition: 'Like New', image: creamStripeShirt },
  { name: 'Olive Stripe Shirt', brand: 'Unbranded', price: '350', size: 'M', group: 'Men', style: 'Western', type: 'Shirt', material: 'Cotton', usedFor: 'Used for 3 months', condition: 'Good', image: oliveStripeShirt },
  { name: 'Navy Stripe Shirt', brand: 'Showoff', price: '550', size: 'M', group: 'Men', style: 'Western', type: 'Shirt', material: 'Cotton blend', usedFor: 'Used for 2 months', condition: 'Like New', image: navyStripeShirt },
  { name: 'Grey Stripe Overshirt', brand: 'H&M', price: '575', size: 'L', group: 'Men', style: 'Western', type: 'Shirt', material: 'Soft cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: greyStripeShirt },
  { name: 'Maroon Check Shirt', brand: 'Zara', price: '450', size: 'L', group: 'Men', style: 'Western', type: 'Shirt', material: 'Cotton flannel', usedFor: 'Used for 3 months', condition: 'Good', image: maroonCheckShirt },
  { name: 'Stone Check Shirt', brand: 'M&S', price: '700', size: 'XL', group: 'Men', style: 'Western', type: 'Shirt', material: 'Brushed cotton', usedFor: 'Used for 15 days', condition: 'Like New', image: stoneCheckShirt },
  { name: 'Sports Jersey', brand: 'Adidas', price: '350', size: 'M', group: 'Men', style: 'Western', type: 'Jersey', material: 'Polyester', usedFor: 'Used for 2 months', condition: 'Good', image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Straight Fit Jeans', brand: 'Levi\'s', price: '1,250', size: '32', group: 'Men', style: 'Western', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Cotton Trousers', brand: 'M&S', price: '1,000', size: '34', group: 'Men', style: 'Western', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Cherry Baby Bath Suit', brand: 'Mothercare', price: '320', size: '6–12 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Soft cotton', usedFor: 'Used for 15 days', condition: 'Like New', image: babyBathSuit },
  { name: 'Cotton Co-ord Set', brand: 'Yellow', price: '350', size: '1–2 Y', group: 'Kids', style: 'Western', type: '2–8 years', material: 'Pure cotton', usedFor: 'Used for 1 month', condition: 'Good', image: cottonCoOrdSet, imageFit: 'contain' },
  { name: 'Smocked Puff Sleeve Dress', brand: 'Mothercare', price: '350', size: '1–2 Y', group: 'Kids', style: 'Western', type: '8–12 years', material: 'Cotton blend', usedFor: 'Used for 2 months', condition: 'Good', image: smockedBabyDress, imageFit: 'contain' },
  { name: 'Newborn Baby Jumpsuit', brand: 'Baby Shop', price: '330', size: '0–6 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Soft cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: newbornBabyJumpsuit },
  { name: 'Floral Newborn Swimsuit', brand: 'Baby Shop', price: '300', size: '0–3 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Cotton blend', usedFor: 'Used for 15 days', condition: 'Like New', image: floralSwimsuit },
  { name: 'Lavender Bird Print Dress', brand: 'Mothercare', price: '320', size: '0–3 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Soft cotton', usedFor: 'Used for 2 months', condition: 'Good', image: lavenderDress },
  { name: 'Berry Floral Baby Dress', brand: 'Baby Shop', price: '300', size: '0–6 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: berryDress },
  { name: 'Heart Print Newborn Set', brand: 'Mothercare', price: '350', size: '0–6 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Muslin cotton', usedFor: 'Used for 3 months', condition: 'Good', image: heartSet },
  { name: 'Pink Bow Baby Romper', brand: 'Baby Shop', price: '310', size: '0–3 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Cotton blend', usedFor: 'Used for 1 month', condition: 'Like New', image: pinkBowRomper },
  { name: 'Pink Collar Baby Romper', brand: 'Mothercare', price: '330', size: '0–6 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Soft cotton', usedFor: 'Used for 2 months', condition: 'Good', image: pinkCollarRomper },
  { name: 'Bear Print Baby Bodysuit', brand: 'Baby Shop', price: '350', size: '0–3 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Pure cotton', usedFor: 'Used for 15 days', condition: 'Like New', image: bearBodysuit },
  { name: 'Animal Polo Short Set', brand: 'Mothercare', price: '350', size: '0–6 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Cotton blend', usedFor: 'Used for 1 month', condition: 'Good', image: animalPoloSet },
  { name: 'Sailor Stripe Baby Romper', brand: 'Baby Shop', price: '320', size: '0–6 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Soft knit cotton', usedFor: 'Used for 2 months', condition: 'Good', image: sailorRomper },
  { name: 'Beach Print Newborn Romper', brand: 'H&M', price: '310', size: '0–3 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Organic cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: beachRomper },
  { name: 'Cloud Print Baby Bodysuit', brand: 'Baby Shop', price: '280', size: '0–3 M', group: 'Kids', style: 'Western', type: 'Newborn', material: 'Soft cotton', usedFor: 'Used for 15 days', condition: 'Like New', image: cloudBodysuit },
]

function ProductCard({ product, showPrice = true, onViewProduct }) {
  return <article className="product-card"><div className="product-image" role="button" tabIndex="0" onClick={() => onViewProduct(product)} onKeyDown={(event) => event.key === 'Enter' && onViewProduct(product)}><img className={product.imageFit === 'contain' ? 'image-contain' : ''} src={product.image} alt={product.name} /><button aria-label={`Save ${product.name}`} onClick={(event) => event.stopPropagation()}>♡</button></div><div className="product-details"><div><p className="product-category">{product.group}</p><h3>{product.name}</h3><p>{product.brand} · {product.size}</p></div>{showPrice && <strong>৳ {product.price}</strong>}</div><button className="view-product-button" onClick={() => onViewProduct(product)}>View product <span>→</span></button></article>
}

function App() {
  const [page, setPage] = useState('Home')
  const [collectionStyle, setCollectionStyle] = useState('All clothing')
  const [traditionalType, setTraditionalType] = useState('')
  const [womenCategoryPage, setWomenCategoryPage] = useState(false)
  const [menCategoryPage, setMenCategoryPage] = useState(false)
  const [kidsCategoryPage, setKidsCategoryPage] = useState(false)
  const [slide, setSlide] = useState(0)
  const [signInOpen, setSignInOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [imageZoomed, setImageZoomed] = useState(false)
  const activeSlide = slides[slide]
  const collectionLinkLabel = activeSlide.group === 'Kids' ? 'View kids’ wear →' : `View ${activeSlide.group.toLowerCase()}’s wear →`
  const collectionProducts = page === 'Home' ? products.filter((product) => product.group === activeSlide.group) : products.filter((product) => product.group === page && (collectionStyle === 'All clothing' || product.style === collectionStyle) && (!traditionalType || product.type === traditionalType))
  const shownProducts = page === 'Home' ? collectionProducts.slice(0, 4) : collectionProducts

  const goToPage = (newPage) => { setPage(newPage); setCollectionStyle(newPage === 'Women' ? 'Traditional' : 'All clothing'); setTraditionalType(''); setWomenCategoryPage(newPage === 'Women'); setMenCategoryPage(newPage === 'Men'); setKidsCategoryPage(newPage === 'Kids'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const goToWomenCollection = (style, type = '') => { setPage('Women'); setCollectionStyle(style); setTraditionalType(type); setWomenCategoryPage(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const goToCategoryCollection = (group, type) => { setPage(group); setCollectionStyle('All clothing'); setTraditionalType(type); setMenCategoryPage(false); setKidsCategoryPage(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
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
      <nav className="primary-nav"><button className={page === 'Home' ? 'active' : ''} onClick={() => goToPage('Home')}>Home</button><button className={page === 'Men' ? 'active' : ''} onClick={() => goToPage('Men')}>Men</button><button className={page === 'Women' ? 'active' : ''} onClick={() => goToPage('Women')}>Women</button><button className={page === 'Kids' ? 'active' : ''} onClick={() => goToPage('Kids')}>Kids</button><a href="#collection">New arrivals</a><a href="#how-it-works">How it works</a><a href="#newsletter">Community</a></nav>
    </header>

    <main>
      {page === 'Home' && <section className="hero-section">
        <div className="hero-copy"><p className="eyebrow">{activeSlide.eyebrow}</p><h1>{activeSlide.title}</h1><p className="hero-text">{activeSlide.text}</p><div className="hero-actions"><button className="primary-button" onClick={() => document.querySelector('#collection').scrollIntoView({ behavior: 'smooth' })}>Shop the edit <span>→</span></button><button className="text-button" onClick={() => document.querySelector('#collection').scrollIntoView({ behavior: 'smooth' })}>Explore the collection</button></div><div className="slider-dots">{slides.map((_, index) => <button aria-label={`Show slide ${index + 1}`} className={slide === index ? 'selected' : ''} key={index} onClick={() => setSlide(index)} />)}</div></div>
        <div className="hero-image-wrap"><div className="slider-window"><div className="slider-track" style={{ transform: `translateX(-${slide * 100}%)` }}>{slides.map((item, index) => <img src={item.image} alt={`RetroFit collection ${index + 1}`} key={item.image} />)}</div></div><button className="hero-arrow previous" onClick={() => changeSlide(-1)} aria-label="Previous slide">‹</button><button className="hero-arrow next" onClick={() => changeSlide(1)} aria-label="Next slide">›</button></div>
      </section>}

      <section className="values" aria-label="RetroFit promises"><div className="values-track">{['Give Clothes A New Story', 'Premium Brands For Less', 'Gently Used & Ready To Wear', 'Luxury Looks At Thrift Prices', 'Smart Fashion For Smart Savings', 'Eco-Conscious Closet', 'Give Clothes A New Story', 'Premium Brands For Less', 'Gently Used & Ready To Wear', 'Luxury Looks At Thrift Prices', 'Smart Fashion For Smart Savings', 'Eco-Conscious Closet'].map((message, index) => <p key={`${message}-${index}`}>{message}</p>)}</div></section>

      {page === 'Women' && womenCategoryPage ? <section className="women-categories" id="collection"><h1>Shop by category</h1><div className="women-category-grid">{womenCategories.map((category) => <button className={`women-category-card ${category.name.toLowerCase().replaceAll(' ', '-')}`} key={category.name} onClick={() => goToWomenCollection(category.style, category.type)}><img src={category.image} alt={category.name} /><span>{category.name}</span></button>)}</div></section> : page === 'Men' && menCategoryPage ? <section className="women-categories" id="collection"><h1>Shop by category</h1><div className="women-category-grid">{menCategories.map((category) => <button className="women-category-card" key={category.name} onClick={() => goToCategoryCollection('Men', category.type)}><img src={category.image} alt={category.name} /><span>{category.name}</span></button>)}</div></section> : page === 'Kids' && kidsCategoryPage ? <section className="women-categories" id="collection"><h1>Shop by age</h1><div className="women-category-grid kids-category-grid">{kidsCategories.map((category) => <button className="women-category-card" key={category.name} onClick={() => goToCategoryCollection('Kids', category.type)}><img src={category.image} alt={category.name} /><span>{category.name}</span></button>)}</div></section> : <section className="shop-section" id="collection">
        <div className="section-heading"><div><p className="eyebrow">{page === 'Home' ? 'JUST IN' : `${page.toUpperCase()} COLLECTION`}</p><h2>{page === 'Home' ? `Fresh ${activeSlide.group.toLowerCase()} finds, ready for you.` : `${page}'s clothing collection`}</h2></div>{page === 'Home' && <button onClick={() => goToPage(activeSlide.group)}>{collectionLinkLabel}</button>}</div>
        <div className="product-grid">{shownProducts.map((product) => <ProductCard key={product.name} product={product} showPrice={page !== 'Home'} onViewProduct={(productToView) => { setSelectedProduct(productToView); setImageZoomed(false) }} />)}</div>
      </section>}

      <section className="sell-section"><div><p className="eyebrow">YOUR CLOSET HAS VALUE</p><h2>Pass it on. Get paid.</h2></div><button className="light-button">Start selling <span>→</span></button></section>
      <section className="newsletter-section" id="newsletter"><div className="newsletter-intro"><div className="newsletter-title"><span aria-hidden="true">✉</span><h2>Stay tuned</h2></div><p>Get fresh finds, styling inspiration and updates from RetroFit.</p></div><form className="newsletter-form" onSubmit={(event) => event.preventDefault()}><div className="newsletter-fields"><input type="email" aria-label="Email address" placeholder="Enter email address" required /><input type="tel" aria-label="Mobile number" placeholder="Enter mobile number" required /><button type="submit">Subscribe</button></div></form></section>
      <section className="footer-panels" aria-label="Explore RetroFit"><a href="#how-it-works" className="footer-panel" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=900&q=85')" }}><span>Who we are</span></a><a href="#collection" className="footer-panel" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85')" }}><span>Categories</span></a><a href="mailto:retrofit@gmail.com" className="footer-panel" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=85')" }}><span>Customer service</span></a><a href="#collection" className="footer-panel" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85')" }}><span>Style guide</span></a><a href="#how-it-works" className="footer-panel" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85')" }}><span>More</span></a></section>
    </main>

    <footer id="how-it-works"><div className="footer-main"><div className="footer-brand"><button className="logo" onClick={() => goToPage('Home')}><img className="brand-logo-image" src={retrofitLogo} alt="RetroFit" /></button><p>Fashion with a future.</p></div><div className="footer-contact"><p>CONTACT</p><a href="mailto:retrofit@gmail.com">retrofit@gmail.com</a><a href="tel:+8801700000000">+880 1700-000000</a></div><div className="footer-follow"><p>FOLLOW US</p><div className="social-links" aria-label="Follow RetroFit"><a className="facebook" href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.8 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5H17V3.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.1H7.8V13h2.7v8h3.3Z" /></svg></a><a className="instagram" href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.7" r="1" /></svg></a><a className="tiktok" href="https://www.tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3c.3 2.3 1.6 3.8 4 4v3.1c-1.5 0-2.9-.5-4-1.4v6.6a5.3 5.3 0 1 1-4.6-5.2v3.1a2.3 2.3 0 1 0 1.5 2.1V3H15Z" /></svg></a></div></div></div><div className="footer-bottom"><p>© 2026 RetroFit. All rights reserved.</p></div></footer>
    {signInOpen && <div className="signin-overlay" role="presentation" onClick={() => setSignInOpen(false)}><section className="signin-dialog" role="dialog" aria-modal="true" aria-labelledby="signin-title" onClick={(event) => event.stopPropagation()}><button className="close-signin" onClick={() => setSignInOpen(false)} aria-label="Close sign in">×</button><p className="eyebrow">WELCOME BACK</p><h2 id="signin-title">Sign in to RetroFit</h2><p>Access your saved styles and keep fashion in circulation.</p><form onSubmit={(event) => event.preventDefault()}><label htmlFor="email">Email address</label><input id="email" type="email" placeholder="you@example.com" required /><label htmlFor="password">Password</label><input id="password" type="password" placeholder="Enter your password" required /><button className="primary-button" type="submit">Sign in <span>→</span></button></form><button className="create-account" type="button">New here? Create an account</button></section></div>}
    {selectedProduct && <div className="product-modal-overlay" role="presentation" onClick={() => setSelectedProduct(null)}><section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-title" onClick={(event) => event.stopPropagation()}><button className="close-product-modal" onClick={() => setSelectedProduct(null)} aria-label="Close product details">×</button><div className="product-modal-image"><img className={imageZoomed ? 'zoomed' : ''} src={selectedProduct.image} alt={selectedProduct.name} onClick={() => setImageZoomed((zoomed) => !zoomed)} /><button className="image-zoom-button" onClick={() => setImageZoomed((zoomed) => !zoomed)}>{imageZoomed ? 'Zoom out' : 'Click image to zoom'}</button></div><div className="product-modal-details"><p className="eyebrow">{selectedProduct.group.toUpperCase()} · {(selectedProduct.type || selectedProduct.style).toUpperCase()}</p><h2 id="product-title">{selectedProduct.name}</h2><p className="product-modal-price">৳ {selectedProduct.price}</p><dl><div><dt>Brand</dt><dd>{selectedProduct.brand}</dd></div><div><dt>Material</dt><dd>{selectedProduct.material || (selectedProduct.group === 'Kids' ? 'Soft cotton' : 'Cotton blend')}</dd></div><div><dt>Used for</dt><dd>{selectedProduct.usedFor || 'Used for 1 month'}</dd></div><div><dt>Condition</dt><dd>{selectedProduct.condition || 'Good'}</dd></div><div><dt>Size</dt><dd>{selectedProduct.size}</dd></div></dl><button className="primary-button">Add to cart <span>→</span></button></div></section></div>}
  </>
}

export default App
