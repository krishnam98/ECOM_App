import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "./ProductSlice";
import cartSliceReducer from "./CartSlice";

const store = configureStore({
  reducer: {
    products: productSliceReducer,
    cart: cartSliceReducer,
    // checkout,
  },
});

export default store;
