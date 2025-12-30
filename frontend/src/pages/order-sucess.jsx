import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  

  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);

  // If someone opens page directly
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600">No order found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-black text-white"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 flex items-center justify-center ">
      <div className="bg-white max-w-lg w-auto p-6 shadow-md rounded-lg">

        <h1 className="text-2xl font-semibold text-green-600 text-center mb-6">
          🎉 Order Placed Successfully
        </h1>

        {/* User Info */}
        <div className="mb-4">
          <p><strong>Email:</strong> {order.shippingAddress.email}</p>
          <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
          <p><strong>Status:</strong> 
            <span className="text-green-600 font-semibold ml-1">
              {order.status}
            </span>
          </p>
        </div>

        {/* Items */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Items:</h2>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.title} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        {/* Total */}
        <div className="border-t pt-4">
          <p className="text-lg font-semibold">
            Total Price: PKR {order.total}
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-black text-white py-2 hover:bg-gray-800 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
