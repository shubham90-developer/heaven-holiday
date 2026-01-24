import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApplicationApi = createApi({
  reducerPath: "jobApplicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/job-applications",
  }),
  tagTypes: ["JobApplication"],
  endpoints: (builder) => ({
    // Create job application
    createJobApplication: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["JobApplication"],
    }),
  }),
});

export const { useCreateJobApplicationMutation } = jobApplicationApi;
