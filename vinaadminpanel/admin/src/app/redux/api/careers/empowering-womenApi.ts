// redux/api/empoweringApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const empoweringApi = createApi({
  reducerPath: "empoweringApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/empowering-women",
  }),
  tagTypes: ["Empowering"],
  endpoints: (builder) => ({
    // Get empowering content
    getEmpowering: builder.query({
      query: () => "/",
      providesTags: ["Empowering"],
    }),

    // Update empowering content
    updateEmpowering: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Empowering"],
    }),
  }),
});

export const { useGetEmpoweringQuery, useUpdateEmpoweringMutation } =
  empoweringApi;
