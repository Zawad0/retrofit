const PROMOTION_PERCENT_BY_NAME = Object.freeze({
  'Rose Gold Katan Saree': 15,
  'Olive Green Cotton Saree': 10,
  'White Linen Shirt': 12,
  'Limited T-Shirt': 20,
  'Cherry Baby Bath Suit': 15,
});

function getDiscountPercent(product) {
  const listedDiscount = Number(product?.discount) || 0;
  const promotion = PROMOTION_PERCENT_BY_NAME[product?.name] || 0;
  return Math.min(80, Math.max(0, listedDiscount, promotion));
}

function getCurrentPrice(product) {
  return Math.round(Number(product.price) * (100 - getDiscountPercent(product)) / 100);
}

module.exports = { getDiscountPercent, getCurrentPrice };
