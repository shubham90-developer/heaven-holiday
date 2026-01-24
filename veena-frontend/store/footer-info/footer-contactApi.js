// redux/api/contactUs/contactUsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const footerContactApi = createApi({
  reducerPath: "footerContactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/contact-us",
  }),
  tagTypes: ["ContactUs"],
  endpoints: (builder) => ({
    // GET - Fetch contact details
    getFooterContactApi: builder.query({
      query: () => "/",
      providesTags: ["ContactUs"],
    }),
  }),
});

export const { useGetFooterContactApiQuery } = footerContactApi;
