import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { $host } from "../../api/axios";
import { IDiscount } from "./discount.type";

export const discountGet = createAsyncThunk("discount/discountGet", async () => {
    try {
        const response = await $host.get<IDiscount>("/api/discount")
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {

    }
})
const discountSlice = createSlice({
    name: "discount",
    initialState: {
        discount:{} as IDiscount|undefined,
        loading:false,
        error:null as any
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(discountGet.pending, (state) => {
                state.loading=true
                state.error=null
            })
            .addCase(discountGet.fulfilled, (state, { payload }) => {
                state.discount=payload
                state.loading=false
            })
            .addCase(discountGet.rejected, (state, { payload }) => {
                state.loading=false
                state.error=payload
            })
    }
})

export default discountSlice.reducer