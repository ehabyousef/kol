import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    blogger: JSON.parse(localStorage.getItem('blogger')) || null,
    token: localStorage.getItem('token') || null,
    updatedUser: null,
    status: "idle",
    updateStatus: "idle", // For updateUser status
    error: null,
    updateError: null, // For updateUser error
};

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async ({ token, email }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://92.113.26.138:8081/api/profile?email=${email}`,
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

export const fetchBlogger = createAsyncThunk(
    "user/fetchBlogger",
    async ({ token, email }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://92.113.26.138:8081/api/profile/bloger?email=${email}`,
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

export const updateUserPassword = createAsyncThunk(
    "user/updateUserPassword",
    async ({ token, userId, oldPassword, newPassword }, { rejectWithValue }) => {
        const formData = {
            userId,
            oldPassword,
            newPassword,
        };
        try {
            const response = await axios.put(
                `https://92.113.26.138:8081/api/profile?user_id=${userId}`, // Remove extra bracket here
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({ token, formData, id }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `https://92.113.26.138:8081/api/profile?user_id=${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
        setToken(state, action) {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        logoutUser(state) {
            state.user = null;
            state.blogger = null;
            state.token = null;
            state.updatedUser = null;
            state.status = "idle";
            state.updateStatus = "idle";
            state.error = null;
            state.updateError = null;
            localStorage.removeItem('user');
            localStorage.removeItem('blogger');
            localStorage.removeItem('token');
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
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            // Fetch Blogger
            .addCase(fetchBlogger.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBlogger.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.blogger = action.payload;
                state.error = null;
                localStorage.setItem('blogger', JSON.stringify(action.payload));
            })
            .addCase(fetchBlogger.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            // Update User
            .addCase(updateUser.pending, (state) => {
                state.updateStatus = "loading"; // Update user API is in progress
                state.updateError = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.updateStatus = "succeeded"; // Update was successful
                state.updatedUser = action.payload;
                state.updateError = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updateStatus = "failed"; // Update failed
                state.updateError = action.payload || action.error.message;
            })
            // Update password
            .addCase(updateUserPassword.pending, (state) => {
                state.updateError = null;
            })
            .addCase(updateUserPassword.fulfilled, (state, action) => {
                state.updatedUser = action.payload;
                state.updateError = null;
            })
            .addCase(updateUserPassword.rejected, (state, action) => {
                state.updateError = action.payload || action.error.message;
            });
    },
});

// Export actions
export const { setToken, logoutUser } = userSlice.actions;

// Selectors
export const getLoggedUser = (state) => state.user.user;
export const getLoggedBlogger = (state) => state.user.blogger;
export const getToken = (state) => state.user.token;
// In GetUser.js (redux slice)
export const getUserId = (state) => state.user.user ? state.user.user.id : null;
export const getBloggerId = (state) => state.user.blogger ? state.user.blogger.id : null;

export const userStatus = (state) => state.user.status;
export const userError = (state) => state.user.error;

// Selectors for updateUser status and error
export const updatingstatus = (state) => state.user.updateStatus;

export default userSlice.reducer;
