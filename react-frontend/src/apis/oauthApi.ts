import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../utils/types";

export const oauthApi = createApi({
  reducerPath: "oauthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3001/auth`,
    credentials: "include",
    mode: "no-cors",
  }),
  endpoints: (builder) => ({
    googleAuth: builder.mutation<User, undefined>({
      query: () => ({
        url: "/google",
        method: "GET",
      }),
    }),
    facebookAuth: builder.mutation<User, undefined>({
      query: () => ({
        url: "/facebook",
        method: "GET",
      }),
    }),
    linkedinAuth: builder.mutation<User, undefined>({
      query: () => ({
        url: "/linkedin",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGoogleAuthMutation,
  useFacebookAuthMutation,
  useLinkedinAuthMutation,
} = oauthApi;
