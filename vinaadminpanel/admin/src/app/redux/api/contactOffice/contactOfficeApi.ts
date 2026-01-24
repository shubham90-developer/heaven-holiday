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
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }: any) => ({
                type: "Office" as const,
                id: _id,
              })),
              { type: "Office", id: "LIST" },
            ]
          : [{ type: "Office", id: "LIST" }],
    }),

    getOfficeById: builder.query({
      query: (id: string) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Office", id }],
    }),

    createOffice: builder.mutation({
      query: (data: any) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Office", id: "LIST" }],
    }),

    updateOffice: builder.mutation({
      query: ({ id, ...data }: { id: string; [key: string]: any }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Office", id },
        { type: "Office", id: "LIST" },
      ],
    }),

    deleteOffice: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Office", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllOfficesQuery,
  useGetOfficeByIdQuery,
  useCreateOfficeMutation,
  useUpdateOfficeMutation,
  useDeleteOfficeMutation,
} = contactOfficeApi;
