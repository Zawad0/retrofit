import { useEffect, useRef, useState } from 'react'
import retrofitLogo from './assets/retrofit-logo.svg'
import womenHero from './assets/women-hero.jpg'
import menHero from './assets/men-hero.jpg'
import kidsHero from './assets/kids-hero.jpg'
import womanTshirt from './assets/products/womantshirt.jpg'
import womanTop from './assets/products/womantop.jpg'
import womanJeans from './assets/products/womanjeans.jpg'
import pastelGeometricScarf from './assets/products/scarves/pastel-geometric.jpg'
import colourBlockScarf from './assets/products/scarves/colour-block.jpg'
import coralStripeScarf from './assets/products/scarves/coral-stripe.jpg'
import blushFloralScarf from './assets/products/scarves/blush-floral.jpg'
import oliveLeafNightdress from './assets/products/nightwear/olive-leaf-nightdress.png'
import charcoalStripePajama from './assets/products/nightwear/charcoal-stripe-pajama.jpg'
import redFloralNightdress from './assets/products/nightwear/red-floral-nightdress.jpg'
import blushFloralNightdress from './assets/products/nightwear/blush-floral-nightdress.jpg'
import newbornCategory from './assets/kids-categories/newborn.jpg'
import oneToThreeCategory from './assets/kids-categories/1-3-years.jpg'
import fourToSevenCategory from './assets/kids-categories/4-7-years.jpg'
import eightToTwelveCategory from './assets/kids-categories/8-12-years.jpg'
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
import maroonEmbroideredSalwar from './assets/products/salwar-kameez/maroon-embroidered.jpg'
import blushFormalSalwar from './assets/products/salwar-kameez/blush-formal.jpg'
import skyBlueClassicSalwar from './assets/products/salwar-kameez/sky-blue-classic.jpg'
import oliveFloralSalwar from './assets/products/salwar-kameez/olive-floral.jpg'
import heartPrintSalwar from './assets/products/salwar-kameez/heart-print.jpg'
import whiteBluePrintKurti from './assets/products/kurtis/white-blue-print.jpg'
import maroonFloralKurti from './assets/products/kurtis/maroon-floral.jpg'
import rubyRedKurti from './assets/products/kurtis/ruby-red.jpg'
import mustardBlockPrintKurti from './assets/products/kurtis/mustard-block-print.jpg'
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
import './product-navigation.css'

const slides = [
  { group: 'Women', eyebrow: 'WOMEN’S COLLECTION', title: <>Style made for<br /><em>your next story.</em></>, text: 'Discover beautiful women’s traditional and western clothing ready for a second life.', image: womenHero },
  { group: 'Kids', eyebrow: 'KIDS’ COLLECTION', title: <>Big dreams for<br /><em>little explorers.</em></>, text: 'Find comfortable, colourful clothes for every little adventure.', image: kidsHero },
  { group: 'Men', eyebrow: 'MEN’S COLLECTION', title: <>Classic fits for<br /><em>every day.</em></>, text: 'Explore quality western and traditional styles with plenty of life left in them.', image: menHero },
]

const womenCategories = [
  { name: 'Saree', style: 'Traditional', type: 'Saree', image: sareeCategory },
  { name: 'Salwar Kameez', style: 'Traditional', type: 'Salwar Kameez', image: salwarKameezCategory },
  { name: 'Kurti', style: 'Traditional', type: 'Kurti', image: kurtiCategory },
  { name: 'Scarf', style: 'Western', type: 'Scarf', image: blushFloralScarf },
  { name: 'Nightwear', style: 'Western', type: 'Nightwear', image: nightwearCategory },
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
  { name: 'Newborn', type: 'Newborn', image: newbornCategory },
  { name: '1–3 years', type: '1–3 years', image: oneToThreeCategory },
  { name: '4–7 years', type: '4–7 years', image: fourToSevenCategory },
  { name: '8–12 years', type: '8–12 years', image: eightToTwelveCategory },
]

const products = [
  { name: 'Women’s T-Shirt', brand: 'Tokyo', price: '650', size: 'M', group: 'Women', style: 'Western', image: womanTshirt },
  { name: 'Cotton Shirt', brand: 'Aarong', price: '850', size: 'S', group: 'Women', style: 'Western', image: womanTop },
  { name: 'Women’s Jeans', brand: 'Levi\'s', price: '1,200', size: '28', group: 'Women', style: 'Western', image: womanJeans },
  { name: 'Pastel Geometric Scarf', brand: 'Deshal', price: '100', size: 'Free size', group: 'Women', style: 'Western', type: 'Scarf', material: 'Light chiffon', usedFor: 'Used for 2 months', condition: 'Like New', image: pastelGeometricScarf, imagePosition: 'lower' },
  { name: 'Colour Block Scarf', brand: 'Aarong', price: '125', size: 'Free size', group: 'Women', style: 'Western', type: 'Scarf', material: 'Soft voile', usedFor: 'Used for 3 months', condition: 'Like New', image: colourBlockScarf, imagePosition: 'lower' },
  { name: 'Coral Stripe Scarf', brand: 'Kay Kraft', price: '150', size: 'Free size', group: 'Women', style: 'Western', type: 'Scarf', material: 'Cotton blend', usedFor: 'Used for 4 months', condition: 'Good', image: coralStripeScarf, imagePosition: 'lower' },
  { name: 'Blush Floral Scarf', brand: 'Deshal', price: '200', size: 'Free size', group: 'Women', style: 'Western', type: 'Scarf', material: 'Printed chiffon', usedFor: 'Used for 5 months', condition: 'Good', image: blushFloralScarf, imagePosition: 'lower' },
  { name: 'Olive Leaf Nightdress', brand: 'Comfort Wear', price: '480', size: 'M', group: 'Women', style: 'Western', type: 'Nightwear', material: 'Soft cotton', usedFor: 'Used for 1 month', condition: 'Like New', image: oliveLeafNightdress, imageFit: 'contain' },
  { name: 'Charcoal Stripe Pajama Set', brand: 'Comfort Wear', price: '450', size: 'L', group: 'Women', style: 'Western', type: 'Nightwear', material: 'Cotton jersey', usedFor: 'Used for 2 months', condition: 'Like New', image: charcoalStripePajama, imageFit: 'contain' },
  { name: 'Red Floral Nightdress', brand: 'Deshal', price: '400', size: 'M', group: 'Women', style: 'Western', type: 'Nightwear', material: 'Breathable cotton', usedFor: 'Used for 3 months', condition: 'Good', image: redFloralNightdress, imageFit: 'contain' },
  { name: 'Blush Floral Nightdress', brand: 'Comfort Wear', price: '350', size: 'L', group: 'Women', style: 'Western', type: 'Nightwear', material: 'Printed cotton', usedFor: 'Used for 4 months', condition: 'Good', image: blushFloralNightdress, imageFit: 'contain' },
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
  { name: 'Maroon Embroidered Salwar Kameez', brand: 'Aarong', price: '600', size: 'M', group: 'Women', style: 'Traditional', type: 'Salwar Kameez', material: 'Embroidered cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: maroonEmbroideredSalwar },
  { name: 'Blush Formal Salwar Kameez', brand: 'Kay Kraft', price: '550', size: 'M', group: 'Women', style: 'Traditional', type: 'Salwar Kameez', material: 'Embroidered georgette', usedFor: 'Used for 3 months', condition: 'Like New', image: blushFormalSalwar },
  { name: 'Sky Blue Classic Salwar Kameez', brand: 'Deshal', price: '450', size: 'L', group: 'Women', style: 'Traditional', type: 'Salwar Kameez', material: 'Soft cotton', usedFor: 'Used for 4 months', condition: 'Good', image: skyBlueClassicSalwar },
  { name: 'Olive Floral Salwar Kameez', brand: 'Aarong', price: '350', size: 'M', group: 'Women', style: 'Traditional', type: 'Salwar Kameez', material: 'Cotton blend', usedFor: 'Used for 5 months', condition: 'Good', image: oliveFloralSalwar },
  { name: 'Heart Print Salwar Kameez', brand: 'Kay Kraft', price: '500', size: 'M', group: 'Women', style: 'Traditional', type: 'Salwar Kameez', material: 'Printed cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: heartPrintSalwar },
  { name: 'White & Blue Print Kurti', brand: 'Aarong', price: '700', size: 'M', group: 'Women', style: 'Traditional', type: 'Kurti', material: 'Printed cotton', usedFor: 'Used for 2 months', condition: 'Like New', image: whiteBluePrintKurti, imageFit: 'contain' },
  { name: 'Maroon Floral Kurti', brand: 'Kay Kraft', price: '600', size: 'L', group: 'Women', style: 'Traditional', type: 'Kurti', material: 'Cotton blend', usedFor: 'Used for 3 months', condition: 'Like New', image: maroonFloralKurti, imageFit: 'contain' },
  { name: 'Ruby Red Kurti', brand: 'Deshal', price: '500', size: 'M', group: 'Women', style: 'Traditional', type: 'Kurti', material: 'Soft cotton', usedFor: 'Used for 4 months', condition: 'Good', image: rubyRedKurti, imageFit: 'contain' },
  { name: 'Mustard Block Print Kurti', brand: 'Aarong', price: '400', size: 'M', group: 'Women', style: 'Traditional', type: 'Kurti', material: 'Printed cotton', usedFor: 'Used for 5 months', condition: 'Good', image: mustardBlockPrintKurti, imageFit: 'contain' },
  { name: 'Warm Chador', brand: 'Deshal', price: '1,100', size: 'Free size', group: 'Women', style: 'Traditional', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1200&q=90' },
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
  { name: 'Cotton Co-ord Set', brand: 'Yellow', price: '350', size: '1–2 Y', group: 'Kids', style: 'Western', type: '1–3 years', material: 'Pure cotton', usedFor: 'Used for 1 month', condition: 'Good', image: cottonCoOrdSet, imageFit: 'contain' },
  { name: 'Smocked Puff Sleeve Dress', brand: 'Mothercare', price: '350', size: '4–7 Y', group: 'Kids', style: 'Western', type: '4–7 years', material: 'Cotton blend', usedFor: 'Used for 2 months', condition: 'Good', image: smockedBabyDress, imageFit: 'contain' },
  { name: 'Kids Casual Outfit', brand: 'H&M', price: '420', size: '8–12 Y', group: 'Kids', style: 'Western', type: '8–12 years', material: 'Cotton blend', usedFor: 'Used for 2 months', condition: 'Good', image: kidsPicture },
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
  return <article className="product-card"><div className="product-image" role="button" tabIndex="0" onClick={() => openProductInNewTab(product)} onKeyDown={(event) => event.key === 'Enter' && openProductInNewTab(product)}><img className={product.imageFit === 'contain' ? 'image-contain' : product.imagePosition === 'lower' ? 'image-lower' : ''} src={product.image} alt={product.name} /><button aria-label={`Save ${product.name}`} onClick={(event) => event.stopPropagation()}>♡</button></div><div className="product-details"><div><p className="product-category">{product.group}</p><h3>{product.name}</h3><p>{product.brand} · {product.size}</p></div>{showPrice && <strong>৳ {product.price}</strong>}</div><button className="view-product-button" onClick={() => openProductInNewTab(product)}>View product <span>→</span></button></article>
}

const numericPrice = (price) => Number(String(price).replaceAll(',', ''))
const formatPrice = (price) => new Intl.NumberFormat('en-BD').format(price)

const productFromUrl = () => {
  const match = decodeURIComponent(window.location.pathname).match(/^\/product\/(.+)$/)
  return match ? products.find((product) => product.name === decodeURIComponent(match[1])) || null : null
}

const openProductInNewTab = (product) => window.open(`${window.location.origin}/product/${encodeURIComponent(product.name)}`, '_blank', 'noopener')

const collectionRouteForProduct = (product) => {
  const isWomen = product.group === 'Women'
  const state = {
    page: product.group,
    collectionStyle: isWomen ? product.style : 'All clothing',
    traditionalType: product.type || '',
    womenCategoryPage: false,
    menCategoryPage: false,
    kidsCategoryPage: false,
  }
  const path = isWomen
    ? `/women/${encodeURIComponent(product.type || product.style)}`
    : product.type
      ? `/${product.group.toLowerCase()}/${encodeURIComponent(product.type)}`
      : `/${product.group.toLowerCase()}`
  return { state, path }
}

const routeStateFromPath = () => {
  const parts = window.location.pathname.split('/').filter(Boolean).map(decodeURIComponent)
  const base = { page: 'Home', collectionStyle: 'All clothing', traditionalType: '', womenCategoryPage: false, menCategoryPage: false, kidsCategoryPage: false, product: null }
  if (parts[0] === 'product' && parts[1]) {
    const product = products.find((item) => item.name === parts.slice(1).join('/')) || null
    return product ? { ...collectionRouteForProduct(product).state, product } : base
  }
  if (parts[0] === 'cart') return { ...base, page: 'Cart' }
  if (parts[0] === 'checkout') return { ...base, page: 'Checkout' }
  if (parts[0] === 'order-confirmed') return { ...base, page: 'OrderSuccess' }
  if (parts[0] === 'how-it-works') return { ...base, page: 'HowItWorks' }
  if (!['women', 'men', 'kids'].includes(parts[0])) return base

  const group = `${parts[0][0].toUpperCase()}${parts[0].slice(1)}`
  if (!parts[1]) return { ...base, page: group, collectionStyle: group === 'Women' ? 'Traditional' : 'All clothing', womenCategoryPage: group === 'Women', menCategoryPage: group === 'Men', kidsCategoryPage: group === 'Kids' }

  const category = parts.slice(1).join('/')
  const matchingProduct = products.find((product) => product.group === group && (product.type === category || (group === 'Women' && product.style === category)))
  return {
    ...base,
    page: group,
    collectionStyle: group === 'Women' ? matchingProduct?.style || category : 'All clothing',
    traditionalType: matchingProduct?.type === category ? category : group === 'Women' && ['Traditional', 'Western'].includes(category) ? '' : category,
  }
}

// Keep common Bangla-English clothing spellings together, so a shopper does
// not need to know the exact spelling used in a product title.
const normaliseSearchText = (value) => String(value || '')
  .toLowerCase()
  .replace(/[’']/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .replace(/\b(?:sharee|sari|shari)\b/g, 'saree')
  .replace(/\b(?:kamij|kamiz)\b/g, 'kameez')
  .replace(/\bpanjabi\b/g, 'punjabi')
  .replace(/\btshirt\b/g, 't shirt')
  .replace(/\s+/g, ' ')
  .trim()

const productSearchText = (product) => normaliseSearchText([
  product.name,
  product.group,
  product.style,
  product.type,
  product.brand,
  product.material,
  product.size,
  product.condition,
].join(' '))

function CartPage({ items, onQuantityChange, onRemove, onContinue, onCheckout }) {
  const subtotal = items.reduce((total, item) => total + numericPrice(item.product.price) * item.quantity, 0)
  const shipping = subtotal >= 1500 ? 0 : 100
  const vat = Math.round(subtotal * 0.05)
  const total = subtotal + shipping + vat

  return <section className="cart-page" id="collection">
    <div className="cart-heading"><div><p className="eyebrow">YOUR BAG</p><h1>Shopping cart</h1></div><button className="text-cart-button" onClick={onContinue}>← Continue shopping</button></div>
    {items.length === 0 ? <div className="empty-cart"><span>🛍</span><h2>Your cart is empty</h2><p>Add a pre-loved piece and give it a new story.</p><button className="primary-button" onClick={onContinue}>Browse the collection <span>→</span></button></div> : <div className="cart-layout"><div className="cart-items">{items.map(({ product, quantity }) => <article className="cart-item" key={product.name}><img src={product.image} alt={product.name} /><div className="cart-item-info"><p className="product-category">{product.group} · {product.type || product.style}</p><h2>{product.name}</h2><p>{product.brand} · Size {product.size}</p><strong>৳ {product.price}</strong></div><div className="cart-quantity" aria-label={`Quantity for ${product.name}`}><button onClick={() => onQuantityChange(product.name, quantity - 1)} aria-label={`Decrease ${product.name} quantity`}>−</button><span>{quantity}</span><button onClick={() => onQuantityChange(product.name, quantity + 1)} aria-label={`Increase ${product.name} quantity`}>+</button></div><p className="cart-item-total">৳ {formatPrice(numericPrice(product.price) * quantity)}</p><button className="remove-cart-item" onClick={() => onRemove(product.name)} aria-label={`Remove ${product.name}`}>×</button></article>)}</div><aside className="cart-summary"><h2>Cart totals</h2><div><p>Subtotal <span>৳ {formatPrice(subtotal)}</span></p><p>VAT (5%) <span>৳ {formatPrice(vat)}</span></p><p>Shipping <span>{shipping ? `৳ ${formatPrice(shipping)}` : 'Free'}</span></p></div><p className="cart-total">Total <strong>৳ {formatPrice(total)}</strong></p><button className="primary-button checkout-button" onClick={onCheckout}>Proceed to checkout <span>→</span></button><small>Free delivery in Dhaka on orders over ৳ 1,500.</small></aside></div>}
  </section>
}

function CheckoutPage({ items, onBackToCart, onPlaceOrder }) {
  const subtotal = items.reduce((total, item) => total + numericPrice(item.product.price) * item.quantity, 0)
  const shipping = subtotal >= 1500 ? 0 : 100
  const vat = Math.round(subtotal * 0.05)
  const total = subtotal + shipping + vat

  return <section className="checkout-page" id="collection"><div className="cart-heading"><div><p className="eyebrow">SECURE CHECKOUT</p><h1>Almost yours</h1></div><button className="text-cart-button" onClick={onBackToCart}>← Back to cart</button></div><div className="checkout-layout"><form className="checkout-form" onSubmit={(event) => { event.preventDefault(); onPlaceOrder() }}><h2>Delivery details</h2><div className="checkout-fields"><label>Full name<input required placeholder="Your full name" /></label><label>Mobile number<input required type="tel" placeholder="01XXXXXXXXX" /></label><label className="full-field">Delivery address<textarea required placeholder="House, road, area, city" rows="3" /></label><label>City<input required placeholder="Dhaka" /></label><label>Payment method<select defaultValue="cash"><option value="cash">Cash on delivery</option><option value="bkash">bKash</option><option value="nagad">Nagad</option></select></label></div><button className="primary-button place-order-button" type="submit">Place order <span>→</span></button></form><aside className="cart-summary checkout-summary"><h2>Order summary</h2>{items.map(({ product, quantity }) => <p key={product.name}>{product.name} <span>×{quantity}</span></p>)}<div><p>Subtotal <span>৳ {formatPrice(subtotal)}</span></p><p>VAT <span>৳ {formatPrice(vat)}</span></p><p>Shipping <span>{shipping ? `৳ ${formatPrice(shipping)}` : 'Free'}</span></p></div><p className="cart-total">Total <strong>৳ {formatPrice(total)}</strong></p></aside></div></section>
}

function App() {
  const initialRoute = useRef(routeStateFromPath()).current
  const [page, setPage] = useState(initialRoute.page)
  const [collectionStyle, setCollectionStyle] = useState(initialRoute.collectionStyle)
  const [traditionalType, setTraditionalType] = useState(initialRoute.traditionalType)
  const [womenCategoryPage, setWomenCategoryPage] = useState(initialRoute.womenCategoryPage)
  const [menCategoryPage, setMenCategoryPage] = useState(initialRoute.menCategoryPage)
  const [kidsCategoryPage, setKidsCategoryPage] = useState(initialRoute.kidsCategoryPage)
  const [slide, setSlide] = useState(0)
  const [signInOpen, setSignInOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(initialRoute.product || productFromUrl())
  const [imageZoomed, setImageZoomed] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [orderReference, setOrderReference] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [infoPanel, setInfoPanel] = useState(null)
  const [newsletterMessage, setNewsletterMessage] = useState('')
  const restoringHistory = useRef(false)
  const activeSlide = slides[slide]
  const searchTokens = normaliseSearchText(searchTerm).split(' ').filter(Boolean)
  const searchResults = searchTokens.length === 0 ? [] : products.filter((product) => {
    const searchableProduct = productSearchText(product)
    return searchTokens.every((token) => searchableProduct.includes(token))
  })
  const collectionLinkLabel = activeSlide.group === 'Kids' ? 'View kids’ wear →' : `View ${activeSlide.group.toLowerCase()}’s wear →`
  const collectionProducts = page === 'Home' ? products.filter((product) => product.group === activeSlide.group) : products.filter((product) => product.group === page && (collectionStyle === 'All clothing' || product.style === collectionStyle) && (!traditionalType || product.type === traditionalType))
  const shownProducts = page === 'Home' ? collectionProducts.slice(0, 4) : collectionProducts

  const saveHistory = (state, path) => window.history.pushState(state, '', path)
  const goToPage = (newPage) => { const state = { page: newPage, collectionStyle: newPage === 'Women' ? 'Traditional' : 'All clothing', traditionalType: '', womenCategoryPage: newPage === 'Women', menCategoryPage: newPage === 'Men', kidsCategoryPage: newPage === 'Kids' }; saveHistory(state, newPage === 'Home' ? '/' : `/${newPage.toLowerCase()}`); setPage(state.page); setCollectionStyle(state.collectionStyle); setTraditionalType(state.traditionalType); setWomenCategoryPage(state.womenCategoryPage); setMenCategoryPage(state.menCategoryPage); setKidsCategoryPage(state.kidsCategoryPage); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const goToHowItWorks = () => { const state = { page: 'HowItWorks', collectionStyle: 'All clothing', traditionalType: '', womenCategoryPage: false, menCategoryPage: false, kidsCategoryPage: false }; saveHistory(state, '/how-it-works'); setPage(state.page); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const goToWomenCollection = (style, type = '') => { const state = { page: 'Women', collectionStyle: style, traditionalType: type, womenCategoryPage: false, menCategoryPage: false, kidsCategoryPage: false }; saveHistory(state, `/women/${encodeURIComponent(type || style)}`); setPage(state.page); setCollectionStyle(state.collectionStyle); setTraditionalType(state.traditionalType); setWomenCategoryPage(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const goToCategoryCollection = (group, type) => { const state = { page: group, collectionStyle: 'All clothing', traditionalType: type, womenCategoryPage: false, menCategoryPage: false, kidsCategoryPage: false }; saveHistory(state, `/${group.toLowerCase()}/${encodeURIComponent(type)}`); setPage(state.page); setCollectionStyle(state.collectionStyle); setTraditionalType(state.traditionalType); setMenCategoryPage(false); setKidsCategoryPage(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const goToSelectedProductCollection = (product) => {
    setSelectedProduct(null)
    setImageZoomed(false)
    if (product.group === 'Women') return goToWomenCollection(product.style, product.type || '')
    if (product.type) return goToCategoryCollection(product.group, product.type)
    return goToPage(product.group)
  }
  const goBackToCategories = () => { setTraditionalType(''); if (page === 'Women') setWomenCategoryPage(true); if (page === 'Men') setMenCategoryPage(true); if (page === 'Kids') setKidsCategoryPage(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const goToCart = () => { const state = { page: 'Cart', collectionStyle: 'All clothing', traditionalType: '', womenCategoryPage: false, menCategoryPage: false, kidsCategoryPage: false }; saveHistory(state, '/cart'); setPage(state.page); setWomenCategoryPage(false); setMenCategoryPage(false); setKidsCategoryPage(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const goToCheckout = () => { const state = { page: 'Checkout', collectionStyle: 'All clothing', traditionalType: '', womenCategoryPage: false, menCategoryPage: false, kidsCategoryPage: false }; saveHistory(state, '/checkout'); setPage(state.page); setWomenCategoryPage(false); setMenCategoryPage(false); setKidsCategoryPage(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const addToCart = (product) => { setCartItems((items) => { const existing = items.find((item) => item.product.name === product.name); return existing ? items.map((item) => item.product.name === product.name ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { product, quantity: 1 }] }); setSelectedProduct(null); setImageZoomed(false); goToCart() }
  const changeCartQuantity = (productName, quantity) => setCartItems((items) => quantity < 1 ? items.filter((item) => item.product.name !== productName) : items.map((item) => item.product.name === productName ? { ...item, quantity } : item))
  const removeFromCart = (productName) => setCartItems((items) => items.filter((item) => item.product.name !== productName))
  const placeOrder = () => { const state = { page: 'OrderSuccess', collectionStyle: 'All clothing', traditionalType: '', womenCategoryPage: false, menCategoryPage: false, kidsCategoryPage: false }; setOrderReference(`RF-${String(Date.now()).slice(-6)}`); setCartItems([]); saveHistory(state, '/order-confirmed'); setPage(state.page); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const changeSlide = (direction) => setSlide((current) => (current + direction + slides.length) % slides.length)

  useEffect(() => {
    if (page !== 'Home') return undefined
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 4000)
    return () => window.clearInterval(timer)
  }, [page])

  useEffect(() => {
    if (selectedProduct) {
      document.title = selectedProduct.name
      return
    }

    if (['Women', 'Men', 'Kids'].includes(page)) {
      const collectionName = traditionalType || (collectionStyle !== 'All clothing' ? collectionStyle : '')
      document.title = collectionName ? `${page} Clothing | ${collectionName}` : `${page} Clothing`
      return
    }

    document.title = page === 'Cart' ? 'Shopping Cart | RetroFit' : page === 'Checkout' ? 'Checkout | RetroFit' : 'RetroFit'
  }, [page, collectionStyle, traditionalType, selectedProduct])

  useEffect(() => {
    const restorePage = (state) => {
      restoringHistory.current = true
      if (!state) {
        const route = routeStateFromPath()
        setPage(route.page); setCollectionStyle(route.collectionStyle); setTraditionalType(route.traditionalType); setWomenCategoryPage(route.womenCategoryPage); setMenCategoryPage(route.menCategoryPage); setKidsCategoryPage(route.kidsCategoryPage); setSelectedProduct(route.product)
        return
      }
      setPage(state.page || 'Home'); setCollectionStyle(state.collectionStyle || 'All clothing'); setTraditionalType(state.traditionalType || ''); setWomenCategoryPage(Boolean(state.womenCategoryPage)); setMenCategoryPage(Boolean(state.menCategoryPage)); setKidsCategoryPage(Boolean(state.kidsCategoryPage)); setSelectedProduct(state.productName ? products.find((product) => product.name === state.productName) || null : null)
    }
    const onPopState = (event) => restorePage(event.state)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (!selectedProduct || restoringHistory.current) { restoringHistory.current = false; return }
    const productPath = `/product/${encodeURIComponent(selectedProduct.name)}`

    // A product opened in its own tab starts directly on /product/..., so create
    // its collection as the previous history entry. The browser's native ← then
    // returns shoppers to the correct category instead of an empty page.
    if (window.location.pathname.startsWith('/product/') && !window.history.state) {
      const { state: parentState, path: parentPath } = collectionRouteForProduct(selectedProduct)
      const categoryState = {
        page: selectedProduct.group,
        collectionStyle: selectedProduct.group === 'Women' ? 'Traditional' : 'All clothing',
        traditionalType: '',
        womenCategoryPage: selectedProduct.group === 'Women',
        menCategoryPage: selectedProduct.group === 'Men',
        kidsCategoryPage: selectedProduct.group === 'Kids',
      }
      const homeState = { page: 'Home', collectionStyle: 'All clothing', traditionalType: '', womenCategoryPage: false, menCategoryPage: false, kidsCategoryPage: false }
      window.history.replaceState(homeState, '', '/')
      saveHistory(categoryState, `/${selectedProduct.group.toLowerCase()}`)
      saveHistory(parentState, parentPath)
      saveHistory({ ...parentState, productName: selectedProduct.name }, productPath)
      return
    }

    saveHistory({ page, collectionStyle, traditionalType, womenCategoryPage, menCategoryPage, kidsCategoryPage, productName: selectedProduct.name }, productPath)
  }, [selectedProduct])

  const closeProductDetails = () => window.location.pathname.startsWith('/product/') ? window.history.back() : setSelectedProduct(null)

  return <>
    <div className="topbar"><span>Free delivery inside Dhaka on orders over ৳ 1,500</span><a href="tel:+8801700000000">Need help? +880 1700-000000</a></div>
    <header className="navbar">
      <div className="nav-top"><button className="logo" onClick={() => goToPage('Home')} aria-label="RetroFit home"><img className="brand-logo-image" src={retrofitLogo} alt="RetroFit" /></button><p className="brand-tagline">REWEAR · RELOVE · REPEAT</p><div className="nav-actions"><div className="search-area"><button className="search-button" onClick={() => setSearchOpen((open) => !open)} aria-expanded={searchOpen} aria-controls="product-search-results" aria-label="Search products">⌕ <span>Search styles</span></button>{searchOpen && <div className="search-popover"><label htmlFor="product-search">Search every product</label><input id="product-search" autoFocus value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); window.requestAnimationFrame(() => document.querySelector('#search-results-page')?.scrollIntoView({ behavior: 'smooth', block: 'start' })) }} onKeyDown={(event) => event.key === 'Escape' && setSearchOpen(false)} placeholder="Search products" /><div className="search-results" id="product-search-results" role="listbox">{searchTokens.length === 0 ? <p className="no-search-results">Type a product, category, brand, size, or material.</p> : searchResults.length > 0 ? <><p className="search-result-count">{searchResults.length} matching {searchResults.length === 1 ? 'product' : 'products'}</p>{searchResults.map((product) => <button type="button" className="search-result" key={product.name} onClick={() => { setSelectedProduct(product); setImageZoomed(false); setSearchOpen(false); setSearchTerm('') }} role="option"><img src={product.image} alt="" /><span><strong>{product.name}</strong><small>{product.group} · {product.type || product.style} · {product.brand}</small></span></button>)}</> : <p className="no-search-results">No matching products found.</p>}</div></div>}</div><button className="wishlist-button" aria-label="Saved styles">♡</button><button className="cart-nav-button" onClick={goToCart} aria-label="Open shopping cart">Cart{cartItems.length > 0 && <span>{cartItems.reduce((count, item) => count + item.quantity, 0)}</span>}</button><button className="login-button" onClick={() => setSignInOpen(true)}>Sign in <span>→</span></button></div></div>
      <nav className="primary-nav"><button className={page === 'Home' ? 'active' : ''} onClick={() => goToPage('Home')}>Home</button><button className={page === 'Women' ? 'active' : ''} onClick={() => goToPage('Women')}>Women</button><button className={page === 'Men' ? 'active' : ''} onClick={() => goToPage('Men')}>Men</button><button className={page === 'Kids' ? 'active' : ''} onClick={() => goToPage('Kids')}>Kids</button><a href="#collection">New arrivals</a><button className={page === 'HowItWorks' ? 'active' : ''} onClick={goToHowItWorks}>How it works</button><a href="#newsletter">Community</a></nav>
    </header>

    <main>
      {searchTokens.length > 0 && <section className="search-page" id="search-results-page"><div className="section-heading"><div><p className="eyebrow">SEARCH RESULTS</p><h2>{searchResults.length} {searchResults.length === 1 ? 'product' : 'products'} for “{searchTerm}”</h2></div><button className="clear-search-button" onClick={() => { setSearchTerm(''); setSearchOpen(false) }}>Clear search</button></div>{searchResults.length > 0 ? <div className="product-grid">{searchResults.map((product) => <ProductCard key={product.name} product={product} onViewProduct={(productToView) => { setSelectedProduct(productToView); setImageZoomed(false) }} />)}</div> : <div className="empty-search-results"><h3>No matching products found.</h3><p>Try another product name, category, brand, size, or material.</p></div>}</section>}
      {page === 'Home' && <section className="hero-section">
        <div className="hero-copy"><p className="eyebrow">{activeSlide.eyebrow}</p><h1>{activeSlide.title}</h1><p className="hero-text">{activeSlide.text}</p><div className="hero-actions"><button className="primary-button" onClick={() => document.querySelector('#collection').scrollIntoView({ behavior: 'smooth' })}>Shop the edit <span>→</span></button><button className="text-button" onClick={() => document.querySelector('#collection').scrollIntoView({ behavior: 'smooth' })}>Explore the collection</button></div><div className="slider-dots">{slides.map((_, index) => <button aria-label={`Show slide ${index + 1}`} className={slide === index ? 'selected' : ''} key={index} onClick={() => setSlide(index)} />)}</div></div>
        <div className="hero-image-wrap"><div className="slider-window"><div className="slider-track" style={{ transform: `translateX(-${slide * 100}%)` }}>{slides.map((item, index) => <img className={`${item.group.toLowerCase()}-hero-image`} src={item.image} alt={`RetroFit collection ${index + 1}`} key={item.image} />)}</div></div><button className="hero-arrow previous" onClick={() => changeSlide(-1)} aria-label="Previous slide">‹</button><button className="hero-arrow next" onClick={() => changeSlide(1)} aria-label="Next slide">›</button></div>
      </section>}

      <section className="values" aria-label="RetroFit promises"><div className="values-track">{['Give Clothes A New Story', 'Premium Brands For Less', 'Gently Used & Ready To Wear', 'Luxury Looks At Thrift Prices', 'Smart Fashion For Smart Savings', 'Eco-Conscious Closet', 'Give Clothes A New Story', 'Premium Brands For Less', 'Gently Used & Ready To Wear', 'Luxury Looks At Thrift Prices', 'Smart Fashion For Smart Savings', 'Eco-Conscious Closet'].map((message, index) => <p key={`${message}-${index}`}>{message}</p>)}</div></section>

      {page === 'Cart' ? <CartPage items={cartItems} onQuantityChange={changeCartQuantity} onRemove={removeFromCart} onContinue={() => goToPage('Home')} onCheckout={goToCheckout} /> : page === 'Checkout' ? <CheckoutPage items={cartItems} onBackToCart={goToCart} onPlaceOrder={placeOrder} /> : page === 'OrderSuccess' ? <section className="order-success" id="collection"><span>✓</span><p className="eyebrow">ORDER CONFIRMED</p><h1>Thank you for your order.</h1><p>Your order reference is <strong>{orderReference}</strong>. We’ll contact you shortly to confirm delivery.</p><button className="primary-button" onClick={() => goToPage('Home')}>Continue shopping <span>→</span></button></section> : page === 'HowItWorks' ? <section className="how-it-works-page"><div className="how-page-hero"><div><p className="eyebrow">HOW RETROFIT WORKS</p><h1>Great style gets<br /><em>another chance.</em></h1><p>We make it easy to give quality clothes a second life—from your closet to someone new.</p><button className="primary-button" onClick={() => goToPage('Home')}>Explore RetroFit <span>→</span></button></div><img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=90" alt="Colourful pre-loved clothing on a rail" /></div><div className="how-page-steps"><article><img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85" alt="Seller preparing clothes" /><div><span>01</span><h2>Choose & list</h2><p>Pick the clothes you no longer wear but someone else will love. Add honest photos, size, condition and your preferred price.</p></div></article><article><img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85" alt="RetroFit reviewing a clothing listing" /><div><span>02</span><h2>We review with care</h2><p>Our team checks the listing details, helps keep product information clear, and makes every item easy for buyers to understand.</p></div></article><article><img src="https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=85" alt="Friends shopping together" /><div><span>03</span><h2>Shop with confidence</h2><p>Buyers can browse curated styles, see transparent condition details, and find quality pieces at an affordable price.</p></div></article><article><img src="https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?auto=format&fit=crop&w=900&q=85" alt="Carefully packed clothing delivery" /><div><span>04</span><h2>We coordinate the rest</h2><p>After an item sells, we keep seller and buyer informed and manage the handover so every order feels smooth and secure.</p></div></article></div><div className="how-page-promise"><p className="eyebrow">THE RETROFIT PROMISE</p><h2>Less waste. More style.<br />A better story for every piece.</h2><p>We bring together sellers, shoppers and thoughtfully chosen clothes in one friendly, transparent space.</p></div></section> : page === 'Women' && womenCategoryPage ? <section className="women-categories" id="collection"><h1>Shop by category</h1><div className="women-category-grid">{womenCategories.map((category) => <button className={`women-category-card ${category.name.toLowerCase().replaceAll(' ', '-')}`} key={category.name} onClick={() => goToWomenCollection(category.style, category.type)}><img src={category.image} alt={category.name} /><span>{category.name}</span></button>)}</div></section> : page === 'Men' && menCategoryPage ? <section className="women-categories" id="collection"><h1>Shop by category</h1><div className="women-category-grid">{menCategories.map((category) => <button className="women-category-card" key={category.name} onClick={() => goToCategoryCollection('Men', category.type)}><img src={category.image} alt={category.name} /><span>{category.name}</span></button>)}</div></section> : page === 'Kids' && kidsCategoryPage ? <section className="women-categories" id="collection"><h1>Shop by age</h1><div className="women-category-grid kids-category-grid">{kidsCategories.map((category) => <button className="women-category-card" key={category.name} onClick={() => goToCategoryCollection('Kids', category.type)}><img src={category.image} alt={category.name} /><span>{category.name}</span></button>)}</div></section> : <section className="shop-section" id="collection">
        <div className="section-heading"><div><p className="eyebrow">{page === 'Home' ? 'JUST IN' : `${page.toUpperCase()} COLLECTION`}</p><h2>{page === 'Home' ? `Fresh ${activeSlide.group.toLowerCase()} finds, ready for you.` : `${page}'s clothing collection`}</h2></div>{page === 'Home' ? <button onClick={() => goToPage(activeSlide.group)}>{collectionLinkLabel}</button> : <button className="collection-back-button" onClick={goBackToCategories}>← Back to categories</button>}</div>
        <div className="product-grid">{shownProducts.map((product) => <ProductCard key={product.name} product={product} showPrice={page !== 'Home'} onViewProduct={(productToView) => { setSelectedProduct(productToView); setImageZoomed(false) }} />)}</div>
      </section>}

      <section className="sell-section"><div><p className="eyebrow">YOUR CLOSET HAS VALUE</p><h2>Pass it on. Get paid.</h2></div><button className="light-button">Start selling <span>→</span></button></section>
      <section className="newsletter-section" id="newsletter"><div className="newsletter-intro"><div className="newsletter-title"><span aria-hidden="true">✉</span><h2>Stay tuned</h2></div><p>Get fresh finds, styling inspiration and updates from RetroFit.</p></div><form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setNewsletterMessage('Thanks! You are now subscribed to RetroFit updates.'); event.currentTarget.reset() }}><div className="newsletter-fields"><input type="email" aria-label="Email address" placeholder="Enter email address" required /><input type="tel" aria-label="Mobile number" placeholder="Enter mobile number" required /><button type="submit">Subscribe</button></div>{newsletterMessage && <p className="newsletter-success" role="status">{newsletterMessage}</p>}</form></section>
      <section className="footer-panels" aria-label="Explore RetroFit"><button type="button" className="footer-panel" onClick={() => setInfoPanel('about')} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=900&q=85')" }}><span>Who we are</span></button><button type="button" className="footer-panel" onClick={() => setInfoPanel('categories')} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85')" }}><span>Categories</span></button><button type="button" className="footer-panel" onClick={() => setInfoPanel('service')} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=85')" }}><span>Customer service</span></button><button type="button" className="footer-panel" onClick={() => setInfoPanel('style')} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85')" }}><span>Style guide</span></button><button type="button" className="footer-panel" onClick={() => setInfoPanel('more')} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85')" }}><span>More</span></button></section>
    </main>

    <footer id="how-it-works"><div className="footer-main"><div className="footer-brand"><button className="logo" onClick={() => goToPage('Home')}><img className="brand-logo-image" src={retrofitLogo} alt="RetroFit" /></button><p>Fashion with a future.</p></div><div className="footer-contact"><p>CONTACT</p><a href="mailto:retrofit@gmail.com">retrofit@gmail.com</a><a href="tel:+8801700000000">+880 1700-000000</a></div><div className="footer-follow"><p>FOLLOW US</p><div className="social-links" aria-label="Follow RetroFit"><a className="facebook" href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.8 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5H17V3.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.1H7.8V13h2.7v8h3.3Z" /></svg></a><a className="instagram" href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.7" r="1" /></svg></a><a className="tiktok" href="https://www.tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3c.3 2.3 1.6 3.8 4 4v3.1c-1.5 0-2.9-.5-4-1.4v6.6a5.3 5.3 0 1 1-4.6-5.2v3.1a2.3 2.3 0 1 0 1.5 2.1V3H15Z" /></svg></a></div></div></div><div className="footer-bottom"><p>© 2026 RetroFit. All rights reserved.</p></div></footer>
    {infoPanel && <div className="info-overlay" role="presentation" onClick={() => setInfoPanel(null)}><section className="info-dialog" role="dialog" aria-modal="true" aria-labelledby="info-panel-title" onClick={(event) => event.stopPropagation()}><button className="close-info" onClick={() => setInfoPanel(null)} aria-label="Close information panel">×</button>{infoPanel === 'about' && <><img className="info-hero-image" src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90" alt="Friends choosing pre-loved clothing" /><div className="info-content"><p className="eyebrow">FASHION WITH A FUTURE</p><h2 id="info-panel-title">More style. Less waste.</h2><p>RetroFit is a thrift-shopping community where pre-loved clothes get a fresh beginning. Sellers can turn good-quality pieces they no longer wear into value, while shoppers can discover stylish, affordable fashion without stretching their budget.</p><p>We believe great style should be within reach for students, young professionals, and everyone who wants to shop thoughtfully. Every item re-worn is one small step towards a more sustainable wardrobe.</p></div></>}{infoPanel === 'categories' && <div className="info-content"><p className="eyebrow">SHOP YOUR WAY</p><h2 id="info-panel-title">Something for every story.</h2><p>Explore pre-loved fashion chosen for every age and style.</p><div className="info-category-grid"><button type="button" onClick={() => { setInfoPanel(null); goToPage('Women') }}><img src={sareeCategory} alt="Women's clothing" /><span>Women</span><small>Traditional & western finds</small></button><button type="button" onClick={() => { setInfoPanel(null); goToPage('Men') }}><img src={menTshirtCategory} alt="Men's clothing" /><span>Men</span><small>Everyday & festive styles</small></button><button type="button" onClick={() => { setInfoPanel(null); goToPage('Kids') }}><img src={kidsPicture} alt="Kids' clothing" /><span>Kids</span><small>Comfort for little adventures</small></button></div></div>}{infoPanel === 'service' && <><img className="info-hero-image" src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=90" alt="Helpful customer support team" /><div className="info-content"><p className="eyebrow">WE ARE HERE TO HELP</p><h2 id="info-panel-title">Customer service that cares.</h2><p>Need help finding the right item, understanding a product, or placing an order? Our friendly support team is here to make thrift shopping simple, safe, and enjoyable.</p><div className="info-contact-list"><a href="mailto:retrofit@gmail.com">Email us: retrofit@gmail.com</a><a href="tel:+8801700000000">Call us: +880 1700-000000</a><span>Available every day, 10:00 AM–8:00 PM</span></div></div></>}{infoPanel === 'style' && <><img className="info-hero-image" src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=90" alt="Colourful clothing on a rack" /><div className="info-content"><p className="eyebrow">MAKE IT YOUR OWN</p><h2 id="info-panel-title">Pre-loved, personally styled.</h2><p>Mix timeless basics with one statement piece, choose fabrics that feel good, and wear what makes you confident. Great style is not about spending more—it is about choosing pieces that tell your story.</p></div></>}{infoPanel === 'more' && <><img className="info-hero-image" src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=90" alt="Thoughtfully arranged clothing collection" /><div className="info-content"><p className="eyebrow">LOOKING AHEAD</p><h2 id="info-panel-title">Our future goal.</h2><p>We want RetroFit to grow into Bangladesh's most trusted community for affordable, sustainable fashion—where every quality garment can find its next owner instead of going to waste.</p><p>Our next steps include bringing in more verified sellers, making product discovery easier, creating safer buying and selling experiences, and helping more students enjoy stylish fashion at prices that work for them.</p></div></>}</section></div>}
    {signInOpen && <div className="signin-overlay" role="presentation" onClick={() => setSignInOpen(false)}><section className="signin-dialog" role="dialog" aria-modal="true" aria-labelledby="signin-title" onClick={(event) => event.stopPropagation()}><button className="close-signin" onClick={() => setSignInOpen(false)} aria-label="Close sign in">×</button><p className="eyebrow">WELCOME BACK</p><h2 id="signin-title">Sign in to RetroFit</h2><p>Access your saved styles and keep fashion in circulation.</p><form onSubmit={(event) => event.preventDefault()}><label htmlFor="email">Email address</label><input id="email" type="email" placeholder="you@example.com" required /><label htmlFor="password">Password</label><input id="password" type="password" placeholder="Enter your password" required /><button className="primary-button" type="submit">Sign in <span>→</span></button></form><button className="create-account" type="button">New here? Create an account</button></section></div>}
    {selectedProduct && <div className="product-modal-overlay" role="presentation" onClick={closeProductDetails}><section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-title" onClick={(event) => event.stopPropagation()}><button className="close-product-modal" onClick={closeProductDetails} aria-label="Close product details">×</button><button className="product-back-button" onClick={() => window.history.back()}>← Back to collection</button><div className="product-modal-image"><img className={`${selectedProduct.imageFit === 'contain' ? 'image-contain ' : ''}${imageZoomed ? 'zoomed' : ''}`} src={selectedProduct.image} alt={selectedProduct.name} onClick={() => setImageZoomed((zoomed) => !zoomed)} /><button className="image-zoom-button" onClick={() => setImageZoomed((zoomed) => !zoomed)}>{imageZoomed ? 'Zoom out' : 'Click image to zoom'}</button></div><div className="product-modal-details"><nav className="product-breadcrumb" aria-label="Product breadcrumb"><button type="button" onClick={() => goToPage(selectedProduct.group)}>{selectedProduct.group} clothing</button><span>/</span><button type="button" onClick={() => goToSelectedProductCollection(selectedProduct)}>{selectedProduct.type || selectedProduct.style}</button><span>/</span><span aria-current="page">{selectedProduct.name}</span></nav><p className="eyebrow">{selectedProduct.group.toUpperCase()} · {(selectedProduct.type || selectedProduct.style).toUpperCase()}</p><h2 id="product-title">{selectedProduct.name}</h2><p className="product-modal-price">৳ {selectedProduct.price}</p><dl><div><dt>Brand</dt><dd>{selectedProduct.brand}</dd></div><div><dt>Material</dt><dd>{selectedProduct.material || (selectedProduct.group === 'Kids' ? 'Soft cotton' : 'Cotton blend')}</dd></div><div><dt>Used for</dt><dd>{selectedProduct.usedFor || 'Used for 1 month'}</dd></div><div><dt>Condition</dt><dd>{selectedProduct.condition || 'Good'}</dd></div><div><dt>Size</dt><dd>{selectedProduct.size}</dd></div></dl><button className="primary-button" onClick={() => addToCart(selectedProduct)}>Add to cart <span>→</span></button></div></section></div>}
  </>
}

export default App
