import React, { useState, useEffect } from 'react';
import { ShoppingCart, MapPin, CreditCard, Lock } from 'lucide-react';
import { useSelector , useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { clearCart } from "../redux/cartslice";

export default function CheckoutPage() {
    const cartItems = useSelector((state) => state.cart.items);
    const navigate = useNavigate();
    const location = useLocation();
    const API_BASE_URL =  import.meta.env.VITE_API_URL;
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        city: '',
        firstName: '',
        lastName: '',
        address: '',
        postalCode: '',
        phone: '',
        paymentMethod: 'cod',
        message: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Format card number with spaces
        if (name === 'cardNumber') {
            const cleaned = value.replace(/\s/g, '');
            const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
            setFormData(prev => ({
                ...prev,
                [name]: formatted.slice(0, 19) // Limit to 16 digits + 3 spaces
            }));
            return;
        }

        // Format expiry date
        if (name === 'expiryDate') {
            const cleaned = value.replace(/\D/g, '');
            let formatted = cleaned;
            if (cleaned.length >= 2) {
                formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
            }
            setFormData(prev => ({
                ...prev,
                [name]: formatted.slice(0, 5)
            }));
            return;
        }

        // Format CVV
        if (name === 'cvv') {
            setFormData(prev => ({
                ...prev,
                [name]: value.replace(/\D/g, '').slice(0, 4)
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // const handleSubmit = () => {
    //     // Validate card details if card payment is selected
    //     if (formData.paymentMethod === 'card') {
    //         if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
    //             alert('Please fill in all card details');
    //             return;
    //         }
    //         if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
    //             alert('Please enter a valid 16-digit card number');
    //             return;
    //         }
    //         if (formData.expiryDate.length !== 5) {
    //             alert('Please enter a valid expiry date (MM/YY)');
    //             return;
    //         }
    //         if (formData.cvv.length < 3) {
    //             alert('Please enter a valid CVV');
    //             return;
    //         }
    //     }

    //     alert('Order placed successfully!');
    //     console.log('Form Data:', formData);
    // };

    const handleSubmit = async () => {
        if (formData.paymentMethod === "card") {
            if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
                alert("Please fill all card details");
                return;
            }
        }

        try {
            const user = localStorage.getItem("token"); // replace with actual user ID
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user,
                    items: cartItems,
                    shippingAddress: {
                        email: formData.email,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        address: formData.address,
                        city: formData.cityInput || formData.city,
                        postalCode: formData.postalCode,
                        phone: formData.phone,
                        message: formData.message,
                    },
                    paymentMethod: formData.paymentMethod,
                    cardDetails: formData.paymentMethod === "card" ? {
                        cardNumber: formData.cardNumber,
                        cardName: formData.cardName,
                        expiryDate: formData.expiryDate,
                        cvv: formData.cvv
                    } : {},
                    subtotal,
                    shipping,
                    total
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Order placed successfully!");
                console.log(data.order);
                 dispatch(clearCart());
                navigate("/order-success"); // optional success page
            } else {
                alert(data.message || "Order failed");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
    );

    const shipping = subtotal > 0 ? 250 : 0;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="py-4 px-6">
                <div className="max-w-7xl mx-auto flex flex-col justify-center items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Complete Your Order</h1>
                    </div>
                    <div>
                        <p className="text-gray-600">Fill in Your Detail to Finalize Your Purchase</p>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Form */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Delivery</h2>
                        {/* Contact Section */}
                        <div className="mb-8">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Delivery Section */}
                        <div className="mb-8">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                required
                            />

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    name="cityInput"
                                    placeholder="City"
                                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="Postal code (optional)"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                required
                            />

                            <label className="flex flex-col">
                                <span className="text-sm text-gray-700 mb-1">Your Message</span>
                                <textarea
                                    name="message"
                                    value={formData.message || ''}
                                    onChange={handleInputChange}
                                    placeholder="Write your message here..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    rows={4}
                                />
                            </label>
                        </div>

                        {/* Payment */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-2">Payment</h2>
                            <p className="text-sm text-gray-600 mb-4">All transactions are secure and encrypted.</p>

                            <label className="flex items-center p-4 border-2 border-gray-300 rounded-t-md cursor-pointer hover:bg-gray-50 transition-colors"
                                style={{
                                    borderColor: formData.paymentMethod === 'cod' ? '#3B82F6' : '#D1D5DB',
                                    backgroundColor: formData.paymentMethod === 'cod' ? '#EFF6FF' : 'white'
                                }}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={formData.paymentMethod === 'cod'}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="ml-3 font-medium">Cash on Delivery (COD)</span>
                            </label>

                            <label className="flex items-center justify-between p-4 border-2 border-t-0 border-gray-300 rounded-b-md cursor-pointer hover:bg-gray-50 transition-colors"
                                style={{
                                    borderColor: formData.paymentMethod === 'card' ? '#3B82F6' : '#D1D5DB',
                                    backgroundColor: formData.paymentMethod === 'card' ? '#EFF6FF' : 'white'
                                }}>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        checked={formData.paymentMethod === 'card'}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="ml-3 font-medium">Debit - Credit Card</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">VISA</span>
                                    <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">MC</span>
                                </div>
                            </label>

                            {/* Card Details Form - Shows when card payment is selected */}
                            {formData.paymentMethod === 'card' && (
                                <div className="mt-4 p-4 border-2 border-blue-200 rounded-md bg-blue-50 space-y-4 animate-fadeIn">
                                    <div className="flex items-center gap-2 text-blue-700 mb-3">
                                        <Lock className="w-4 h-4" />
                                        <span className="text-sm font-medium">Secure Payment</span>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Card Number *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                placeholder="1234 5678 9012 3456"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                            <CreditCard className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Cardholder Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            placeholder="John Doe"
                                            value={formData.cardName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Expiry Date *
                                            </label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                placeholder="MM/YY"
                                                value={formData.expiryDate}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                CVV *
                                            </label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                placeholder="123"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2 mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                                        <span className="text-yellow-600 text-sm">ℹ️</span>
                                        <p className="text-xs text-yellow-800">
                                            Your card information is encrypted and secure. We never store your complete card details.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white py-4 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                        >
                            Complete order
                        </button>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:sticky lg:top-8 h-fit">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                            {cartItems.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">Your cart is empty</p>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
                                        <div className="relative w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md" />
                                            <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium mb-1 truncate">{item.title}</h3>
                                            <h3 className="font-medium mb-1 truncate">{item._id}</h3>
                                            <p className="text-sm text-gray-600">PKR {(Number(item.price)).toFixed(2)}</p>
                                        </div>
                                        <div className="font-semibold">PKR {(Number(item.price) * item.quantity).toFixed(2)}</div>
                                    </div>
                                ))
                            )}

                            {/* Totals */}
                            <div className="space-y-3 mt-6">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span>PKR {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Shipping</span>
                                    <span>PKR {shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-semibold pt-3 border-t border-gray-200">
                                    <span>Total</span>
                                    <span>PKR {total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}