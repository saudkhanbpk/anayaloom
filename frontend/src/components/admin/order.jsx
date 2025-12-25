// // import React, { useState } from 'react';

// //  const Orders = () => (
// //     <div className="space-y-6">
// //       <h2 className="text-2xl font-bold">Orders</h2>
// //       <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
// //         <table className="w-full">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
// //               <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
// //               <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
// //               <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-gray-200">
// //             {orders.map(order => (
// //               <tr key={order.id} className="hover:bg-gray-50">
// //                 <td className="px-4 py-3 text-sm">#{order.id}</td>
// //                 <td className="px-4 py-3 text-sm">{order.customer}</td>
// //                 <td className="px-4 py-3 text-sm">PKR {order.total}</td>
// //                 <td className="px-4 py-3"><span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">{order.status}</span></td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );

// //   export default Orders;



// import React, { useState, useEffect } from 'react';
// import { Eye, Trash2 } from 'lucide-react';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//    const API_BASE_URL =  import.meta.env.VITE_API_URL;

//   // Fetch orders on component mount
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/orders`);
//       if (!response.ok) throw new Error('Failed to fetch orders');
//       const data = await response.json();
//       setOrders(data);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching orders:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewOrder = async (orderId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
//       if (!response.ok) throw new Error('Failed to fetch order details');
//       const orderData = await response.json();
//       setSelectedOrder(orderData);
//       setIsModalOpen(true);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching order details:', err);
//     }
//   };

//   const handleDeleteOrder = async (orderId) => {
//     if (!window.confirm('Are you sure you want to delete this order?')) return;

//     try {
//       const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
//         method: 'DELETE',
//       });
      
//       if (!response.ok) throw new Error('Failed to delete order');
      
//       // Remove order from state
//       setOrders(orders.filter(order => order.id !== orderId));
//       alert('Order deleted successfully');
//     } catch (err) {
//       setError(err.message);
//       console.error('Error deleting order:', err);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-lg">Loading orders...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-red-500 p-4">
//         Error: {error}
//         <button 
//           onClick={fetchOrders}
//           className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Orders</h2>
//         <button 
//           onClick={fetchOrders}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Refresh Orders
//         </button>
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {orders.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
//                   No orders found
//                 </td>
//               </tr>
//             ) : (
//               orders.map(order => (
//                 <tr key={order._id || order.id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3 text-sm">#{order._id?.substring(0, 8) || order.id}</td>
//                   <td className="px-4 py-3 text-sm">{order.customerName || order.customer || 'N/A'}</td>
//                   <td className="px-4 py-3 text-sm">PKR {order.totalAmount || order.total || 0}</td>
//                   <td className="px-4 py-3">
//                     <span className={`px-3 py-1 text-xs rounded-full ${
//                       (order.status === 'completed' || order.status === 'delivered') 
//                         ? 'bg-green-100 text-green-700'
//                         : order.status === 'pending'
//                         ? 'bg-yellow-100 text-yellow-700'
//                         : 'bg-red-100 text-red-700'
//                     }`}>
//                       {order.status || 'pending'}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleViewOrder(order._id || order.id)}
//                         className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
//                         title="View Order Details"
//                       >
//                         <Eye size={18} />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteOrder(order._id || order.id)}
//                         className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
//                         title="Delete Order"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal for viewing order details */}
//       {isModalOpen && selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold">Order Details</h3>
//                 <button
//                   onClick={closeModal}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>

//               {/* Order Header Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                 <div>
//                   <p className="text-sm text-gray-600">Order ID</p>
//                   <p className="font-medium">#{selectedOrder._id?.substring(0, 12) || selectedOrder.id}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Status</p>
//                   <span className={`px-3 py-1 text-xs rounded-full ${
//                     (selectedOrder.status === 'completed' || selectedOrder.status === 'delivered') 
//                       ? 'bg-green-100 text-green-700'
//                       : selectedOrder.status === 'pending'
//                       ? 'bg-yellow-100 text-yellow-700'
//                       : 'bg-red-100 text-red-700'
//                   }`}>
//                     {selectedOrder.status || 'pending'}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Customer</p>
//                   <p className="font-medium">{selectedOrder.customerName || selectedOrder.customer || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Total Amount</p>
//                   <p className="font-medium">PKR {selectedOrder.totalAmount || selectedOrder.total || 0}</p>
//                 </div>
//                 {selectedOrder.createdAt && (
//                   <div>
//                     <p className="text-sm text-gray-600">Order Date</p>
//                     <p className="font-medium">
//                       {new Date(selectedOrder.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 )}
//                 {selectedOrder.shippingAddress && (
//                   <div>
//                     <p className="text-sm text-gray-600">Shipping Address</p>
//                     <p className="font-medium">{selectedOrder.shippingAddress}</p>
//                   </div>
//                 )}
//               </div>

//               {/* Products Table */}
//               {selectedOrder.products && selectedOrder.products.length > 0 && (
//                 <div className="mb-6">
//                   <h4 className="text-lg font-semibold mb-3">Products</h4>
//                   <div className="overflow-x-auto">
//                     <table className="w-full border-collapse border border-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left">Subtotal</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {selectedOrder.products.map((product, index) => (
//                           <tr key={index}>
//                             <td className="border border-gray-300 px-4 py-2">
//                               {product.name || product.productName || `Product ${index + 1}`}
//                               {product.productId && (
//                                 <div className="text-xs text-gray-500">
//                                   ID: {product.productId}
//                                 </div>
//                               )}
//                             </td>
//                             <td className="border border-gray-300 px-4 py-2">{product.quantity || 1}</td>
//                             <td className="border border-gray-300 px-4 py-2">
//                               PKR {product.price || product.unitPrice || 0}
//                             </td>
//                             <td className="border border-gray-300 px-4 py-2">
//                               PKR {(product.quantity || 1) * (product.price || product.unitPrice || 0)}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}

//               {/* Additional Order Information */}
//               {selectedOrder.notes && (
//                 <div className="mb-4">
//                   <h4 className="text-sm font-semibold text-gray-600 mb-1">Notes</h4>
//                   <p className="text-gray-800">{selectedOrder.notes}</p>
//                 </div>
//               )}

//               <div className="flex justify-end pt-4 border-t">
//                 <button
//                   onClick={closeModal}
//                   className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;


import React, { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";

const Orders = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH ORDERS ================= */
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/orders`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= VIEW ORDER ================= */
  const handleViewOrder = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${id}`);
      if (!res.ok) throw new Error("Failed to fetch order");
      const data = await res.json();
      setSelectedOrder(data);
      setIsModalOpen(true);
    } catch (err) {
      setError(err.message);
    }
  };

  /* ================= DELETE ORDER ================= */
  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s === "pending") return "bg-yellow-100 text-yellow-700";
    if (s === "delivered" || s === "completed")
      return "bg-green-100 text-green-700";
    return "bg-red-100 text-red-700";
  };

  /* ================= UI STATES ================= */
  if (loading) {
    return <p className="text-center py-10">Loading orders...</p>;
  }

  if (error) {
    return (
      <div className="text-red-600 p-4">
        {error}
        <button
          onClick={fetchOrders}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Orders</h2>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="px-4 py-3">
                    #{order._id.substring(0, 8)}
                  </td>

                  <td className="px-4 py-3">
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </td>

                  <td className="px-4 py-3">PKR {order.total}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleViewOrder(order._id)}
                      className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white max-w-2xl w-full rounded-lg p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">Order Details</h3>
              <button onClick={closeModal} className="text-xl">×</button>
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 p-4 rounded mb-4">
              <p className="font-semibold">Customer</p>
              <p>
                {selectedOrder.shippingAddress.firstName}{" "}
                {selectedOrder.shippingAddress.lastName}
              </p>
              <p>{selectedOrder.shippingAddress.email}</p>
              <p>{selectedOrder.shippingAddress.phone}</p>
              <p>{selectedOrder.shippingAddress.address}</p>
              <p>
                {selectedOrder.shippingAddress.city}{" "}
                {selectedOrder.shippingAddress.postalCode}
              </p>
              {selectedOrder.shippingAddress.message && (
                <p className="italic mt-1">
                  "{selectedOrder.shippingAddress.message}"
                </p>
              )}
            </div>

            {/* Products */}
            <h4 className="font-semibold mb-2">Products</h4>
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2">Product</th>
                  <th className="border px-3 py-2">Qty</th>
                  <th className="border px-3 py-2">Price</th>
                  <th className="border px-3 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border px-3 py-2">
                      {item.title}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 mt-2"
                      />
                    </td>
                    <td className="border px-3 py-2">{item.quantity}</td>
                    <td className="border px-3 py-2">PKR {item.price}</td>
                    <td className="border px-3 py-2">
                      PKR {item.quantity * item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="mt-4 text-right">
              <p>Subtotal: PKR {selectedOrder.subtotal}</p>
              <p>Shipping: PKR {selectedOrder.shipping}</p>
              <p className="font-bold">Total: PKR {selectedOrder.total}</p>
            </div>

            <div className="text-right mt-4">
              <button
                onClick={closeModal}
                className="px-5 py-2 bg-gray-200 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
