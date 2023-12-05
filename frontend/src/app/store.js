import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        // ... other reducers ...
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    // ... other middleware ...
});
