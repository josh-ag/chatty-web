import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = "https://chatty-web-server.herokuapp.com/api";
const LOCAL_BASE_URL = "http://localhost:5050/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("__chatty_token__");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (loginInfo) => ({
        url: "/auth/login",
        body: loginInfo,
        method: "post",
      }),
    }),

    register: builder.mutation({
      query: (registerInfo) => ({
        url: "/auth/register",
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
    uploadProfilePicture: builder.mutation({
      query: (newProfilePicture) => {
        return {
          url: "/user/profile/upload",
          method: "post",
          credentials: "include",
          body: newProfilePicture,
        };
      },
    }),

    verifyAccount: builder.mutation({
      query: (verifyData) => ({
        url: "/auth/verify",
        body: verifyData,
        method: "put",
      }),
    }),

    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: `/auth/password/reset`,
        body: resetData,
        method: "post",
      }),
    }),

    setNewPassword: builder.mutation({
      query: (newPassword) => ({
        url: `/auth/password/new`,
        body: newPassword,
        method: "put",
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
  useSetNewPasswordMutation,
  useUploadProfilePictureMutation,
} = api;
