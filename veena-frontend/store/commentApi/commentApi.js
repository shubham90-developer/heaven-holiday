import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/comment",
  }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getAllComments: builder.query({
      query: () => "/",
      providesTags: ["Comment"],
    }),

    createComment: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const { useGetAllCommentsQuery, useCreateCommentMutation } = commentApi;
