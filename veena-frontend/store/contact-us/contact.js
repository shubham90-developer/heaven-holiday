import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contractApi = createApi({
    reducerPath: "contractApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/v1/api/contact", // 👈 change to your backend URL
    }),

    endpoints: (builder) => ({
        createContract: builder.mutation({
            query: (body) => ({
                url: "/", // 👈 your POST route
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useCreateContractMutation } = contractApi;
