// redux/api/contactUs/contactUsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactUsApi = createApi({
  reducerPath: "contactUsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/contact-us",
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
  }),
});

export const { useGetContactDetailsQuery } = contactUsApi;
