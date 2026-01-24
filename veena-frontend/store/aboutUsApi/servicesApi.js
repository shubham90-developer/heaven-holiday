import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/v1/api/" }),
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => "/services",
    }),
  }),
});

export const { useGetAllServicesQuery } = servicesApi;
