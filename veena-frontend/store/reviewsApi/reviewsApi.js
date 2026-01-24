import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/reviews",
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getTourReview: builder.query({
      query: () => "/",
      providesTags: ["Reviews"],
    }),
  }),
});

export const { useGetTourReviewQuery } = reviewsApi;
