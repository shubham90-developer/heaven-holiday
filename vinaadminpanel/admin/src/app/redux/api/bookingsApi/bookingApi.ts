// features/booking/bookingApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8080/v1/api/booking`,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["Booking", "BookingList", "Refunds"],
  endpoints: (builder) => ({
    // Get all bookings
    getAllBookings: builder.query<any, any>({
      query: (params) => {
        const { status, page = 1, limit = 50 } = params || {};
        const urlParams = new URLSearchParams();
        if (status) urlParams.append("status", status);
        urlParams.append("page", page.toString());
        urlParams.append("limit", limit.toString());
        return `/admin/all?${urlParams.toString()}`;
      },
      providesTags: ["BookingList"],
    }),

    // Delete booking
    deleteBooking: builder.mutation<any, string>({
      query: (bookingId) => ({
        url: `/admin/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BookingList", "Refunds"],
    }),

    // Get all pending refunds
    getAllPendingRefunds: builder.query<any, any>({
      query: (params) => {
        const { status, page = 1, limit = 50 } = params || {};
        const urlParams = new URLSearchParams();
        if (status) urlParams.append("status", status);
        urlParams.append("page", page.toString());
        urlParams.append("limit", limit.toString());
        return `/admin/refunds/pending?${urlParams.toString()}`;
      },
      providesTags: ["Refunds"],
    }),

    // Update refund status
    updateRefundStatus: builder.mutation<any, any>({
      query: ({ bookingId, refundId, ...body }) => ({
        url: `/admin/refunds/${bookingId}/${refundId}/status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Refunds", "BookingList"],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useDeleteBookingMutation,
  useGetAllPendingRefundsQuery,
  useUpdateRefundStatusMutation,
} = bookingApi;
