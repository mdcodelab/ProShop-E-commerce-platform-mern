import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrderItems: builder.mutation({
      //mutation - post request
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: { ...order },
      }),
    }),

    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "GET" //by default
      }),
      keepUnusedDataFor: 5
    }),

    updateOrderTRoPaid: builder.mutation({
        query: (orderId, details) => ({
            url: `${ORDERS_URL}/${orderId}/pay`,
            method: "PUT",
            body: {...details}
        })
    }),

    getPayPalClientId: builder.query ({   //api/config/paypal
        query: () => ({
            url: PAYPAL_URL
        }),
        keepUnusedDataFor: 5
    }),

  }),
});

export const { useAddOrderItemsMutation, useGetOrderDetailsQuery, 
    useGetPayPalClientIdQuery, useUpdateOrderToPaidMutation } = ordersApiSlice;
