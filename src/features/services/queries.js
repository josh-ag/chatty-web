import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_BASE_URL = "https://chatty-server-xy3z.onrender.com/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
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
      query: (id) => ({
        url: `/user/profile/${id}`,
        method: "get",
      }),
    }),

    getRoom: builder.query({
      query: (id) => ({
        url: `/rooms/${id}`,
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
          credentials: "same-origin",
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
  useGetRoomQuery,
  useUpdateProfileMutation,
  useResetPasswordMutation,
  useVerifyAccountMutation,
  useSetNewPasswordMutation,
  useUploadProfilePictureMutation,
} = api;
