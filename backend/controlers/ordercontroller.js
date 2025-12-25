import Order from "../models/order.js";

export const createOrder = async (req, res) => {
  try {
    const {
      user,
      items,
      shippingAddress,
      paymentMethod,
      cardDetails,
      subtotal,
      shipping,
      total,
    } = req.body;

    if (!user || !items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const newOrder = new Order({
      user,
      items,
      shippingAddress,
      paymentMethod,
      cardDetails: paymentMethod === "card" ? cardDetails : {},
      subtotal,
      shipping,
      total,
      status: "Pending",
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all orders (admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
