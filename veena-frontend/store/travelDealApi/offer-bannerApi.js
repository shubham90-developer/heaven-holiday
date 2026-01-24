// features/celebrate/celebrateApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const celebrateApi = createApi({
  reducerPath: "celebrateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/travel-deal-offer-banners",
  }),
  tagTypes: ["Celebrate"],
  endpoints: (builder) => ({
    // ================= GET CELEBRATE SECTION =================
    getCelebrate: builder.query({
      query: () => ({
        url: "/celebrate",
        method: "GET",
      }),
      providesTags: ["Celebrate"],
    }),
  }),
});

export const { useGetCelebrateQuery } = celebrateApi;
