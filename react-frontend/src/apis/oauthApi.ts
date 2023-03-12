import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GoogleAuthParams, User } from "../utils/types";

export const oauthApi = createApi({
  reducerPath: "oauthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/oauth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    googleAuth: builder.mutation<User, GoogleAuthParams>({
      query: (body) => ({
        url: "/google",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGoogleAuthMutation } = oauthApi;
