import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const heroBannerApi = createApi({
  reducerPath: "heroBannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/hero-banner",
  }),
  tagTypes: ["HeroBanner"],
  endpoints: (builder) => ({
    getHeroBanner: builder.query<any, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["HeroBanner"],
    }),
    createHeroBanner: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["HeroBanner"],
    }),
    updateHeroBanner: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["HeroBanner"],
    }),
    deleteHeroBanner: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: "",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["HeroBanner"],
    }),
  }),
});

export const {
  useGetHeroBannerQuery,
  useCreateHeroBannerMutation,
  useUpdateHeroBannerMutation,
  useDeleteHeroBannerMutation,
} = heroBannerApi;
