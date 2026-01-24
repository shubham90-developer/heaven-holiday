// features/travelDealBanner/travelDealBannerApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const travelDealBannerApi = createApi({
  reducerPath: "travelDealBannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/travel-deal",
  }),
  tagTypes: ["TravelDealBanner"],
  endpoints: (builder) => ({
    getTravelDealBanner: builder.query({
      query: () => ({
        url: "/travel-deal-banner",
        method: "GET",
      }),
      providesTags: ["TravelDealBanner"],
    }),
  }),
});

export const { useGetTravelDealBannerQuery } = travelDealBannerApi;
