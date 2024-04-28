import {USERS_URL} from "../constants";

import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      //mutation - post request
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      //mutation - post request
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation({
      //mutation - post request
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data
      }),
    }),
  }),
});

export const {useLoginMutation, useLogoutMutation, useRegisterMutation} = usersApiSlice; 