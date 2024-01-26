import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { $userhost } from "../../../api/axios";
import { IUserType } from "./typeuser";

export const userGet=createAsyncThunk("userAdmin/userGet",async(_,{rejectWithValue})=>{
    try {
        const responce = await $userhost.get<IUserType>("/api/check")
        if(responce.status===200){
            return responce.data
        }
    } catch (error) {
        
    }
})
const userAdminSlice=createSlice({
    name:"userAdmin",
    initialState:{
        user:{} as IUserType|undefined,
        loading:false,
        error:null as any
    },
    reducers:{

    },
    extraReducers:builder=>{
        builder
        .addCase(userGet.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(userGet.fulfilled,(state,{payload})=>{
            state.user=payload
            state.loading=false
        })
        .addCase(userGet.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
    }
})


export default userAdminSlice.reducer