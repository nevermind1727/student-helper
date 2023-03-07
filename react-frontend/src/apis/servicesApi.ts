import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  EssayGeneratorParams,
  GrammarCorrectionParams,
  StudyNotesParams,
} from "../utils/types";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://student-helper-backend.onrender.com/generators`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    studyNotes: builder.mutation<any, StudyNotesParams>({
      query: (body) => ({
        url: "/studyNotes",
        method: "POST",
        body,
      }),
    }),
    grammarCorrection: builder.mutation<any, GrammarCorrectionParams>({
      query: (body) => ({
        url: "/grammarCorrection",
        method: "POST",
        body,
      }),
    }),
    essayGenerator: builder.mutation<any, EssayGeneratorParams>({
      query: (body) => ({
        url: "/essayGenerator",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useStudyNotesMutation,
  useGrammarCorrectionMutation,
  useEssayGeneratorMutation,
} = servicesApi;
