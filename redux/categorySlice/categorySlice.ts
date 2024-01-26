import { createSlice,PayloadAction ,createAsyncThunk} from "@reduxjs/toolkit";
import { $host } from "../../api/axios";
import { ICategory } from "./categoryType";

export const categoryGet=createAsyncThunk("category/categoryGet",async(limit:number|null,{rejectWithValue})=>{
    try {
        const responce = await $host.get<ICategory>(`/api/category?${limit?`limit=${limit}`:""}`)
        if(responce.status===200){
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

const categorySlice=createSlice({
    name:"category",
    initialState:{
        janr:null as number|null,

        category:{} as ICategory,
        error:null as null|any,
        loading:false,
    },
    reducers:{
        janrCategoryReducers(state,{payload}:PayloadAction<number>){
            state.janr=payload
        }
    },
    extraReducers:bulider=>{
        bulider
        .addCase(categoryGet.pending,(state)=>{
            state.error=null
            state.loading=true
        })
        .addCase(categoryGet.fulfilled,(state,{payload}:PayloadAction<ICategory|any>)=>{
            state.category=payload
            state.loading=false
        })
        .addCase(categoryGet.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
    }
})
export const {janrCategoryReducers}=categorySlice.actions
export default categorySlice.reducer