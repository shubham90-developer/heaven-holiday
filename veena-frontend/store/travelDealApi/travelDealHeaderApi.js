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
    getHolidaySection: builder.query({
      query: () => ({
        url: "/holiday-section",
        method: "GET",
      }),
      providesTags: ["HolidaySection"],
    }),
  }),
});

export const { useGetHolidaySectionQuery } = holidaySectionApi;
