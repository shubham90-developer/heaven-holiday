import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const onlineBookingApi = createApi({
  reducerPath: "onlineBookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/online-booking",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["OnlineBooking", "Steps"],
  endpoints: (builder) => ({
    // Get full online booking document
    getOnlineBooking: builder.query({
      query: () => "/",
      providesTags: ["OnlineBooking"],
    }),

    // Update title and description
    updateOnlineBooking: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["OnlineBooking"],
    }),

    // Create a new step
    createStep: builder.mutation({
      query: (formData) => ({
        url: "/steps",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["OnlineBooking", "Steps"],
    }),

    // Update a step
    updateStep: builder.mutation({
      query: ({ stepNo, formData }) => ({
        url: `/steps/${stepNo}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["OnlineBooking", "Steps"],
    }),

    // Delete a step
    deleteStep: builder.mutation({
      query: (stepNo) => ({
        url: `/steps/${stepNo}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OnlineBooking", "Steps"],
    }),
  }),
});

export const {
  useGetOnlineBookingQuery,
  useUpdateOnlineBookingMutation,
  useCreateStepMutation,
  useUpdateStepMutation,
  useDeleteStepMutation,
} = onlineBookingApi;
