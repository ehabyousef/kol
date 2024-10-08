import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    requested: [],
    accepted: [],
    rejected: [],
    bloggerRequest: [],
    paid: [],
    live: [],
    liveBlogger: [],
    done: [],
    doneBlogger: [],
    bloggerRject: [],
    loading: false,
    error: null,
};

// Create an async thunk to fetch requested to client
export const requested = createAsyncThunk(
    'campagins/requested',
    async ({ TheToken, id }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/user/requested-campaign?userId=${id}`, {
                headers: {
                    Authorization: `Bearer ${TheToken}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk to fetch Accept to client
export const Accept = createAsyncThunk(
    'campagins/Accept',
    async ({ TheToken, id }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/user/Accepted-campaign?userId=${id}`, {
                headers: {
                    Authorization: `Bearer ${TheToken}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk to fetch Reject client
export const Reject = createAsyncThunk(
    'campagins/Reject',
    async ({ TheToken, id }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/user/rejected-campaign?userId=${id}`, {
                headers: {
                    Authorization: `Bearer ${TheToken}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// start blogger cycle
// Create an async thunk to fetch requested to blogger
export const bloggerRequested = createAsyncThunk(
    'campagins/bloggerRequested',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/bloger/requested-campaign?blogerId=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk to fetch response to admin
export const bloggerResponse = createAsyncThunk(
    'campagins/bloggerResponse',
    async ({ id, Res, content, TheToken }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `http://92.113.26.138:8081/api/campaign/response/to-admin`,
                null, // Body is null because we are sending the parameters via query string
                {
                    params: { // Parameters to send in query string
                        campaignId: id,
                        blogerResponse: Res,
                        content: content,
                    },
                    headers: {
                        Authorization: `Bearer ${TheToken}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk to fetch Accept to blogger
export const bloggerPaid = createAsyncThunk(
    'campagins/bloggerPaid',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/bloger/paid-campaign?blogerId=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk to fetch reject to blogger
export const bloggerReject = createAsyncThunk(
    'campagins/bloggerReject',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/bloger/rejected-campaign?blogerId=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk to fetch reject to blogger
export const bloggerCompeleteAdmin = createAsyncThunk(
    'campagins/bloggerCompeleteAdmin',
    async ({ TheToken, Body }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://92.113.26.138:8081/api/campaign/complete/to-admin`, Body, {
                headers: {
                    Authorization: `Bearer ${TheToken}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk to fetch live campagin
export const userLiveCampagin = createAsyncThunk(
    'campagins/userLiveCampagin',
    async ({ TheToken, id }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/user/live-campaign?userId=${id}`, {
                headers: {
                    Authorization: `Bearer ${TheToken}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk to fetch blooger live campagin
export const bloggerLiveCampagin = createAsyncThunk(
    'campagins/bloggerLiveCampagin',
    async ({ TheToken, id }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/bloger/live-campaign?blogerId=${id}`, {
                headers: {
                    Authorization: `Bearer ${TheToken}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk to fetch done campagin
export const userDoneCampagin = createAsyncThunk(
    'campagins/userDoneCampagin',
    async ({ TheToken, id }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/user/done-campaign?userId=${id}`, {
                headers: {
                    Authorization: `Bearer ${TheToken}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk to fetch blooger done campagin
export const bloggerDoneCampagin = createAsyncThunk(
    'campagins/bloggerDoneCampagin',
    async ({ TheToken, id }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/bloger/done-campaign?blogerId=${id}`, {
                headers: {
                    Authorization: `Bearer ${TheToken}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create the slice
const campaginsSlice = createSlice({
    name: 'campagins',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get requested
            .addCase(requested.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(requested.fulfilled, (state, action) => {
                state.loading = false;
                state.requested = action.payload;
            })
            .addCase(requested.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get Accepted
            .addCase(Accept.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(Accept.fulfilled, (state, action) => {
                state.loading = false;
                state.accepted = action.payload;
            })
            .addCase(Accept.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get rejected
            .addCase(Reject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(Reject.fulfilled, (state, action) => {
                state.loading = false;
                state.rejected = action.payload;
            })
            .addCase(Reject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // start blogger cycle 
            // Get rejected
            .addCase(bloggerRequested.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bloggerRequested.fulfilled, (state, action) => {
                state.loading = false;
                state.bloggerRequest = action.payload;
            })
            .addCase(bloggerRequested.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // post bloggerResponse
            .addCase(bloggerResponse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bloggerResponse.fulfilled, (state, action) => {
                state.loading = false;
                state.bloggerRequest = action.payload;
            })
            .addCase(bloggerResponse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // get paid
            .addCase(bloggerPaid.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bloggerPaid.fulfilled, (state, action) => {
                state.loading = false;
                state.paid = action.payload;
            })
            .addCase(bloggerPaid.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // get user live
            .addCase(userLiveCampagin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLiveCampagin.fulfilled, (state, action) => {
                state.loading = false;
                state.live = action.payload;
            })
            .addCase(userLiveCampagin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // get blogger live
            .addCase(bloggerLiveCampagin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bloggerLiveCampagin.fulfilled, (state, action) => {
                state.loading = false;
                state.liveBlogger = action.payload;
            })
            .addCase(bloggerLiveCampagin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // get user done
            .addCase(userDoneCampagin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userDoneCampagin.fulfilled, (state, action) => {
                state.loading = false;
                state.done = action.payload;
            })
            .addCase(userDoneCampagin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // get blogger done
            .addCase(bloggerDoneCampagin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bloggerDoneCampagin.fulfilled, (state, action) => {
                state.loading = false;
                state.doneBlogger = action.payload;
            })
            .addCase(bloggerDoneCampagin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // get bloggerReject
            .addCase(bloggerReject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bloggerReject.fulfilled, (state, action) => {
                state.loading = false;
                state.bloggerRject = action.payload;
            })
            .addCase(bloggerReject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // post compelete
            .addCase(bloggerCompeleteAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bloggerCompeleteAdmin.fulfilled, (state, action) => {
                state.loading = false;
                // state.bloggerRject = action.payload;
            })
            .addCase(bloggerCompeleteAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

// Export the reducer and selector
export const requestedCampagins = (state) => state.campagin.requested
export const acceptedCampagins = (state) => state.campagin.accepted
export const rejectedCampagins = (state) => state.campagin.rejected
export const requestedBloggerCampagins = (state) => state.campagin.bloggerRequest
export const paidBloggerCampagins = (state) => state.campagin.paid
export const rejectBloggerCampagins = (state) => state.campagin.bloggerRject
export const userLiveCampagins = (state) => state.campagin.live
export const bloggerLiveCampagins = (state) => state.campagin.liveBlogger
export const userDoneCampagins = (state) => state.campagin.done
export const bloggerDoneCampagins = (state) => state.campagin.doneBlogger
export default campaginsSlice.reducer;
