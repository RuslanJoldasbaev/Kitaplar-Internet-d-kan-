import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { $userhost } from "../../../api/axios";
import { Iavtors, IAvtorDelete, IPostAvtor,IOneAvtor } from "./avtor.types";

export const avtorsGet = createAsyncThunk("avtors__admin/avtorGet", async (data: { limit: number, page: number }, { rejectWithValue }) => {
    try {
        const responce = await $userhost.get<Iavtors>(`/api/author${data.page === -2 ? `` : `?limit=${data.limit}&page=${data.page}`}?`)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const avtorsDelete = createAsyncThunk("avtors__admin/avtorsDelete", async (id: number, { rejectWithValue }) => {
    try {
        const responce = await $userhost.delete<IAvtorDelete>(`/api/author/${id}`)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const totalAvtorsGet = createAsyncThunk("avtors__admin/totalAvtorsGet", async (_, { rejectWithValue }) => {
    try {
        const responce = await $userhost.get<Iavtors>("/api/author")
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const avtorPost = createAsyncThunk("avtors__admin/avtorPost", async (data: string, { rejectWithValue }) => {
    try {
        const responce = await $userhost.post<IPostAvtor>("/api/author", { name: data })
        if (responce.status === 201) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const oneAvtorGet = createAsyncThunk("avtors__admin/oneAvtorGet",async(id:number,{rejectWithValue})=>{
    try {
        const responce = await $userhost.get<IOneAvtor>(`/api/author/${id}`)
        if(responce.status===200){
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const putAvtor = createAsyncThunk("avtors__admin/putAvtor", async (data: { id: number, name: string }, { rejectWithValue }) => {
    try {
        const responce = await $userhost.put(`/api/author/${data.id}`, { name: data.name })
        console.log(responce)
    } catch (error) {
        rejectWithValue(error)
    }
})

const avtorsAdminSlice = createSlice({
    name: "avtors__admin",
    initialState: {
        avtors: {} as Iavtors | undefined,
        loading: false,
        error: null as any,

        deleteAvtor: {} as IAvtorDelete | undefined,
        deleteLoading: false,
        deleteError: null as any,

        total: undefined as number | undefined,
        totalLoading: false,
        totalError: null as any,

        post: {} as IPostAvtor | undefined,
        postLoading: false,
        postError: null as any,

        put:{} as IPostAvtor|undefined,
        putLoading:false as boolean,
        putError:null as any,

        oneAvtor:{} as IOneAvtor,
        oneAvtorLoading:false as boolean,
        oneAvtorError:null as any,

        allAvtors: {} as Iavtors | undefined
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(avtorsGet.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(avtorsGet.fulfilled, (state, { payload }) => {
                state.avtors = payload
                state.loading = false
            })
            .addCase(avtorsGet.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
        builder
            .addCase(avtorsDelete.pending, (state) => {
                state.deleteLoading = true
                state.deleteError = null
            })
            .addCase(avtorsDelete.fulfilled, (state, { payload }) => {
                state.deleteLoading = false
                state.deleteError = null
                state.deleteAvtor = payload
            })
            .addCase(avtorsDelete.rejected, (state, { payload }) => {
                state.deleteError = payload
                state.deleteLoading = false
            })
        builder
            .addCase(totalAvtorsGet.pending, (state) => {
                state.totalLoading = true
                state.totalError = null
            })
            .addCase(totalAvtorsGet.fulfilled, (state, { payload }) => {
                state.total = payload?.total
                state.allAvtors = payload
                state.totalLoading = false
            })
            .addCase(totalAvtorsGet.rejected, (state, { payload }) => {
                state.totalLoading = false
                state.totalError = payload
            })
        builder
            .addCase(avtorPost.pending, (state) => {
                state.postLoading = true
                state.postError = null
            })
            .addCase(avtorPost.fulfilled, (state, { payload }) => {
                state.postLoading = false
                state.postError = null
                state.post = payload
            })
            .addCase(avtorPost.rejected, (state, { payload }) => {
                state.postError = payload
                state.postLoading = false
            })
        builder
            .addCase(putAvtor.pending, (state) => {
                state.putLoading=true
                state.putError=null
            })
            .addCase(putAvtor.fulfilled, (state, { payload }) => { 
                // state.put=payload
                state.putLoading=false
            })
            .addCase(putAvtor.rejected, (state, { payload }) => { 
                state.putLoading=false
                state.putError=payload
            })
    }
})

export default avtorsAdminSlice.reducer