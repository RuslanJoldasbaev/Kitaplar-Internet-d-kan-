import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { $host, $userhost } from "../../api/axios";
import { ISiginIF, siginDataIF, loginDataIF ,IErrorData} from "./typelogin";

export const siginPost = createAsyncThunk("login/siginPost", async (data: siginDataIF, { rejectWithValue }) => {
    try {
        const responce = await $host.post("/api/register", data)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const loginPost = createAsyncThunk("login/loginPost", async (data: loginDataIF, { rejectWithValue }) => {
    try {
        const responce = await $host.post("/api/login", data)

        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const userGet = createAsyncThunk("login/userGet", async (_, { rejectWithValue }) => {
    try {
        const responce = await $userhost.get("/api/check")
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error )
    }
})

const loginSlice = createSlice({
    name: "login",
    initialState: {
        token: localStorage.getItem("token") ?? null,
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || '{}') as ISiginIF : null,
        loading: false,
        error: null as any
    },
    reducers: {
        logoAutReducers:(state)=>{
            state.token=null
            localStorage.clear()
        }
    },


    extraReducers: builder => {
        builder
            .addCase(siginPost.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(siginPost.fulfilled, (state, { payload }) => {
                state.loading = false
                state.user = payload.data.user
                localStorage.setItem("token", payload.data.token)
                localStorage.setItem("user", JSON.stringify(payload.data.user))
                state.token = payload.data.token
            })
            .addCase(siginPost.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
        builder
            .addCase(loginPost.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginPost.fulfilled, (state, { payload }) => {
                state.loading = false
                state.user = payload.data.user
                localStorage.setItem("token", payload.data.token)
                localStorage.setItem("user", JSON.stringify(payload.data.user))
                state.token = payload.data.token
            })
            .addCase(loginPost.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
        builder
            .addCase(userGet.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(userGet.fulfilled, (state, { payload }) => {
                state.user = payload.data
                state.loading = false
            })
            .addCase(userGet.rejected, (state, { payload }) => {
                state.error = payload
                state.loading = false
            })
    }
})

export const {logoAutReducers}=loginSlice.actions
export default loginSlice.reducer