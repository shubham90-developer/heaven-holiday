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
    createDepartment: builder.mutation({
      query: (body) => ({
        url: "/department",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Department"],
    }),
    updateDepartment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/department/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/department/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
    toggleDepartmentStatus: builder.mutation({
      query: (id) => ({
        url: `/department/${id}/toggle-status`,
        method: "PATCH",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useToggleDepartmentStatusMutation,
} = departmentApi;

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
    createLocation: builder.mutation({
      query: (body) => ({
        url: "/location",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Location"],
    }),
    updateLocation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/location/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Location"],
    }),
    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `/location/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Location"],
    }),
    toggleLocationStatus: builder.mutation({
      query: (id) => ({
        url: `/location/${id}/toggle-status`,
        method: "PATCH",
      }),
      invalidatesTags: ["Location"],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
  useToggleLocationStatusMutation,
} = locationApi;

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
    updateJobPageHeader: builder.mutation({
      query: (body) => ({
        url: "/job/page/header",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),
    getJobItems: builder.query({
      query: () => "/job/items",
      providesTags: ["Jobs"],
    }),
    createJobItem: builder.mutation({
      query: (body) => ({
        url: "/job/items",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),
    updateJobItem: builder.mutation({
      query: ({ jobId, data }) => ({
        url: `/job/items/${jobId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    deleteJobItem: builder.mutation({
      query: (jobId) => ({
        url: `/job/items/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
    updateJobItemStatus: builder.mutation({
      query: ({ jobId, status }) => ({
        url: `/job/items/${jobId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const {
  useGetJobPageQuery,
  useUpdateJobPageHeaderMutation,
  useGetJobItemsQuery,
  useCreateJobItemMutation,
  useUpdateJobItemMutation,
  useDeleteJobItemMutation,
  useUpdateJobItemStatusMutation,
} = jobsApi;
