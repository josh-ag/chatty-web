import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5050/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (loginInfo) => ({
        url: "/user/login",
        body: loginInfo,
        method: "post",
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "/user/register",
        body,
        method: "post",
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: `/user/profile`,
        method: "get",
      }),
    }),

    updateProfile: builder.mutation({
      query: (updateData) => ({
        url: `/user/${updateData.id}`,
        body: updateData.body,
        method: "put",
      }),
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: `/user/password/reset`,
        body: body,
        method: "post",
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useResetPasswordMutation,
} = api;
