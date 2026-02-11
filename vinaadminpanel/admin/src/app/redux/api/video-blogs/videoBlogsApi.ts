import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videoBlogApi = createApi({
  reducerPath: "videoBlogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/video-blogs",
  }),
  tagTypes: ["VideoBlogs", "Categories"],
  endpoints: (builder) => ({
    // ========== VIDEO BLOG ENDPOINTS ==========

    // Get all video blogs
    getAllVideoBlogs: builder.query({
      query: () => "/",
      providesTags: ["VideoBlogs"],
    }),

    // Create video blog
    createVideoBlog: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["VideoBlogs"],
    }),

    // Update video blog
    updateVideoBlog: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["VideoBlogs"],
    }),

    // Delete video blog
    deleteVideoBlog: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["VideoBlogs"],
    }),

    // ========== CATEGORY ENDPOINTS ==========

    // Get all categories
    getAllCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),

    // Add category
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Update category
    updateCategory: builder.mutation({
      query: ({ categoryId, ...data }) => ({
        url: `/categories/${categoryId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Delete category
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetAllVideoBlogsQuery,
  useCreateVideoBlogMutation,
  useUpdateVideoBlogMutation,
  useDeleteVideoBlogMutation,
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = videoBlogApi;
