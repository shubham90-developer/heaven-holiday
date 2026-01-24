import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicationApi = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/application-process",
  }),
  tagTypes: ["Application"],
  endpoints: (builder) => ({
    getAllApplications: builder.query({
      query: () => "/",
      providesTags: ["Application"],
    }),
  }),
});

export const { useGetAllApplicationsQuery } = applicationApi;
