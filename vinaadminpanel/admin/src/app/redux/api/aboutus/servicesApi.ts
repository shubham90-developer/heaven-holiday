import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/services",
  }),
  tagTypes: ["Services"],
  endpoints: (builder) => ({
    getAllMain: builder.query({
      query: () => "/",
      providesTags: ["Services"],
    }),
    createServices: builder.mutation({
      query: (data: FormData) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    // Update only main fields (title, subtitle)
    updateMainFields: builder.mutation({
      query: ({
        id,
        data,
      }: {
        id: string;
        data: { title?: string; subtitle?: string };
      }) => ({
        url: `/${id}/fields`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    // Update a specific item in the array
    updateMainItem: builder.mutation({
      query: ({
        id,
        itemIndex,
        data,
      }: {
        id: string;
        itemIndex: number;
        data: FormData;
      }) => ({
        url: `/${id}/items/${itemIndex}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    // Update entire items array
    updateMainItemsArray: builder.mutation({
      query: ({ id, data }: { id: string; data: FormData }) => ({
        url: `/${id}/items`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    deleteMain: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useGetAllMainQuery,
  useCreateServicesMutation,
  useUpdateMainFieldsMutation,
  useUpdateMainItemMutation,
  useUpdateMainItemsArrayMutation,
  useDeleteMainMutation,
} = servicesApi;
