import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  cart: [],
  isAuthenticated: false,
  user: null,
};

const productSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.isAuthenticated = true;
      console.log("signIn",state )
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
      state.cart = action.payload;
      const orderId = action.payload.id;

      // Find the order in the cart
      const orderIndex = state.cart.findIndex((order) => order.id === orderId);

      if (orderIndex !== -1) {
        // Remove the order from the cart
        const confirmedOrder = state.cart.splice(orderIndex, 1)[0];

        // Add the order to the list of confirmed orders
        state.orders.push(confirmedOrder);
      }
    },
  },
});

export const { addProduct, removeProduct, addToCart, confirmOrder, signInSuccess, signOut } =
  productSlice.actions;
export default productSlice.reducer;
