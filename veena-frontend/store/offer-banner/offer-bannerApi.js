import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const offerBannerApi = createApi({
  reducerPath: "offerBannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/offer-banner",
  }),
  tagTypes: ["OfferBanner"],
  endpoints: (builder) => ({
    getOfferBanner: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["OfferBanner"],
    }),
  }),
});

export const { useGetOfferBannerQuery } = offerBannerApi;
