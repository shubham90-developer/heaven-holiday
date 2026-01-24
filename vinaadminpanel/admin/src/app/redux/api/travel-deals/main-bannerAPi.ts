// features/travelDealBanner/travelDealBannerApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const travelDealBannerApi = createApi({
  reducerPath: "travelDealBannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/travel-deal",
  }),
  tagTypes: ["TravelDealBanner"],
  endpoints: (builder) => ({
    // ================= GET TRAVEL DEAL BANNER =================
    getTravelDealBanner: builder.query<any, void>({
      query: () => ({
        url: "/travel-deal-banner",
        method: "GET",
      }),
      providesTags: ["TravelDealBanner"],
    }),

    // ================= UPDATE TRAVEL DEAL BANNER =================
    updateTravelDealBanner: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/travel-deal-banner",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["TravelDealBanner"],
    }),
  }),
});

export const {
  useGetTravelDealBannerQuery,
  useUpdateTravelDealBannerMutation,
} = travelDealBannerApi;
