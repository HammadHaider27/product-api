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
      const productId = action.payload.id;
      const productIndex = state.product.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        state.product.splice(productIndex, 1);
      }
      const cartIndex = state.cart.findIndex(
        (product) => product.id === productId
      );
      if (cartIndex !== -1) {
        state.cart.splice(cartIndex, 1);
      }
      // state.product = state.product.filter(
      //   (product) => product.id !== productId
      // );
      // state.cart = state.cart.filter((product) => product.id !== productId);

      // state.cart.splice(action.payload, 1);
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
