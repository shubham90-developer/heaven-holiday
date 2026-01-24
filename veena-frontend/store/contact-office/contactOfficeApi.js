import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactOfficeApi = createApi({
  reducerPath: "contactOfficeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/contact-office",
  }),
  tagTypes: ["Office"],
  endpoints: (builder) => ({
    getAllOffices: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useGetAllOfficesQuery } = contactOfficeApi;
