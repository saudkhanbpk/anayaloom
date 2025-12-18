import React from 'react';
import { X, Trash2 } from 'lucide-react';

const CartSidebar = ({ isOpen, setIsOpen, cartItems, setCartItems }) => {

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getSubtotal = () =>
    cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 bg-opacity-100 z-40  "
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Empty cart */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-xl mb-6">Your cart is empty</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-black text-white px-6 py-3"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <img src={item.image} className="w-20 h-20 object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p>${item.price}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>

                  <button onClick={() => removeItem(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t">
              <div className="flex justify-between mb-4 font-semibold">
                <span>Subtotal</span>
                <span>${getSubtotal()}</span>
              </div>

              <button
                onClick={() => window.location.href = '/checkout'}
                className="w-full bg-black text-white py-3"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
