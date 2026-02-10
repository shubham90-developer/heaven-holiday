import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const generalSettingsApi = createApi({
  reducerPath: 'generalSettingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/v1/api/general-settings',
    credentials: 'include',
  }),
  tagTypes: ['GeneralSettings'],
  endpoints: (builder) => ({
    // GET general settings
    getGeneralSettings: builder.query<any, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['GeneralSettings'],
    }),

    // UPDATE general settings (text + files)
    updateGeneralSettings: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['GeneralSettings'],
    }),
  }),
})

export const {
  useGetGeneralSettingsQuery,
  useUpdateGeneralSettingsMutation,
} = generalSettingsApi
