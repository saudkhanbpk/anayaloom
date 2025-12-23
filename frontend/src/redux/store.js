import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartslice";
import categoryReducer from "./categoryslice"


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    category:categoryReducer,
  },
});

export default store;
