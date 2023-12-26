import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products-list/productListSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
