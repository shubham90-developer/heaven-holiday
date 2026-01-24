import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const termsConditionApi = createApi({
  reducerPath: "termsConditionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/terms-conditions",
  }),
  tagTypes: ["TermsCondition"],
  endpoints: (builder) => ({
    getTermsCondition: builder.query({
      query: () => "/",
      providesTags: ["TermsCondition"],
    }),
  }),
});

export const { useGetTermsConditionQuery } = termsConditionApi;
