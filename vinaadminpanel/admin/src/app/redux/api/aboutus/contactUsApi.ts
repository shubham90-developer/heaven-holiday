// redux/api/contactUs/contactUsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactUsApi = createApi({
  reducerPath: "contactUsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/contact-us", // Adjust your base URL
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["ContactUs"],
  endpoints: (builder) => ({
    // GET - Fetch contact details
    getContactDetails: builder.query({
      query: () => "/",
      providesTags: ["ContactUs"],
    }),

    // PUT - Full update/create contact details
    updateContactDetails: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ContactUs"],
    }),

    // PATCH - Partial update contact details
    patchContactDetails: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ContactUs"],
    }),
  }),
});

export const {
  useGetContactDetailsQuery,
  useUpdateContactDetailsMutation,
  usePatchContactDetailsMutation,
} = contactUsApi;
