import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tourPackageApi = createApi({
  reducerPath: "tourPackageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/tour-package",
  }),
  tagTypes: ["TourPackage", "PackageCard"],
  endpoints: (builder) => ({
    // Get tour package (with all cards)
    getTourPackage: builder.query({
      query: () => "/",
      providesTags: ["TourPackage"],
    }),

    // Update title and subtitle
    updateTitleSubtitle: builder.mutation({
      query: (data: { title?: string; subtitle?: string }) => ({
        url: "/title-subtitle",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["TourPackage"],
    }),

    // Add a package card
    addPackageCard: builder.mutation({
      query: (data: FormData) => ({
        url: "/package",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TourPackage"],
    }),

    // Update a package card
    updatePackageCard: builder.mutation({
      query: ({ packageId, data }: { packageId: string; data: FormData }) => ({
        url: `/package/${packageId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { packageId }) => [
        { type: "PackageCard", id: packageId },
        "TourPackage",
      ],
    }),

    // Delete a package card
    deletePackageCard: builder.mutation({
      query: (packageId: string) => ({
        url: `/package/${packageId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, packageId) => [
        { type: "PackageCard", id: packageId },
        "TourPackage",
      ],
    }),
  }),
});

export const {
  useGetTourPackageQuery,
  useUpdateTitleSubtitleMutation,
  useAddPackageCardMutation,
  useUpdatePackageCardMutation,
  useDeletePackageCardMutation,
} = tourPackageApi;
