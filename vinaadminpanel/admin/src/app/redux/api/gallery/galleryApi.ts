import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const galleryApi = createApi({
  reducerPath: "galleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/gallery",
  }),
  tagTypes: ["Gallery"],
  endpoints: (builder) => ({
    getGallery: builder.query<any, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Gallery"],
    }),
    updateGalleryInfo: builder.mutation<
      any,
      { title: string; subtitle: string }
    >({
      query: (data) => ({
        url: "/info",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["Gallery"],
    }),
    addImageToGallery: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/image",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Gallery"],
    }),
    deleteImageFromGallery: builder.mutation<any, { imageId: string }>({
      query: ({ imageId }) => ({
        url: "/image",
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: { imageId },
      }),
      invalidatesTags: ["Gallery"],
    }),

    updateImageStatus: builder.mutation<
      any,
      { imageId: string; status: string }
    >({
      query: (data) => ({
        url: "/image/status",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["Gallery"],
    }),
  }),
});

export const {
  useGetGalleryQuery,
  useUpdateGalleryInfoMutation,
  useAddImageToGalleryMutation,
  useDeleteImageFromGalleryMutation,
  useUpdateImageStatusMutation,
} = galleryApi;
