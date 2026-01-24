import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videoBlogApi = createApi({
  reducerPath: "videoBlogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/video-blogs",
  }),
  tagTypes: ["VideoBlogs", "Categories"],
  endpoints: (builder) => ({
    getAllVideoBlogs: builder.query({
      query: () => "/",
      providesTags: ["VideoBlogs"],
    }),

    getAllCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetAllVideoBlogsQuery,

  useGetAllCategoriesQuery,
} = videoBlogApi;
