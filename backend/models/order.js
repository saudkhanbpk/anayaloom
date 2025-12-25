import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  items: [
    {
      productId: String,
      title: String,
      quantity: Number,
      price: Number,
      image: String
    }
  ],
  shippingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    city: String,
    postalCode: String,
    phone: String,
    message: String
  },
  paymentMethod: { type: String, required: true },
  cardDetails: {
    cardNumber: String,
    cardName: String,
    expiryDate: String,
    cvv: String
  },
  subtotal: Number,
  shipping: Number,
  total: Number,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
