import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api",
  }),
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (status) => ({
        url: "/teams",
        params: status ? { status } : undefined,
      }),
      providesTags: ["Team"],
    }),
  }),
});

export const { useGetTeamsQuery } = teamApi;
