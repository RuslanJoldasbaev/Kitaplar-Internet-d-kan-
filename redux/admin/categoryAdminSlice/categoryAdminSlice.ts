import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { $userhost } from "../../../api/axios";
import { ICategoryAdmin, IDeleteCategory, IAddCategory } from "./categoryType";

export const adminCategoryGet = createAsyncThunk("category-admin/adminCategoryGet", async (_, { rejectWithValue }) => {
    try {
        const responce = await $userhost.get<ICategoryAdmin>("/api/category")
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const oneCategoryGet=createAsyncThunk("category-admin/oneCategoryGet",async(id:number,{rejectWithValue})=>{
    try {
        const responce = await $userhost.get(`/api/category/${id}`)
        console.log(responce)
    } catch (error) {
        rejectWithValue(error)
    }
})

export const categoryDelete = createAsyncThunk("category-admin/categoryDelete", async (id: number, { rejectWithValue }) => {
    try {
        const responce = await $userhost.delete<IDeleteCategory>(`/api/category/${id}`)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const addCategoryPost = createAsyncThunk("category-admin/addCategoryPost", async (data: { name: string }, { rejectWithValue }) => {
    try {
        const responce = await $userhost.post<IAddCategory>("/api/category", data)
        if (responce.status === 201) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

const categoryAdminSlice = createSlice({
    name: "category-admin",
    initialState: {
        category: {} as ICategoryAdmin | undefined,
        loading: false,
        error: null as any,

        deletemessage: "" as string | undefined,
        deleteLoading: false as boolean,
        deleteError: null as any,

        addCategory: {} as IAddCategory | undefined,
        addleading: false as boolean,
        addError: null as any
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(adminCategoryGet.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(adminCategoryGet.fulfilled, (state, { payload }) => {
                state.category = payload
                state.loading = false
            })
            .addCase(adminCategoryGet.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
        builder
            .addCase(categoryDelete.pending, (state) => {
                state.deleteLoading = true
                state.deleteError = null
            })
            .addCase(categoryDelete.fulfilled, (state, { payload }) => {
                state.deletemessage = payload?.message
                state.deleteLoading = false
            })
            .addCase(categoryDelete.rejected, (state, { payload }) => {
                state.deleteLoading = false
                state.deleteError = payload
            })
        builder
            .addCase(addCategoryPost.pending, (state) => {
                state.addleading = true
                state.addError = null
            })
            .addCase(addCategoryPost.fulfilled, (state, { payload }) => {
                state.addCategory = payload
                state.addleading = false
            })
            .addCase(addCategoryPost.rejected, (state, { payload }) => {
                state.addleading = false
                state.addError = payload
            })

        builder
        .addCase(oneCategoryGet.pending,(state)=>{})
        .addCase(oneCategoryGet.fulfilled,(state,{payload})=>{})
        .addCase(oneCategoryGet.rejected,(state,{payload})=>{})
    }
})

export default categoryAdminSlice.reducer