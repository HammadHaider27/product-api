import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  cart: [],
  orders: [],
  isAuthenticated: false,
  user: null,
};

const productSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.isAuthenticated = true;
      console.log("signInSuccess", action.payload);
      state.user = action.payload;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
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
    confirmOrder: (state, action) => {
      state.cart = [];
    },
    checkConfirmOrder: (state, action) => {
     state.orders = action.payload;
    },
  },
});

export const {
  signInSuccess,
  signOut,
  addProduct,
  removeProduct,
  addToCart,
  confirmOrder,
} = productSlice.actions;
export default productSlice.reducer;
