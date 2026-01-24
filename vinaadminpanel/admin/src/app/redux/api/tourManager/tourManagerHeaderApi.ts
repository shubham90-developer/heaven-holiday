import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tourManagerApi = createApi({
  reducerPath: "tourManagerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/",
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: ["TourManager"],
  endpoints: (builder) => ({
    getTourManager: builder.query({
      query: () => "/tour-manager",
      providesTags: [{ type: "TourManager", id: "SINGLE" }],
    }),

    updateTourManager: builder.mutation({
      query: ({
        id,
        ...data
      }: {
        id: string;
        title?: string;
        subtitle?: string;
        description?: string;
      }) => ({
        url: `/tour-manager/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "TourManager", id: "SINGLE" }],
    }),
  }),
});

export const {
  useGetTourManagerQuery,

  useUpdateTourManagerMutation,
} = tourManagerApi;
