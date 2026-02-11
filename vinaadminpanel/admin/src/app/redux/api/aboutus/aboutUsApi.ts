import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aboutUsApi = createApi({
  reducerPath: "aboutUsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api",
    prepareHeaders: (headers) => {
      headers.delete("content-type");
      return headers;
    },
  }),
  tagTypes: ["AboutUs"],
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => "/aboutus",
      providesTags: ["AboutUs"],
    }),

    updateAboutUs: builder.mutation({
      query: (formData) => ({
        url: "/aboutus",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["AboutUs"],
    }),
  }),
});

export const { useGetAboutUsQuery, useUpdateAboutUsMutation } = aboutUsApi;
