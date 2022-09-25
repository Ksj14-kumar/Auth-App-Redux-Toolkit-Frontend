import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register, logout, Login } from "../API/Register"
const registration = createAsyncThunk("auth/slice", async (data, thunkAPI) => {
    try {
        const res = await register(data)
        return res;
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})
const LoginAsyn = createAsyncThunk("auth/login", async (user, ThunkAPI) => {
    try {
        return await Login(user)
    } catch (err) {
        return ThunkAPI.rejectWithValue(err)
    }
})
const Logout = createAsyncThunk("auth/logout", async (v, thunkAPI) => {
    try {
        // const res = await 
        const res = await logout()
        return res;
    } catch (err) {
        const message = err.response.data.message || err.code
        return thunkAPI.rejectWithValue(message)
    }
})
const userAccessToken = localStorage.getItem("access_token")
const enroll = localStorage.getItem("enroll")
const initValue = {
    user: userAccessToken ? userAccessToken : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    id: enroll ? enroll : null
}
const AuthSlice = createSlice({
    name: "Auth",
    initialState: initValue,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registration.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(registration.fulfilled, (state, { payload }) => {
                state.isError = false
                state.isSuccess = true
                state.isLoading = false
                // state.user = payload
            })
            .addCase(registration.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.isSuccess = false
                state.user = null
                state.message = action.payload.response.data.message || action.payload.code
            }).
            addCase(LoginAsyn.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(LoginAsyn.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload.response?.data?.message || action.payload.code || action.error.message
            })
            .addCase(LoginAsyn.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(Logout.fulfilled, (state, action) => {
                state.user = null
            })
    }
})
export const { reset } = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer
export { registration, Logout, LoginAsyn }