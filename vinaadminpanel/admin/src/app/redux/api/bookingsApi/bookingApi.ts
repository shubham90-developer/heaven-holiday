// features/booking/bookingApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetUserBookingsParams {
  status?: string;
  page?: number;
  limit?: number;
}

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8080/v1/api/booking`,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["Booking", "BookingList"],
  endpoints: (builder) => ({
    getAllBookings: builder.query<any, void | GetUserBookingsParams>({
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

    deleteBooking: builder.mutation<any, string>({
      query: (bookingId) => ({
        url: `/admin/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BookingList"],
    }),
  }),
});

export const {
  // Admin hooks
  useGetAllBookingsQuery,
  useDeleteBookingMutation,
} = bookingApi;
