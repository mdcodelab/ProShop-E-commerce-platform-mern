import {PRODUCTS_URL} from "../constants";

import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
        query: () => ({
            url: PRODUCTS_URL
        }),
        keepUnusedDataFor: 5
    })
  }),
});

export const {useGetAllProductsQuery} = productsApiSlice; 