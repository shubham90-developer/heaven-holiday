import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tourReviewApi = createApi({
  reducerPath: "tourReviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/reviews",
  }),
  tagTypes: ["TourReview"],
  endpoints: (builder) => ({
    getTourReview: builder.query({
      query: () => "/",
      providesTags: ["TourReview"],
    }),

    updateMainFields: builder.mutation({
      query: (body) => ({
        url: "/update-main",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["TourReview"],
    }),

    addReview: builder.mutation({
      query: (body) => ({
        url: "/review/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TourReview"],
    }),
    updateReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/review/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["TourReview"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/review/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TourReview"],
    }),
  }),
});

export const {
  useGetTourReviewQuery,
  useUpdateMainFieldsMutation,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = tourReviewApi;
