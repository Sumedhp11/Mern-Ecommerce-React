import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products-list/productListSlice";
import AuthReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: AuthReducer,
  },
});
