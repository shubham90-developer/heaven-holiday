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

    updateFooterInfo: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["FooterInfo"],
    }),
  }),
});

export const {
  useGetFooterInfoQuery,

  useUpdateFooterInfoMutation,
} = footerInfoApi;
