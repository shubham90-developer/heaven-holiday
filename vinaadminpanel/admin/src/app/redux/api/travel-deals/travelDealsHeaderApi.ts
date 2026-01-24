// features/holidaySection/holidaySectionApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const holidaySectionApi = createApi({
  reducerPath: "holidaySectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/travel-deal-heading",
  }),
  tagTypes: ["HolidaySection"],
  endpoints: (builder) => ({
    // ================= GET HOLIDAY SECTION =================
    getHolidaySection: builder.query<any, void>({
      query: () => ({
        url: "/holiday-section",
        method: "GET",
      }),
      providesTags: ["HolidaySection"],
    }),

    // ================= UPDATE MAIN FIELDS =================
    updateMainFields: builder.mutation<any, any>({
      query: (data) => ({
        url: "/holiday-section/main-fields",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["HolidaySection"],
    }),

    // ================= ADD FEATURE =================
    addFeature: builder.mutation<any, any>({
      query: (data) => ({
        url: "/holiday-section/feature",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["HolidaySection"],
    }),

    // ================= UPDATE FEATURE =================
    updateFeature: builder.mutation<
      any,
      { id: string; title: string; description: string }
    >({
      query: ({ id, ...data }) => ({
        url: `/holiday-section/feature/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["HolidaySection"],
    }),

    // ================= DELETE FEATURE =================
    deleteFeature: builder.mutation<any, string>({
      query: (id) => ({
        url: `/holiday-section/feature/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HolidaySection"],
    }),

    // ================= LEGACY: UPDATE HOLIDAY SECTION (for backward compatibility) =================
    updateHolidaySection: builder.mutation<any, any>({
      query: (data) => ({
        url: "/holiday-section",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["HolidaySection"],
    }),
  }),
});

export const {
  useGetHolidaySectionQuery,
  useUpdateMainFieldsMutation,
  useAddFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
  useUpdateHolidaySectionMutation,
} = holidaySectionApi;
