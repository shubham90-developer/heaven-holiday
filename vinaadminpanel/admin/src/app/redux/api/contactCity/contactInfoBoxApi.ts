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

    // Create contact features document
    createContactFeatures: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ContactFeatures"],
    }),

    // Create feature
    createFeature: builder.mutation({
      query: (data) => ({
        url: "/feature",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ContactFeatures"],
    }),

    // Update feature
    updateFeature: builder.mutation({
      query: ({ featureId, ...data }) => ({
        url: `/feature/${featureId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ContactFeatures"],
    }),

    // Delete feature
    deleteFeature: builder.mutation({
      query: (featureId) => ({
        url: `/feature/${featureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ContactFeatures"],
    }),

    // Update highlight
    updateHighlight: builder.mutation({
      query: (data) => ({
        url: "/highlight",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ContactFeatures"],
    }),
  }),
});

export const {
  useGetContactFeaturesQuery,
  useCreateContactFeaturesMutation,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
  useUpdateHighlightMutation,
} = contactFeaturesApi;
