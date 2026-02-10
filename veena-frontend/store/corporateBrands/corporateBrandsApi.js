import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandsFetchApi = createApi({
    reducerPath: "brandsFetchApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/v1/api/brands",
    }),
    endpoints: (builder) => ({
        /**
         * FETCH BRANDS DATA
         */
        getBrands: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetBrandsQuery } = brandsFetchApi;
