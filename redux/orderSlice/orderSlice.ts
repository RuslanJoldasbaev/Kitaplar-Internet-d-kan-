import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { $userhost } from "../../api/axios";
import { IPostOrder } from "./order.types";

export const orderOnePost=createAsyncThunk("order/orderOnePost",async(data:{book_id:number},{rejectWithValue})=>{
    try {
        const responce=await $userhost.post<IPostOrder>("/api/oneorder",data)
        if(responce.status===200){
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const allOrdersPost=createAsyncThunk("order/allOrdersPost",async(_,{rejectWithValue})=>{
    try {
        const responce = await $userhost.post<IPostOrder>("/api/order")
        if(responce.status===200){
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})
const orderSlice=createSlice({
    name:"order",
    initialState:{
        order:{
            book_id:undefined as number|undefined,
            korzina:false as boolean
        },

        loading:false as boolean,
        error:null as any,
        orderPost:"" as string|undefined

    },
    reducers:{
        orderReducers:(state,{payload}:PayloadAction<number|undefined>)=>{
            state.order={book_id:payload,korzina:false}
        },
        orderAllReducers:(state,{payload}:PayloadAction<boolean>)=>{
            state.order={book_id:undefined,korzina:payload}
        },
        orderPostReducers:(state)=>{
            state.orderPost=""
        }
    },
    extraReducers:builder=>{
        builder
        .addCase(orderOnePost.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(orderOnePost.fulfilled,(state,{payload})=>{
            state.orderPost=payload?.message
            state.loading=false
        })
        .addCase(orderOnePost.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
        builder
        .addCase(allOrdersPost.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(allOrdersPost.fulfilled,(state,{payload})=>{
            state.orderPost=payload?.message
            state.loading=false
        })
        .addCase(allOrdersPost.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
    }
})
export const {orderReducers,orderPostReducers,orderAllReducers}=orderSlice.actions
export default orderSlice.reducer