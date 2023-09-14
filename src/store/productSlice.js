import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  cart: [],
};

const productSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.product = action.payload;
    },
    removeProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload.id);
    },
    addToCart: (state, action) => {
      const productId = action.payload;
      state.cart.push(productId);
      console.log("state cart", productId);
    },
  },
});

export const { addProduct, removeProduct, addToCart } = productSlice.actions;
export default productSlice.reducer;
