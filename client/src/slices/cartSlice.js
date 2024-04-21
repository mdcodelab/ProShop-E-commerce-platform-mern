import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : {cartItems: []};

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {}
});

export default cartSlice.reducer;  //cartSliceReducer