// features/booking/bookingApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8080/v1/api/booking`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Booking", "BookingList"],
  endpoints: (builder) => ({
    // Create a new booking
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["BookingList"],
    }),

    // Get all user bookings
    getUserBookings: builder.query({
      query: ({ status, page = 1, limit = 10 } = {}) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        return `/?${params.toString()}`;
      },
      providesTags: ["BookingList"],
    }),

    // Get booking by ID
    getBookingById: builder.query({
      query: (bookingId) => `/${bookingId}`,
      providesTags: (result, error, bookingId) => [
        { type: "Booking", id: bookingId },
      ],
    }),

    // Get booking summary
    getBookingSummary: builder.query({
      query: (bookingId) => `/${bookingId}/summary`,
      providesTags: (result, error, bookingId) => [
        { type: "Booking", id: `${bookingId}-summary` },
      ],
    }),

    // Add payment to booking (existing - for manual payments)
    addPayment: builder.mutation({
      query: ({ bookingId, paymentData }) => ({
        url: `/${bookingId}/payment`,
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: (result, error, { bookingId }) => [
        { type: "Booking", id: bookingId },
        "BookingList",
      ],
    }),

    createPaymentOrder: builder.mutation({
      query: ({ bookingId, amount }) => ({
        url: `/${bookingId}/create-payment-order`,
        method: "POST",
        body: { amount },
      }),
    }),

    verifyPayment: builder.mutation({
      query: ({ bookingId, paymentData }) => ({
        url: `/${bookingId}/verify-payment`,
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: (result, error, { bookingId }) => [
        { type: "Booking", id: bookingId },
        { type: "Booking", id: `${bookingId}-summary` },
        "BookingList",
      ],
    }),

    handlePaymentFailure: builder.mutation({
      query: ({ bookingId, failureData }) => ({
        url: `/${bookingId}/payment-failure`,
        method: "POST",
        body: failureData,
      }),
      invalidatesTags: (result, error, { bookingId }) => [
        { type: "Booking", id: bookingId },
      ],
    }),

    updateBookingTravelers: builder.mutation({
      query: ({ bookingId, travelers }) => ({
        url: `/${bookingId}/travelers`,
        method: "PATCH",
        body: { travelers },
      }),
      invalidatesTags: (result, error, { bookingId }) => [
        { type: "Booking", id: bookingId },
        { type: "Booking", id: `${bookingId}-summary` },
        "BookingList",
      ],
    }),

    cancelBooking: builder.mutation({
      query: ({ bookingId, reason, cancellationComments }) => ({
        url: `/${bookingId}/cancel`,
        method: "PATCH",
        body: { reason, cancellationComments },
      }),
      invalidatesTags: (result, error, { bookingId }) => [
        { type: "Booking", id: bookingId },
        "BookingList",
      ],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetUserBookingsQuery,
  useGetBookingByIdQuery,
  useGetBookingSummaryQuery,
  useAddPaymentMutation,
  useUpdateBookingTravelersMutation,
  useCancelBookingMutation,
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
  useHandlePaymentFailureMutation,
} = bookingApi;
