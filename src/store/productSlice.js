import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: [],
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
      
    }
  },
});

export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
