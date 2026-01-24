// features/gallery/galleryApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const toursGalleryApi = createApi({
  reducerPath: "toursGalleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/tours-gallery",
    prepareHeaders: (headers) => {
      // Don't set Content-Type for FormData - browser will set it automatically
      return headers;
    },
  }),
  tagTypes: ["Gallery", "Images"],
  endpoints: (builder) => ({
    getGallery: builder.query<any, void>({
      query: () => "/gallery",
      providesTags: ["Gallery"],
    }),

    createGallery: builder.mutation<any, any>({
      query: (body) => ({
        url: "/gallery",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Gallery"],
    }),

    updateGallery: builder.mutation<any, any>({
      query: (body) => ({
        url: "/gallery",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Gallery"],
    }),

    getImages: builder.query<any, void>({
      query: () => "/gallery/images",
      providesTags: ["Images"],
    }),

    // NEW: Upload image with file (Cloudinary)
    uploadImage: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/gallery/images/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Images", "Gallery"],
    }),

    // Keep for URL-based images (without file upload)
    addImage: builder.mutation<any, any>({
      query: (body) => ({
        url: "/gallery/images",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Images", "Gallery"],
    }),

    // NEW: Update image with file upload
    updateImageWithUpload: builder.mutation<
      any,
      { imageId: string; formData: FormData }
    >({
      query: ({ imageId, formData }) => ({
        url: `/gallery/images/${imageId}/upload`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Images", "Gallery"],
    }),

    // Update image without file (metadata only)
    updateImage: builder.mutation<any, { imageId: string; body: any }>({
      query: ({ imageId, body }) => ({
        url: `/gallery/images/${imageId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Images", "Gallery"],
    }),

    deleteImage: builder.mutation<any, string>({
      query: (imageId) => ({
        url: `/gallery/images/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Images", "Gallery"],
    }),
  }),
});

export const {
  useGetGalleryQuery,
  useCreateGalleryMutation,
  useUpdateGalleryMutation,
  useGetImagesQuery,
  useUploadImageMutation,
  useAddImageMutation,
  useUpdateImageWithUploadMutation,
  useUpdateImageMutation,
  useDeleteImageMutation,
} = toursGalleryApi;
