import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const pageSlice=createSlice({
    name:"page",
    initialState:{
        page:1
    },
    reducers:{
        setPageReducers:(state,{payload}:PayloadAction<number>)=>{
            state.page=payload
        }
    }
})
export const {setPageReducers}=pageSlice.actions
export default pageSlice.reducer