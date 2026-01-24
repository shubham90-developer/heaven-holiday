// store/careersApi/careersApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const careersApi = createApi({
  reducerPath: "careersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/careers-header",
  }),
  tagTypes: ["Careers"],
  endpoints: (builder) => ({
    // Get careers info
    getCareers: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Careers"],
    }),

    // Update careers with video upload
    updateCareers: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "PUT",
        body: formData, // FormData object with video
      }),
      invalidatesTags: ["Careers"],
    }),
  }),
});

export const { useGetCareersQuery, useUpdateCareersMutation } = careersApi;
