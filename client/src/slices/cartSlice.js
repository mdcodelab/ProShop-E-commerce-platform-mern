import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("Cart")
  ? JSON.parse(localStorage.getItem("Cart"))
  : { cartItems: []};

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {item, quantity} = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
            state.cartItems = state.cartItems.map((x) =>
              x._id === existItem._id ? { ...item, quantity } : x);
      } else {
        state.cartItems = [...state.cartItems, { ...item, quantity }];
      }
      //calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => {
          return acc + item.price*item.quantity
        }, 0)
      )
      //calculate shipping price
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      //calculating tax price (15% tax);
      state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));

      //calculating total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {addToCart}=cartSlice.actions;

export default cartSlice.reducer; //cartSliceReducer
