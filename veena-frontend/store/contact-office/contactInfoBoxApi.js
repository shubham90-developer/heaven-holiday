// redux/api/contactfeatures/contactFeaturesApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactFeaturesApi = createApi({
  reducerPath: "contactFeaturesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/contact-info-box",
  }),
  tagTypes: ["ContactFeatures"],
  endpoints: (builder) => ({
    // Get contact features
    getContactFeatures: builder.query({
      query: () => "/",
      providesTags: ["ContactFeatures"],
    }),
  }),
});

export const { useGetContactFeaturesQuery } = contactFeaturesApi;
