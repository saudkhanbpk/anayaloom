// import React from "react";
// import { X, Trash2 } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   removeFromCart,
//   incrementQuantity,
//   decrementQuantity,
// } from "../redux/cartslice";

// const CartSidebar = ({ isOpen, setIsOpen }) => {
//   const cartItems = useSelector((state) => state.cart.items);
//   const dispatch = useDispatch();

//   const getSubtotal = () =>
//     cartItems
//       .reduce(
//         (total, item) => total + item.price * item.quantity,
//         0
//       )
//       .toFixed(2);

//   return (
//     <>
//       {/* Backdrop */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <h2 className="text-xl font-semibold">Your Cart</h2>
//           <button onClick={() => setIsOpen(false)}>
//             <X size={24} />
//           </button>
//         </div>

//         {/* Empty Cart */}
//         {cartItems.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-full">
//             <h3 className="text-xl mb-6">Your cart is empty</h3>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="bg-black text-white px-6 py-3"
//             >
//               Continue shopping
//             </button>
//           </div>
//         ) : (
//           <>
//             {/* Cart Items */}
//             <div className="p-6 space-y-4 overflow-y-auto flex-1">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="flex gap-4 border-b pb-4">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-20 h-20 object-cover"
//                   />

//                   <div className="flex-1">
//                     <p className="font-medium">{item.title}</p>
//                     <p>PKR {item.price}</p>

//                     {/* Quantity Controls */}
//                     <div className="flex items-center gap-3 mt-2">
//                       <button
//                         onClick={() =>
//                           dispatch(decrementQuantity(item.id))
//                         }
//                         className="border px-2"
//                       >
//                         −
//                       </button>

//                       <span>{item.quantity}</span>

//                       <button
//                         onClick={() =>
//                           dispatch(incrementQuantity(item.id))
//                         }
//                         className="border px-2"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() =>
//                       dispatch(removeFromCart(item.id))
//                     }
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Footer */}
//             <div className="p-6 border-t">
//               <div className="flex justify-between mb-4 font-semibold">
//                 <span>Subtotal</span>
//                 <span>PKR {getSubtotal()}</span>
//               </div>

//               <button className="w-full bg-black text-white py-3">
//                 Checkout
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default CartSidebar;




import React from "react";
import { X, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/cartslice";

const CartSidebar = ({ isOpen, setIsOpen }) => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems ,"this is cart items");
  const dispatch = useDispatch();

  const getSubtotal = () =>
    cartItems
      .reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
      .toFixed(2);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 
        h-screen                     
        w-full sm:w-96 
        bg-white z-50 shadow-2xl
        transform transition-transform duration-300
        flex flex-col               
        ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b shrink-0">
      
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1">
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
            {/* Cart Items */}
            <div
              className="
                flex-1                  /* 🔴 ADDED */
                overflow-y-auto         /* 🔴 ADDED */
                overflow-x-hidden       /* 🔴 ADDED */
                p-6 space-y-4
              "
            >
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    {/* 🔴 min-w-0 ADDED (prevents horizontal overflow) */}
                    <p className="font-medium truncate">
                      {item.title}
                    </p>
                    <p>PKR {item.price}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          dispatch(decrementQuantity(item.id))
                        }
                        className="border px-2"
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          dispatch(incrementQuantity(item.id))
                        }
                        className="border px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t shrink-0 bg-white">
            
              <div className="flex justify-between mb-4 font-semibold">
                <span>Subtotal</span>
                <span>PKR {getSubtotal()}</span>
              </div>

              <button onClick={()=>{
                window.location.href="/checkout"
              }} className="w-full bg-black text-white py-3">
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
