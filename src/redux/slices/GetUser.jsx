import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,  // Load from localStorage
    updatedUser: null,
    status: "idle",
    error: null,
};

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({ token, formData, id }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/profile?user_id=${id}`,
                formData,
                {
                    headers: {
                        token: `${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser(state) {
            state.user = null;
            state.updatedUser = null;
            state.status = "idle";
            state.error = null;
            localStorage.removeItem('user');  // Clear user data from localStorage on logout
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch User
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                state.error = null;
                localStorage.setItem('user', JSON.stringify(action.payload));  // Save user data to localStorage
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            // Update User
            .addCase(updateUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.updatedUser = action.payload;
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            });
    },
});

// Export actions
export const { logoutUser } = userSlice.actions;

// Selectors
export const getLoggoedUser = (state) => state.user.user;
export const userStatus = (state) => state.user.status;
export const userError = (state) => state.user.error;

export default userSlice.reducer;
