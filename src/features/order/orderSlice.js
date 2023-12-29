import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
};

export const createOrderAsync = createAsyncThunk(
  "order/addOrder",
  async (order) => {
    const response = await addOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
      });
  },
});

export const { increment } = orderSlice.actions;

export const selectAllProducts = (state) => state.product.products;

export default orderSlice.reducer;
