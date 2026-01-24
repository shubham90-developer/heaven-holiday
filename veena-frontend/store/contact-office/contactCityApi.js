import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/contact-city",
  }),
  tagTypes: ["City"],
  endpoints: (builder) => ({
    getAllCities: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useGetAllCitiesQuery } = cityApi;
