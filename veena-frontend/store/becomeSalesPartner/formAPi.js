import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const becomePartnerFormApi = createApi({
  reducerPath: "becomePartnerFormApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/become-partner-form",
  }),
  tagTypes: ["Form"],
  endpoints: (builder) => ({
    createForm: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Form"],
    }),
  }),
});

export const { useCreateFormMutation } = becomePartnerFormApi;
