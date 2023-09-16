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
      const productId = action.payload.id;
      const existingProduct = state.cart.find(
        (product) => product.id === productId
      );

      if (existingProduct) {
        existingProduct.count += action.payload.count;
      } else {
        state.cart.push(action.payload);
      }
      console.log("state cart", existingProduct);
    },
  },
});

export const { addProduct, removeProduct, addToCart } = productSlice.actions;
export default productSlice.reducer;
