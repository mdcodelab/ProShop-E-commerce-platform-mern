import {PRODUCTS_URL, UPLOADS_URL} from "../constants";

import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
        query: ({pageNumber, keyword}) => ({
            url: PRODUCTS_URL,
            params: {pageNumber, keyword},
        }),
        providesTags: ["Products"],
        keepUnusedDataFor: 5
    }),

    getProduct: builder.query({
        query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`
        }),
        keepUnusedDataFor: 5
    }),

    createProduct: builder.mutation({
      query: ()=> ({
        url: PRODUCTS_URL,
        method: "POST"
      }),
      invalidatesTags: ["Product"]  //not cached, obtain fresh data, so we don't need to refresh the page
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Products"]
    }),

    uploadsProductImage: builder.mutation({
      query: (data)=> ({
        url: UPLOADS_URL,
        method: "POST",
        body: data
      })
    }),

    deleteProduct: builder.mutation({
      query: (_id) => ({
        url: `${PRODUCTS_URL}/${_id}`,
        method: "DELETE",
      })
    }),

    createProductReview: builder.mutation({
      query: (data)=> ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Product"]
    }),

  }),
});

export const {useGetAllProductsQuery, useGetProductQuery, 
  useCreateProductMutation, useUpdateProductMutation, 
  useUploadsProductImageMutation, useDeleteProductMutation, useCreateProductReviewMutation} = productsApiSlice;