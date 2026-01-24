import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const managementApi = createApi({
  reducerPath: "managementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/csr-management",
  }),
  tagTypes: ["Management"],
  endpoints: (builder) => ({
    // Get Management
    getManagement: builder.query({
      query: () => "/management",
      providesTags: ["Management"],
    }),
  }),
});

export const { useGetManagementQuery } = managementApi;
