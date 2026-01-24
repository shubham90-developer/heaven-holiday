// features/visaInfo/visaInfoApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const visaInfoApi = createApi({
  reducerPath: "visaInfoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/visa-info",
  }),
  tagTypes: ["VisaInfo"],
  endpoints: (builder) => ({
    // ================= GET VISA INFO =================
    getVisaInfo: builder.query({
      query: () => ({
        url: "/visa-info",
        method: "GET",
      }),
      providesTags: ["VisaInfo"],
    }),
  }),
});

export const { useGetVisaInfoQuery } = visaInfoApi;
