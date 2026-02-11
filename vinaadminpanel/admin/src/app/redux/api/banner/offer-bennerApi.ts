import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const offerBannerApi = createApi({
  reducerPath: "offerBannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/offer-banner",
  }),
  tagTypes: ["OfferBanner"],
  endpoints: (builder) => ({
    getOfferBanner: builder.query<any, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["OfferBanner"],
    }),
    createOfferBanner: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["OfferBanner"],
    }),
    updateOfferBanner: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["OfferBanner"],
    }),
    deleteOfferBanner: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: "/",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["OfferBanner"],
    }),
  }),
});

export const {
  useGetOfferBannerQuery,
  useCreateOfferBannerMutation,
  useUpdateOfferBannerMutation,
  useDeleteOfferBannerMutation,
} = offerBannerApi;
