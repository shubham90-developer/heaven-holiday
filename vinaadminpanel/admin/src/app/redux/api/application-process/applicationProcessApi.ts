import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicationApi = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/application-process",
  }),
  tagTypes: ["Application"],
  endpoints: (builder) => ({
    getAllApplications: builder.query({
      query: () => "/",
      providesTags: ["Application"],
    }),
    createApplication: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Application"],
    }),
    updateApplication: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Application"],
    }),
    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Application"],
    }),
  }),
});

export const {
  useGetAllApplicationsQuery,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
} = applicationApi;
