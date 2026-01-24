// app/redux/api/howWeHireApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const howWeHireApi = createApi({
  reducerPath: "howWeHireApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/hiring-process",
  }),
  tagTypes: ["HowWeHire"],
  endpoints: (builder) => ({
    // GET HowWeHire document
    getHowWeHire: builder.query({
      query: () => "/",
      providesTags: ["HowWeHire"],
    }),

    // UPDATE heading / introText / subText
    updateHowWeHireInfo: builder.mutation({
      query: (data) => ({
        url: "/info",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["HowWeHire"],
    }),

    // ADD a step
    addHowWeHireStep: builder.mutation({
      query: (formData) => ({
        url: "/step",
        method: "POST",
        body: formData, // should be FormData if uploading images
      }),
      invalidatesTags: ["HowWeHire"],
    }),

    // UPDATE a step
    updateHowWeHireStep: builder.mutation({
      query: (formData) => ({
        url: "/step",
        method: "PUT",
        body: formData, // should be FormData if uploading images
      }),
      invalidatesTags: ["HowWeHire"],
    }),

    // DELETE a step
    deleteHowWeHireStep: builder.mutation({
      query: (data) => ({
        url: "/step",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["HowWeHire"],
    }),
  }),
});

// Export hooks
export const {
  useGetHowWeHireQuery,
  useUpdateHowWeHireInfoMutation,
  useAddHowWeHireStepMutation,
  useUpdateHowWeHireStepMutation,
  useDeleteHowWeHireStepMutation,
} = howWeHireApi;
