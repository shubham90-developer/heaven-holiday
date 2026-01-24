// features/department/departmentApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/careers-department",
  }),
  tagTypes: ["Department"],
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: (isActive) =>
        isActive !== undefined ? `/?isActive=${isActive}` : "/department",
      providesTags: ["Department"],
    }),
  }),
});

export const { useGetDepartmentsQuery } = departmentApi;

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/careers-location",
  }),
  tagTypes: ["Location"],
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: (isActive) =>
        isActive !== undefined ? `/?isActive=${isActive}` : "/location",
      providesTags: ["Location"],
    }),
  }),
});

export const { useGetLocationsQuery } = locationApi;

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/careers-jobs",
  }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getJobPage: builder.query({
      query: () => "/job/page",
      providesTags: ["Jobs"],
    }),
  }),
});

export const { useGetJobPageQuery } = jobsApi;
