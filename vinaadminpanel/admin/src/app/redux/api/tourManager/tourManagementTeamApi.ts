import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tourManagerDirectoryApi = createApi({
  reducerPath: "tourManagerDirectoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/tour-manager-team",
  }),
  tagTypes: ["TourManagerDirectory", "Manager"],
  endpoints: (builder) => ({
    // Get tour manager directory (with optional search, letter, and status filter)
    getTourManagerDirectory: builder.query({
      query: (params?: {
        search?: string;
        letter?: string;
        status?: "active" | "inactive";
      }) => ({
        url: "/",
        params: params || {},
      }),
      providesTags: ["TourManagerDirectory"],
    }),

    // Update directory heading
    updateDirectoryHeading: builder.mutation({
      query: (data: { heading: string }) => ({
        url: "/heading",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["TourManagerDirectory"],
    }),

    // Add a manager
    addManager: builder.mutation({
      query: (data: FormData) => ({
        url: "/manager",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TourManagerDirectory"],
    }),

    // Update a manager
    updateManager: builder.mutation({
      query: ({ managerId, data }: { managerId: string; data: FormData }) => ({
        url: `/manager/${managerId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { managerId }) => [
        { type: "Manager", id: managerId },
        "TourManagerDirectory",
      ],
    }),

    // Delete a manager
    deleteManager: builder.mutation({
      query: (managerId: string) => ({
        url: `/manager/${managerId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, managerId) => [
        { type: "Manager", id: managerId },
        "TourManagerDirectory",
      ],
    }),
  }),
});

export const {
  useGetTourManagerDirectoryQuery,

  useUpdateDirectoryHeadingMutation,
  useAddManagerMutation,
  useUpdateManagerMutation,
  useDeleteManagerMutation,
} = tourManagerDirectoryApi;
