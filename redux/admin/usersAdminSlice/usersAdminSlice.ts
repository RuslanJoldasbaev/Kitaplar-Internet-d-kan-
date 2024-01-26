import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { $userhost } from "../../../api/axios";
import { IUsersAdmin, IAdminAdd } from "./typesUser";

export const allusersTotal = createAsyncThunk("usersAdmin/allusersTotal",async(_,{rejectWithValue})=>{
    try {
        const responce = await $userhost.get<IUsersAdmin>("/api/usersall")
        if(responce.status===200){
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const usersAdminGet = createAsyncThunk("usersAdmin/usersAdminGet", async (data:{limit: number,page:number}, { rejectWithValue }) => {
    try {
        const responce = await $userhost.get<IUsersAdmin>(`/api/usersall?limit=${data.limit}&page=${data.page}`)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const addAdminPost = createAsyncThunk("usersAdmin/addAdminPost", async (data: {
    user_id: number
}, { rejectWithValue }) => {
    try {
        const responce = await $userhost.post<IAdminAdd>("/api/admin", data)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const deleteAdminUser = createAsyncThunk("usersAdmin/deleteAdminUser", async (id: number, { rejectWithValue }) => {
    try {
        const responce = await $userhost.delete(`/api/admin/${id}`)
        console.log(responce)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

const usersAdmin = createSlice({
    name: "usersAdmin",
    initialState: {
        loading: false,
        error: null as any,
        users: {} as IUsersAdmin | undefined,

        adminPost: {} as IAdminAdd | undefined,
        adminPostLoading: false as boolean,
        adminPostError: null as any,

        deleteAdmin: {} as IAdminAdd | undefined,
        deleteLoading: false,
        deleteError: null as any,

        total:10 as number | undefined,
        totalLoading:false,
        totalError:null as any
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(usersAdminGet.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(usersAdminGet.fulfilled, (state, { payload }) => {
                state.users = payload
                state.loading = false
            })
            .addCase(usersAdminGet.rejected, (state, { payload }) => {
                state.error = payload
                state.loading = false
            })
        builder
            .addCase(addAdminPost.pending, (state) => {
                state.adminPostLoading = true
                state.adminPostError = null
                state.adminPost=undefined
            })
            .addCase(addAdminPost.fulfilled, (state, { payload }) => {
                state.adminPost = payload
                state.adminPostLoading = false
            })
            .addCase(addAdminPost.rejected, (state, { payload }) => {
                state.adminPostLoading = false
                state.adminPostError = payload
            })
        builder
            .addCase(deleteAdminUser.pending, (state) => {
                state.deleteLoading=true
                state.deleteError=null
                state.deleteAdmin=undefined
            })
            .addCase(deleteAdminUser.fulfilled, (state, { payload }) => {
                state.deleteAdmin=payload
                state.deleteLoading=false
            })
            .addCase(deleteAdminUser.rejected, (state, { payload }) => {
                state.deleteLoading=false
                state.deleteError=payload
            })
        builder
            .addCase(allusersTotal.pending,(state)=>{
                state.totalError=null
                state.totalLoading=true
            })
            .addCase(allusersTotal.fulfilled,(state,{payload})=>{
                state.total=payload?.total
                state.totalLoading=false
            })
            .addCase(allusersTotal.rejected,(state,{payload})=>{
                state.totalLoading=false
                state.totalError=payload
            })
    }
})

export default usersAdmin.reducer