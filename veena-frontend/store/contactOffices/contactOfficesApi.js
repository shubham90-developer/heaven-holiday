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
              ...result.data.map((_id) => ({
                type: "Office",
                id: _id,
              })),
              { type: "Office", id: "LIST" },
            ]
          : [{ type: "Office", id: "LIST" }],
    }),
  }),
});

export const { useGetAllOfficesQuery } = contactOfficeApi;
