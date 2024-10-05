import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
const initialState = {
    category: {
        content: [],   // Assuming the API returns paginated content in a 'content' field
        search: [],
        totalPages: 0, // Assuming the API returns total pages
        totalElements: 0, // Assuming the API returns total elements
    },
    categories: [],
    loading: false,
    error: null,
    page: 0,
    size: 9
}
export const fetchCategory = createAsyncThunk(
    'bloggers/fetchCategory',
    async ({ category, page, size }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/category/${category}`, {
                params: {
                    page,
                    size
                }
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
// Create an async thunk to get categories
export const getAllCategories = createAsyncThunk(
    'category/getAllCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/categories`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk to search bloggers
export const search = createAsyncThunk(
    'category/search',
    async ({ keyword }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/bloger/search?keyword=${keyword}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setSize: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.loading = false
                state.category = action.payload
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Get categories
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get search
            .addCase(search.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(search.fulfilled, (state, action) => {
                state.loading = false;
                state.search = action.payload;
            })
            .addCase(search.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export const { setPtage, setSize } = categorySlice.actions
export const allCategories = (state) => state.Category.categories;
export const searchResult = (state) => state.Category.search;
export default categorySlice.reducer