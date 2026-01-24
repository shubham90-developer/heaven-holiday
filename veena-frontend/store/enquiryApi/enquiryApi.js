import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const enquiryApi = createApi({
  reducerPath: "enquiryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/enquiry",
  }),
  tagTypes: ["Enquiry"],
  endpoints: (builder) => ({
    createEnquiry: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Enquiry", id: "LIST" }],
    }),
  }),
});

export const { useCreateEnquiryMutation } = enquiryApi;
