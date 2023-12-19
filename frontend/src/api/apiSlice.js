import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    tagTypes: ['Employe', 'Composant', 'FondsDebit', 'Deduction', 'FondsCredit'],
    endpoints: (builder) => ({
        fetchData: builder.query({
            query: (modelName) => `/${modelName}`,
            providesTags: (result, error, modelName) => [{ type: modelName, id: 'LIST' }],
        }),
        createData: builder.mutation({
            query: ({ modelName, data }) => ({
                url: `/${modelName}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, { modelName }) => [{ type: modelName, id: 'LIST' }],
        }),
        updateData: builder.mutation({
            query: ({ modelName, id, data }) => ({
                url: `/${modelName}/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { modelName, id }) => [{ type: modelName, id }],
        }),
        deleteData: builder.mutation({
            query: ({ modelName, id }) => ({
                url: `/${modelName}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { modelName, id }) => [{ type: modelName, id }],
        }),
        copyScenarioData: builder.mutation({
            query: ({ id, data }) => ({
                url: `/scenarios/${id}/copy`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useFetchDataQuery,
    useCreateDataMutation,
    useUpdateDataMutation,
    useDeleteDataMutation,
} = apiSlice;
