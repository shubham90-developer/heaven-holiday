// principleApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const principleApi = createApi({
  reducerPath: "principleApi",
  baseQuery: fetchBaseQuery({
    // Base URL points to the mounted router
    baseUrl: "http://localhost:8080/v1/api/principles/",
  }),
  tagTypes: ["Principle"],
  endpoints: (builder) => ({
    // GET /v1/api/principles/
    getPrinciple: builder.query({
      query: () => "/", // matches your router.get('/')
      providesTags: ["Principle"],
    }),

    // PUT /v1/api/principles/
    updateMainFields: builder.mutation({
      query: (data) => ({
        url: "/", // matches router.put('/')
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Principle"],
    }),

    // POST /v1/api/principles/details
    addDetail: builder.mutation({
      query: (data) => ({
        url: "details",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Principle"],
    }),

    // PUT /v1/api/principles/details/:id
    updateDetail: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `details/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Principle"],
    }),

    // DELETE /v1/api/principles/details/:id
    deleteDetail: builder.mutation({
      query: (id) => ({
        url: `details/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Principle"],
    }),
  }),
});

export const {
  useGetPrincipleQuery,
  useUpdateMainFieldsMutation,
  useAddDetailMutation,
  useUpdateDetailMutation,
  useDeleteDetailMutation,
} = principleApi;
