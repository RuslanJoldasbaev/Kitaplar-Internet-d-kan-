import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { $userhost } from "../../../api/axios";
import { IBooksDash ,IUsersDash} from "./book.inetrface";
export const DashBooksGet=createAsyncThunk("dashboardSlice/newBooksGet",async(data:number,{rejectWithValue})=>{
    try {
        const responce = await $userhost.get<IBooksDash>(`/api/new_book?${data?`limit=${data}`:""}`)
        if(responce.status===200){
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const dashboardUserGet=createAsyncThunk("dashboardSlice/dashboardUserGet",async(limit:number,{rejectWithValue})=>{
    try {
        const responce = await $userhost.get<IUsersDash>(`/api/usersall?${limit?`limit=${limit}`:""}`)
        if(responce.status===200){
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

const dashboardSlice=createSlice({
    name:"dashboardSlice",
    initialState:{
        newBooks:{} as IBooksDash | undefined,
        loading:false,
        error:null as any,
        userloading:false,
        userError:null as any,
        users:{} as IUsersDash|undefined,


        category:1 as number,
    },
    reducers:{
        categoryReducers(state,{payload}:PayloadAction<number>){
            state.category=payload
        }
    },
    extraReducers:builder=>{
        builder
        .addCase(DashBooksGet.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(DashBooksGet.fulfilled,(state,{payload})=>{
            state.loading=false
            state.newBooks=payload
        })
        .addCase(DashBooksGet.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
        builder 
        .addCase(dashboardUserGet.pending,(state)=>{
            state.userloading=true
            state.userError=null
        })
        .addCase(dashboardUserGet.fulfilled,(state,{payload})=>{
            state.users=payload
            state.userloading=false
        })
        .addCase(dashboardUserGet.rejected,(state,{payload})=>{
            state.userloading=false
            state.userError=payload
        })
    }
})

export const {categoryReducers}=dashboardSlice.actions
export default dashboardSlice.reducer