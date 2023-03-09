import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../utils/types";

export const oauthApi = createApi({
  reducerPath: "oauthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://student-helper-production.up.railway.app/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    googleAuth: builder.mutation<User, undefined>({
      query: () => ({
        url: "/google",
        method: "GET",
      }),
    }),
  }),
});

export const { useGoogleAuthMutation } = oauthApi;
