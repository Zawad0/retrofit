const Order = require('../models/Order');
const Product = require('../models/Product');
const WATER_LITERS_PER_ITEM = 2700;
const CO2_KG_PER_ITEM = 3;

async function purchasedCount(match) {
  const [result] = await Order.aggregate([
    { $match: match }, { $unwind: '$items' },
    { $group: { _id: null, count: { $sum: { $ifNull: ['$items.quantity', 1] } } } },
  ]);
  return result?.count || 0;
}

function metrics(purchasedItems, listedItems) {
  const totalItems = purchasedItems + listedItems;
  return { purchasedItems, listedItems, totalItems, waterLiters: totalItems * WATER_LITERS_PER_ITEM, co2Kg: totalItems * CO2_KG_PER_ITEM, formula: { waterLitersPerItem: WATER_LITERS_PER_ITEM, co2KgPerItem: CO2_KG_PER_ITEM } };
}

async function getGlobalEcoImpact(req, res) {
  try {
    const [purchasedItems, listedItems] = await Promise.all([
      purchasedCount({ status: 'Delivered' }),
      Product.countDocuments({ status: { $in: ['available', 'sold'] } }),
    ]);
    return res.json({ metrics: metrics(purchasedItems, listedItems) });
  } catch (error) { return res.status(500).json({ message: 'Unable to load community impact.' }); }
}

async function getUserEcoImpact(req, res) {
  try {
    const [purchasedItems, listedItems] = await Promise.all([
      purchasedCount({ user: req.user._id, status: 'Delivered' }),
      Product.countDocuments({ seller: req.user._id, status: { $in: ['available', 'sold'] } }),
    ]);
    return res.json({ metrics: metrics(purchasedItems, listedItems) });
  } catch (error) { return res.status(500).json({ message: 'Unable to load your impact.' }); }
}

module.exports = { getGlobalEcoImpact, getUserEcoImpact };
