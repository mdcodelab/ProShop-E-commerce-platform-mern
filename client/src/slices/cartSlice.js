import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, quantity } = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...item, quantity } : x
        );
      } else {
        state.cartItems = [...state.cartItems, { ...item, quantity }];
      }
      // Recalculate prices
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0)
      );
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state));

    },
    
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== itemId);

      // Recalculate prices
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0)
      );
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    
    saveShippingAddress: (state, action) => {
      state.shippingAddress=action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod=action.payload;
      localStorage.setItem("cart", JSON.stringify(state)); 
    },

    clearCartItems: (state, action) => {
      state.cartItems=[];
      state.shippingAddress = {};
      state.paymentMethod= "";
      localStorage.setItem("cart", JSON.stringify(state));
    },


  },
});

export const { addToCart, removeFromCart, saveShippingAddress, 
  savePaymentMethod, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
