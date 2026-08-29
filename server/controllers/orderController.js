const mongoose = require("mongoose");
const Order = require("../models/Order");

// Create new order
const createOrder = async (req, res) => {
  try {
    const { items, deliveryDetails, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item" });
    }

    if (
      !deliveryDetails ||
      !deliveryDetails.fullName ||
      !deliveryDetails.mobileNumber ||
      !deliveryDetails.address
    ) {
      return res
        .status(400)
        .json({ message: "Please provide complete delivery details" });
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => {
      const price = Number(String(item.price).replace(/,/g, "")) || 0;
      const quantity = Number(item.quantity) || 1;
      return sum + price * quantity;
    }, 0);

    const shipping = subtotal >= 1500 ? 0 : 100;
    const vat = Math.round(subtotal * 0.05);
    const total = subtotal + shipping + vat;

    // Generate unique order reference
    const timestampSuffix = String(Date.now()).slice(-6);
    const randomDigits = Math.floor(100 + Math.random() * 900);
    const orderReference = req.body.orderReference || `RF-${timestampSuffix}${randomDigits}`;

    const normalizedItems = items.map((item) => {
      const candidateId = item.product || item._id;
      const validProductId = candidateId && mongoose.Types.ObjectId.isValid(candidateId) ? candidateId : undefined;
      return {
        product: validProductId,
        name: item.name || item.product?.name,
        brand: item.brand || item.product?.brand || "",
        size: item.size || item.product?.size || "",
        price: Number(String(item.price || item.product?.price).replace(/,/g, "")) || 0,
        quantity: Number(item.quantity) || 1,
        image: item.image || item.product?.image || "",
        group: item.group || item.product?.group || "",
        type: item.type || item.product?.type || "",
      };
    });

    const order = await Order.create({
      user: req.user ? req.user._id : undefined,
      orderReference,
      items: normalizedItems,
      deliveryDetails: {
        fullName: deliveryDetails.fullName,
        mobileNumber: deliveryDetails.mobileNumber,
        address: deliveryDetails.address,
        city: deliveryDetails.city || "Dhaka",
      },
      paymentMethod: paymentMethod || "cash",
      subtotal,
      shipping,
      vat,
      total,
      status: "Confirmed",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by reference or ID
const getOrderByReference = async (req, res) => {
  try {
    const { reference } = req.params;
    let order = await Order.findOne({ orderReference: reference });

    if (!order && reference.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(reference);
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderByReference,
};
