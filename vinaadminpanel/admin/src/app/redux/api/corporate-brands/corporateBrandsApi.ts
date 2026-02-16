import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const corporateBrandsApi = createApi({
  reducerPath: "corporateBrandsApi", // ✅ FIXED
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/brands",
  }),
  tagTypes: ["Brands"],
  endpoints: (builder) => ({
    /* ================= CREATE ================= */
    createBrandsSection: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData, // FormData
      }),
      invalidatesTags: [{ type: "Brands", id: "LIST" }],
    }),

    /* ================= GET ALL ================= */
    getAllBrandsSections: builder.query<any, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: (result) =>
        result?.data
          ? [
            ...result.data.map((item: any) => ({
              type: "Brands" as const,
              id: item._id,
            })),
            { type: "Brands", id: "LIST" },
          ]
          : [{ type: "Brands", id: "LIST" }],
    }),

    /* ================= UPDATE ================= */
    updateBrandsSection: builder.mutation<
      any,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData, // FormData for update too
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Brands", id },
        { type: "Brands", id: "LIST" },
      ],
    }),

    /* ================= DELETE ================= */
    deleteBrandsSection: builder.mutation<any, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Brands", id },
        { type: "Brands", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateBrandsSectionMutation,
  useGetAllBrandsSectionsQuery,
  useUpdateBrandsSectionMutation,
  useDeleteBrandsSectionMutation,
} = corporateBrandsApi;


