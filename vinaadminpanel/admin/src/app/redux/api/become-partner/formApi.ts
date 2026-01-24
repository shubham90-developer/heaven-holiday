import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const becomePartnerFormApi = createApi({
  reducerPath: "becomePartnerFormApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/become-partner-form",
  }),
  tagTypes: ["Form"],
  endpoints: (builder) => ({
    getAllForms: builder.query({
      query: () => "/",
      providesTags: ["Form"],
    }),

    updateFormStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Form"],
    }),
    deleteForm: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Form"],
    }),
  }),
});

export const {
  useGetAllFormsQuery,

  useUpdateFormStatusMutation,
  useDeleteFormMutation,
} = becomePartnerFormApi;
