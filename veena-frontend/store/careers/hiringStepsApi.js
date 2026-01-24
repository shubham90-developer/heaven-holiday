// app/redux/api/howWeHireApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const howWeHireApi = createApi({
  reducerPath: "howWeHireApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/hiring-process",
  }),
  tagTypes: ["HowWeHire"],
  endpoints: (builder) => ({
    // GET HowWeHire document
    getHowWeHire: builder.query({
      query: () => "/",
      providesTags: ["HowWeHire"],
    }),
  }),
});

export const { useGetHowWeHireQuery } = howWeHireApi;
