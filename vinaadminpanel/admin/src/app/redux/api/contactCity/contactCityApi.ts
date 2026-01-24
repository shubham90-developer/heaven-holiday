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
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }: any) => ({
                type: "City" as const,
                id: _id,
              })),
              { type: "City", id: "LIST" },
            ]
          : [{ type: "City", id: "LIST" }],
    }),

    createCity: builder.mutation({
      query: (data: FormData) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "City", id: "LIST" }],
    }),

    updateCity: builder.mutation({
      query: ({ id, data }: { id: string; data: FormData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "City", id },
        { type: "City", id: "LIST" },
      ],
    }),

    deleteCity: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "City", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllCitiesQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
} = cityApi;
