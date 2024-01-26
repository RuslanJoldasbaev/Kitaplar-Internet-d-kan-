import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { $host } from "../../api/axios";
import { ISearchBook } from "./searchType";
export const searchBookGet = createAsyncThunk("searchBook/searchBookGet", async (data: {value: string,limit: number}, { rejectWithValue }) => {
    try {
        const responce = await $host.get<ISearchBook>(`/api/booksearch?search=${data.value}&limit=${data.limit}`)
        if(responce.status===200){
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})
const searchBookSlice = createSlice({
    name: "searchBook",
    initialState: {
        modal:false,
        books:{} as ISearchBook | undefined,
        loading:false,
        error:null as any
    },
    reducers: {
        searchModalReducers(state,{payload}:PayloadAction<boolean>){
            state.modal=payload
        }
    },
    extraReducers: builder => {
        builder
        .addCase(searchBookGet.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(searchBookGet.fulfilled,(state,{payload})=>{
            state.books=payload
            state.loading=false
        })
        .addCase(searchBookGet.rejected,(state,{payload})=>{
            state.error=payload
            state.loading=false
        })
    }
})

export const {searchModalReducers}=searchBookSlice.actions

export default searchBookSlice.reducer