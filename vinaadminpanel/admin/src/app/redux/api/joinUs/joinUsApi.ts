// redux/api/joinUs/joinUsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const joinUsApi = createApi({
  reducerPath: "joinUsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/joinUs",
  }),
  tagTypes: ["JoinUs"],
  endpoints: (builder) => ({
    getContent: builder.query({
      query: () => "/",
      providesTags: ["JoinUs"],
    }),

    updateJoinUs: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["JoinUs"],

      async onQueryStarted(updateData, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          joinUsApi.util.updateQueryData("getContent", undefined, (draft) => {
            Object.assign(draft.data, updateData);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetContentQuery, useUpdateJoinUsMutation } = joinUsApi;
