// features/celebrate/celebrateApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const celebrateApi = createApi({
  reducerPath: "celebrateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/travel-deal-offer-banners",
  }),
  tagTypes: ["Celebrate"],
  endpoints: (builder) => ({
    // ================= GET CELEBRATE SECTION =================
    getCelebrate: builder.query<any, void>({
      query: () => ({
        url: "/celebrate",
        method: "GET",
      }),
      providesTags: ["Celebrate"],
    }),

    // ================= UPDATE MAIN FIELDS =================
    updateMainFields: builder.mutation<any, any>({
      query: (data) => ({
        url: "/celebrate/main-fields",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["Celebrate"],
    }),

    // ================= ADD SLIDE =================
    addSlide: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/celebrate/slide",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Celebrate"],
    }),

    // ================= UPDATE SLIDE =================
    updateSlide: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/celebrate/slide/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Celebrate"],
    }),

    // ================= DELETE SLIDE =================
    deleteSlide: builder.mutation<any, string>({
      query: (id) => ({
        url: `/celebrate/slide/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Celebrate"],
    }),
  }),
});

export const {
  useGetCelebrateQuery,
  useUpdateMainFieldsMutation,
  useAddSlideMutation,
  useUpdateSlideMutation,
  useDeleteSlideMutation,
} = celebrateApi;
