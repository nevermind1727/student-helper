import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInUserParams, User } from "../utils/types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3001/users`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<User, SignInUserParams>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
    getUser: builder.mutation<User, undefined>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetUserMutation } = usersApi;
