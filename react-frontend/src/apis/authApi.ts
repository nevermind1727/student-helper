import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInUserParams, User } from "../utils/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://student-helper-production.up.railway.app/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signInUser: builder.mutation<User, SignInUserParams>({
      query: (body) => ({
        url: "/signIn",
        method: "POST",
        body,
      }),
    }),
    logoutUser: builder.mutation<undefined, undefined>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getAuth: builder.mutation<User, undefined>({
      query: () => ({
        url: "/getAuth",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignInUserMutation,
  useLogoutUserMutation,
  useGetAuthMutation,
} = authApi;
