import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contractApi = createApi({
  reducerPath: "contractApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/contracts", // ✅ change if needed
    credentials: "include",
  }),

  tagTypes: ["Contracts"],

  endpoints: (builder) => ({
    /* ✅ GET ALL CONTRACTS */
    getAllContracts: builder.query({
      query: () => "/",

      providesTags: ["Contracts"],
    }),

    /* ✅ DELETE CONTRACT */
    deleteContract: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Contracts"],
    }),

    /* ✅ UPDATE STATUS */
    updateContractStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: "PATCH",
        body: { status },
      }),

      invalidatesTags: ["Contracts"],
    }),
  }),
});

/* ✅ EXPORT HOOKS */
export const {
  useGetAllContractsQuery,
  useDeleteContractMutation,
  useUpdateContractStatusMutation,
} = contractApi;


