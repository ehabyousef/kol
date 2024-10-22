import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
    favouriteBlogger: [],
    loading: false,
    error: null,
};

// Async thunk to get favorite bloggers
export const getFav = createAsyncThunk(
    'blogs/getFav',
    async ({ userID, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://92.113.26.138:8081/api/favorite?userId=${userID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Async thunk to add a blogger to favorites
// Async thunk to add a blogger to favorites
export const addToFav = createAsyncThunk(
    'blogs/addFav',
    async ({ userID, bloggerID, token }, { rejectWithValue }) => {
        try {
            await axios.post(
                `https://92.113.26.138:8081/api/favorite?userId=${userID}&blogerId=${bloggerID}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // Fetch the updated list of favorite bloggers
            const response = await axios.get(
                `https://92.113.26.138:8081/api/favorite?userId=${userID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);



// Async thunk to delete a blogger from favorites
export const deleteFav = createAsyncThunk(
    'blogs/deleteFav',
    async ({ userID, bloggerID, token }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `https://92.113.26.138:8081/api/favorite?userId=${userID}&blogerId=${bloggerID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return { bloggerID };
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const favouriteSlice = createSlice({
    name: 'favs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add to favorite cases
            .addCase(addToFav.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToFav.fulfilled, (state, action) => {
                state.loading = false;
                state.favouriteBlogger = action.payload
                state.error = null;
                console.log(action.payload);
            })
            .addCase(addToFav.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to add blogger to favorites';
            })
            // Get favorite bloggers cases
            .addCase(getFav.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFav.fulfilled, (state, action) => {
                state.loading = false;
                state.favouriteBlogger = action.payload;
                state.error = null;
            })
            .addCase(getFav.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch favorite bloggers';
            })
            // Delete favorite blogger cases
            .addCase(deleteFav.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFav.fulfilled, (state, action) => {
                state.loading = false;
                state.favouriteBlogger = state.favouriteBlogger.filter(
                    (blogger) => blogger.id !== action.payload.bloggerID
                );
                state.error = null;
            })
            .addCase(deleteFav.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete blogger from favorites';
            });
    },
});
export const getFavous = (state) => state.fav.favouriteBlogger;
export default favouriteSlice.reducer;
