import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrderItems: builder.mutation({
      //mutation - post request
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: order,
      }),
    }),

    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "GET", //by default
      }),
      keepUnusedDataFor: 5,
    }),

    updateOrderToPaid: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),

    getPayPalClientId: builder.query({
      //api/config/paypal
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    getMyOrders: builder.query({
      //api/orders/myOrders
      query: () => ({
        url: `${ORDERS_URL}/myOrders`,
      }),
      keepUnusedDataFor: 5,
    }),

    getAllOrders: builder.query({
      //api/orders
      query: () => ({
        url: ORDERS_URL
      }),
      keepUnusedDataFor: 5,
    }),

    updateToDelivered: builder.mutation({
      //api/orders/:id/deliver  to be executed in OrderScreen
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT"
      })
    })

  }),
});

export const { useAddOrderItemsMutation, useGetOrderDetailsQuery, 
    useGetPayPalClientIdQuery, useUpdateOrderToPaidMutation, useGetMyOrdersQuery,
  useGetAllOrdersQuery, useUpdateToDeliveredMutation} = ordersApiSlice;
