import { apiSlice } from "./apiSlice";
import {ORDERS_URL} from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrderItems: builder.mutation({
      //mutation - post request
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: {...order},
      })
  }),

  })
})

export const { useAddOrderItemsMutation } = ordersApiSlice; 

