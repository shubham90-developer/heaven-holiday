import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tourPackageApi = createApi({
  reducerPath: "tourPackageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/tour-package",
  }),
  tagTypes: ["TourPackage", "Category"],

  endpoints: (builder) => ({
    getTourPackage: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, String(value));
            }
          });
        }

        return `/tour-package-cards${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`;
      },
      providesTags: ["TourPackage"],
    }),

    getCategories: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, String(value));
            }
          });
        }

        return `/categories${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`;
      },
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetTourPackageQuery, useGetCategoriesQuery } = tourPackageApi;
