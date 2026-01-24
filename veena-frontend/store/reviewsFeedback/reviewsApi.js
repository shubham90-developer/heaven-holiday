import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Feedback"],
  endpoints: (builder) => ({
    createFeedback: builder.mutation({
      query: (data) => ({
        url: "/reviews-feedback",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Feedback"],
    }),

    getAllFeedbacks: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: "/reviews-feedback",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Feedback"],
    }),
  }),
});

export const { useCreateFeedbackMutation, useGetAllFeedbacksQuery } =
  feedbackApi;
