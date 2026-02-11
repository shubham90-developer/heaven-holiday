import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/books",
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/",
      providesTags: ["Book"],
    }),

    createBook: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Book"],
    }),

    updateBook: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Book", id },
        "Book",
      ],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),

    addImagesToBook: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}/add-images`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Book", id },
        "Book",
      ],
    }),

    removeImageFromBook: builder.mutation({
      query: ({ id, imageUrl }) => ({
        url: `/${id}/remove-image`,
        method: "DELETE",
        body: { imageUrl },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Book", id },
        "Book",
      ],
    }),
  }),
});

export const {
  useGetAllBooksQuery,

  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useAddImagesToBookMutation,
  useRemoveImageFromBookMutation,
} = bookApi;
