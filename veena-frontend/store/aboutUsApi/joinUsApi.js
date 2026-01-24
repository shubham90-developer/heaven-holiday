import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const joinUsApi = createApi({
  reducerPath: "joinUsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/joinUs",
  }),
  tagTypes: ["JoinUs"],
  endpoints: (builder) => ({
    getContent: builder.query({
      query: () => "/",
      providesTags: ["JoinUs"],
    }),
  }),
});

export const { useGetContentQuery } = joinUsApi;
