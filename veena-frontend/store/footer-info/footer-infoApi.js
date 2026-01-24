import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const footerInfoApi = createApi({
  reducerPath: "footerInfoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/footer-info",
  }),
  tagTypes: ["FooterInfo"],
  endpoints: (builder) => ({
    getFooterInfo: builder.query({
      query: () => "/",
      providesTags: ["FooterInfo"],
    }),
  }),
});

export const { useGetFooterInfoQuery } = footerInfoApi;
