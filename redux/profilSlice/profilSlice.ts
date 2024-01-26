import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { $userhost } from "../../api/axios";
import { IProfil, IGetProfil } from "./profilType";

export const profilGet = createAsyncThunk("profil/profilGet", async (_, { rejectWithValue }) => {
    try {
        const responce = await $userhost.get<IGetProfil>("/api/userabout")
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const profilImgPost = createAsyncThunk("profil/profilImgPost", async (image: any, { rejectWithValue }) => {
    try {
        const responce = await $userhost.post("/api/userimage", image)
        console.log(responce)
    } catch (error) {
        rejectWithValue(error)
    }
})

export const profilPut=createAsyncThunk("profil/profilPut",async(data:any,{rejectWithValue})=>{
    try {
        const responce = await $userhost.post("/api/user?_method=put",data)
        console.log(responce)
    } catch (error) {
        rejectWithValue(error)
    }
}) 
const profilSlice = createSlice({
    name: "profil",
    initialState: {
        user: {} as IProfil | undefined,
        loading: false,
        error: null as any
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(profilGet.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(profilGet.fulfilled, (state, { payload }) => {
                state.user = payload?.data
                state.loading = false
            })
            .addCase(profilGet.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
        builder
            .addCase(profilImgPost.pending, (state) => { })
            .addCase(profilImgPost.fulfilled, (state) => { })
            .addCase(profilImgPost.rejected, (state) => { })
        builder
        .addCase(profilPut.pending,(state)=>{})
        .addCase(profilPut.fulfilled,(state)=>{})
        .addCase(profilPut.rejected,(state)=>{})
    }
})

export default profilSlice.reducer