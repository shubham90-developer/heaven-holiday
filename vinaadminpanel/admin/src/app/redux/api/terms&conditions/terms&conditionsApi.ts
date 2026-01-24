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
    updateTermsCondition: builder.mutation({
      query: (content) => ({
        url: "/",
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: ["TermsCondition"],
    }),
  }),
});

export const { useGetTermsConditionQuery, useUpdateTermsConditionMutation } =
  termsConditionApi;
