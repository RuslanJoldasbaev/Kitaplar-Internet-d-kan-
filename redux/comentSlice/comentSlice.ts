import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { $host, $userhost } from "../../api/axios";
import { IComents, IComentInfo } from "./comentType";

export const comentsGet = createAsyncThunk("coments/comentsGet", async (id: string, { rejectWithValue }) => {
    try {
        const response = await $host.get<IComents>(`/api/comments/${id}`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const comentPost = createAsyncThunk("coments/comentPost", async (data: {
    comment: string,
    book_id: string|undefined,
    rating: string
}, { rejectWithValue }) => {
    try {
        const responce = await $userhost.post<{message: string}>("/api/review", data)
        
        if(responce.status===200){
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})


export const comentInfoGet = createAsyncThunk("coments/comentInfoGet", async (id: string, { rejectWithValue }) => {
    try {
        const responce = await $host.get<IComentInfo>(`/api/book_rating_click/${id}`)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

const comentSlice = createSlice({
    name: "coments",
    initialState: {
        coments: {} as IComents | undefined,
        comentsLoading: false,
        comentsError: null as any,

        infoComent: {} as IComentInfo | undefined,
        infoloading: false,
        infoError: null as any,

        postComent:"" as string|undefined,
        postLoading:false,
        postError:null as any
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(comentsGet.pending, (state) => {
                state.comentsLoading = true
                state.comentsError = null
            })
            .addCase(comentsGet.fulfilled, (state, { payload }) => {
                state.coments = payload
                state.comentsLoading = false
            })
            .addCase(comentsGet.rejected, (state, { payload }) => {
                state.comentsLoading = false
                state.comentsError = payload
            })

        builder
            .addCase(comentInfoGet.pending, (state) => {
                state.infoloading = true
                state.infoError = null
            })
            .addCase(comentInfoGet.fulfilled, (state, { payload }) => {
                state.infoComent = payload
                state.infoloading = false
            })
            .addCase(comentInfoGet.rejected, (state, { payload }) => {
                state.infoloading = false
                state.infoError = payload
            })
        builder
            .addCase(comentPost.pending,(state)=>{
                state.postComent=undefined
                state.postLoading=true
                state.postError=null
            })
            .addCase(comentPost.fulfilled,(state,{payload})=>{
                state.postComent=payload?.message
                state.postLoading=false
            })
            .addCase(comentPost.rejected,(state,{payload})=>{
                state.postLoading=false
                state.postError=payload
            })
    }
})

export default comentSlice.reducer