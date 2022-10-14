import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = "https://chatty-web-server.herokuapp.com/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
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

    register: builder.mutation({
      query: (registerInfo) => ({
        url: "/user/register",
        body: registerInfo,
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
      query: (data) => ({
        url: `/user/${data.id}`,
        body: data.body,
        method: "put",
      }),
    }),

    verifyAccount: builder.mutation({
      query: (verifyData) => ({
        url: "/user/account/verify",
        body: verifyData,
        method: "put",
      }),
    }),

    resetPassword: builder.mutation({
      query: (newPassword) => ({
        url: `/user/password/reset`,
        body: newPassword,
        method: "post",
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useResetPasswordMutation,
  useVerifyAccountMutation,
} = api;
