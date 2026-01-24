// redux/api/excitedtowork/excitedToWorkApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const excitedToWorkApi = createApi({
  reducerPath: "excitedToWorkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: " http://localhost:8080/v1/api/excited-to-work",
  }),
  tagTypes: ["ExcitedToWork"],
  endpoints: (builder) => ({
    getExcitedToWork: builder.query({
      query: () => "/",
      providesTags: ["ExcitedToWork"],
    }),

    updateExcitedToWork: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ExcitedToWork"],
    }),
  }),
});

export const { useGetExcitedToWorkQuery, useUpdateExcitedToWorkMutation } =
  excitedToWorkApi;
