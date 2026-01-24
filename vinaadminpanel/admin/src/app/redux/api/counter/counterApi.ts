// services/counterApi.ts - WITHOUT INTERFACES
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const counterApi = createApi({
  reducerPath: "counterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/v1/api" }),
  tagTypes: ["Counter"],
  endpoints: (builder) => ({
    getCounter: builder.query({
      query: () => "/counter",
      providesTags: ["Counter"],
    }),

    updateCounter: builder.mutation({
      query: (body) => ({
        url: "/counter",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Counter"],
    }),
  }),
});

export const { useGetCounterQuery, useUpdateCounterMutation } = counterApi;
