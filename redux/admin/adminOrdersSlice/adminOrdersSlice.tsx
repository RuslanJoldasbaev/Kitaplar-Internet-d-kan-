import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { $userhost } from "../../../api/axios";
import { IOrder,IOrderUpdate,IAllOrders } from "./orderTypes";

export const adminOrdersGet=createAsyncThunk("adminOrdersSlice/adminOrdersGet",async(data:{limit:number,page:number},{rejectWithValue})=>{
    try {
        const responce = await $userhost.get<IOrder>(`/api/order?limit=${data.limit}&page=${data.page}`)
        if(responce.status===200){
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const adminOrdersUpdate=createAsyncThunk("adminOrdersSlice/adminOrdersUpdate",async(id:number,{rejectWithValue})=>{
    try {
        const responce = await $userhost.put<IOrderUpdate>(`/api/order/${id}`)
        if(responce.status===200){
            return responce.data
        }
        console.log(responce)
    } catch (error) {
        rejectWithValue(error)
    }
})


export const deleteOrders= createAsyncThunk("adminOrdersSlice/deleteOrders",async(id:number,{rejectWithValue})=>{
    try {
        const responce = await $userhost.delete<{message: string}>(`/api/order/${id}`)
        if(responce.status===200){
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const ordersAllGet=createAsyncThunk("adminOrdersSlice/ordersAllGet",async(_,{rejectWithValue})=>{
    try {
        const responce =await $userhost.get<IAllOrders>("/api/order")
        if(responce.status===200){
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }    
})

const adminOrdersSlice=createSlice({
    name:"adminOrdersSlice",
    initialState:{
        order:{} as IOrder|undefined,
        loading:false,
        error:null as any,

        orderupdate:{} as IOrderUpdate|undefined,
        updateloading:false as boolean,
        updateError:null as any,

        deletemassge: "" as string | undefined,
        deleteError:null as any,
        deleteLoading:false as boolean,

        total:undefined as number|undefined,
        totalError:null as any,
        totalLoading:false as boolean
    },
    reducers:{

    },
    extraReducers:builder=>{
        builder
        .addCase(adminOrdersGet.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(adminOrdersGet.fulfilled,(state,{payload})=>{
            state.order=payload
            state.loading=false
        })
        .addCase(adminOrdersGet.rejected,(state,{payload})=>{
            state.error=payload
            state.loading=false
        })
        builder
        .addCase(adminOrdersUpdate.pending,(state)=>{
            state.updateloading=true
            state.updateError=null
        })
        .addCase(adminOrdersUpdate.fulfilled,(state,{payload})=>{
            state.orderupdate=payload
            state.updateloading=false
        })
        .addCase(adminOrdersUpdate.rejected,(state,{payload})=>{
            state.updateloading=false
            state.updateError=payload
        })
        builder
        .addCase(deleteOrders.pending,(state)=>{
            state.deleteLoading=true
            state.deleteError=null
            state.deletemassge=undefined
        })
        .addCase(deleteOrders.fulfilled,(state,{payload})=>{
            state.deleteLoading=false
            state.deletemassge=payload?.message
        })
        .addCase(deleteOrders.rejected,(state,{payload})=>{
            state.deleteError=payload
            state.deleteLoading=false
        })
        builder
        .addCase(ordersAllGet.pending,(state)=>{
            state.totalError=null
            state.totalLoading=true
        })
        .addCase(ordersAllGet.fulfilled,(state,{payload})=>{
            state.totalLoading=false
            state.total=payload?.total
        })
        .addCase(ordersAllGet.rejected,(state,{payload})=>{
            state.totalError=payload
            state.totalLoading=false
        })
    }
})

export default adminOrdersSlice.reducer