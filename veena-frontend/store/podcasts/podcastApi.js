import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const podcastsApi = createApi({
  reducerPath: "podcastsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/podcasts",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["Podcasts", "Episodes"],
  endpoints: (builder) => ({
    getPodcasts: builder.query({
      query: () => "/",
      providesTags: ["Podcasts"],
    }),
  }),
});

export const { useGetPodcastsQuery } = podcastsApi;
