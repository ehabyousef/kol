import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
    blogs: {
        content: [],   // Assuming the API returns paginated content in a 'content' field
        totalPages: 0, // Assuming the API returns total pages
        totalElements: 0, // Assuming the API returns total elements
    },
    loading: false,
    error: null,
    page: 0,          // Page numbers typically start from 1
    size: 9,
};

// Create an async thunk to fetch blogs
export const fetchBlogs = createAsyncThunk(
    'blogs/fetchBlogs',
    async ({ page = 0, size = 9 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/bloger?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Create the slice
const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        // Reducer to set the current page
        setPage: (state, action) => {
            state.page = action.payload;
        },
        // Reducer to set the page size
        setSize: (state, action) => {
            state.size = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload; // Assuming the payload has the full data structure
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch blogs';
            });
    },
});

// Export the actions
export const { setPage, setSize } = blogSlice.actions;

// Export the reducer
export default blogSlice.reducer;
