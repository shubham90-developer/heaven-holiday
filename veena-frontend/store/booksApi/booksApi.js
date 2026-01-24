import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/books",
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/",
      providesTags: ["Book"],
    }),
  }),
});

export const { useGetAllBooksQuery } = bookApi;
