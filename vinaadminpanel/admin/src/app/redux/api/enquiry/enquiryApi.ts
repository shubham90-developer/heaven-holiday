import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const enquiryApi = createApi({
  reducerPath: "enquiryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/enquiry",
  }),
  tagTypes: ["Enquiry"],
  endpoints: (builder) => ({
    createEnquiry: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Enquiry"],
    }),

    getAllEnquiries: builder.query({
      query: () => "/",
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }: any) => ({
                type: "Enquiry" as const,
                id: _id,
              })),
              { type: "Enquiry", id: "LIST" },
            ]
          : [{ type: "Enquiry", id: "LIST" }],
    }),

    updateEnquiry: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Enquiry", id },
        { type: "Enquiry", id: "LIST" },
      ],
    }),

    deleteEnquiry: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Enquiry", id },
        { type: "Enquiry", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateEnquiryMutation,
  useGetAllEnquiriesQuery,
  useUpdateEnquiryMutation,
  useDeleteEnquiryMutation,
} = enquiryApi;
