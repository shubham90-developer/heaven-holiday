import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cardApi = createApi({
  reducerPath: "cardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/become-partner",
  }),
  tagTypes: ["Card"],
  endpoints: (builder) => ({
    getAllCards: builder.query({
      query: () => "/",
      providesTags: ["Card"],
    }),
  }),
});

export const { useGetAllCardsQuery } = cardApi;
