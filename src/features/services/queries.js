import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/user",
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
        url: "/login",
        body: loginInfo,
        method: "post",
      }),
    }),

    register: builder.mutation({
      query: (registerInfo) => ({
        url: "/register",
        body: registerInfo,
        method: "post",
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: `/profile`,
        method: "get",
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({ url: `/${data.id}`, body: data.body, method: "put" }),
    }),

    verifyAccount: builder.mutation({
      query: (verifyData) => ({
        url: "/account/verify",
        body: verifyData,
        method: "put",
      }),
    }),

    resetPassword: builder.mutation({
      query: (newPassword) => ({
        url: `/password/reset`,
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
