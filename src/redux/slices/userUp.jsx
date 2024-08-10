import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const UserUP = createAsyncThunk(
    "auth/register",
    async (userData) => {
        try {
            const response = await axios.post("http://localhost:8080/api/signup/user", userData)
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

const signupUserSlice = createSlice({
    name: "signupUser",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(UserUP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UserUP.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                console.log(action.payload);
            })
            .addCase(UserUP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default signupUserSlice.reducer;