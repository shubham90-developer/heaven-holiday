// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const contactOfficeApi = createApi({
//   reducerPath: "contactOfficeApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8080/v1/api/contact-office",
//   }),
//   tagTypes: ["Office"],
//   endpoints: (builder) => ({
//     getAllOffices: builder.query({
//       query: () => "/",
//     }),
//   }),
// });

// export const { useGetAllOfficesQuery } = contactOfficeApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactOfficeApi = createApi({
  reducerPath: "contactOfficeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/contact-office",
  }),
  tagTypes: ["Office"],

  endpoints: (builder) => ({

    // Get All Offices
    getAllOffices: builder.query({
      query: () => "/",
      providesTags: (result) =>
        result?.data
          ? [
            ...result.data.map((office) => ({
              type: "Office",
              id: office._id,
            })),
            { type: "Office", id: "LIST" },
          ]
          : [{ type: "Office", id: "LIST" }],
    }),

    // Get Office By ID
    getOfficeById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Office", id }],
    }),

  }),
});

export const {
  useGetAllOfficesQuery,
  useGetOfficeByIdQuery,
} = contactOfficeApi;
