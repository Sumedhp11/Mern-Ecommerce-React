import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products-list/productListSlice";
import AuthReducer from "../features/auth/authSlice";
import CartReducer from "../features/cart/CartSlice";
import OrderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: AuthReducer,
    cart: CartReducer,
    order: OrderReducer,
  },
});
