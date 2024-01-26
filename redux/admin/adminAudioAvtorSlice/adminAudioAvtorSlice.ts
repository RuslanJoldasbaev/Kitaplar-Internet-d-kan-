import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { $userhost } from "../../../api/axios";
import { IAudioAvtor, IAvtorPost, IOneAvtor } from "./audioAvtor.type";

export const audioAvtorGet = createAsyncThunk("admin_avtor_audio/audiAvtorGet", async (data: { limit: number, page: number }, { rejectWithValue }) => {
    try {
        const responce = await $userhost.get<IAudioAvtor>(`/api/dubauthor?limit=${data.limit}&pahe=${data.page}`)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const totalAvtorAudio = createAsyncThunk("admin_avtor_audio/allAvtorsAudioGet", async (_, { rejectWithValue }) => {
    try {
        const responce = await $userhost.get<IAudioAvtor>("/api/dubauthor")
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const oneAvtorGet = createAsyncThunk("admin_avtor_audio/oneAvtorGet", async (id: number, { rejectWithValue }) => {
    try {
        const responce = await $userhost.get<IOneAvtor>(`/api/dubauthor/${id}`)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {

    }
})

export const deleteAvtorAdmin = createAsyncThunk("admin_avtor_audio/deleteAvtorAdmin", async (id: number, { rejectWithValue }) => {
    try {
        const responce = await $userhost.delete<{ message: string }>(`/api/dubauthor/${id}`)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})


export const postAvtorAudio = createAsyncThunk("admin_avtor_audio/postAvtorAudio", async (data: { name: string }, { rejectWithValue }) => {
    try {
        const responce = await $userhost.post<IAvtorPost>("/api/dubauthor", data)
        if (responce.status === 201) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const putAvtorAudio = createAsyncThunk("admin_avtor_audio/putAvtorAudio", async (data: { id: number, data: { name: string } }, { rejectWithValue }) => {
    try {
        const responce = await $userhost.put<IAvtorPost>(`/api/dubauthor/${data.id}`, data.data)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

const adminAudioAvtorSlice = createSlice({
    name: "admin_avtor_audio",
    initialState: {
        audiAvtor: {} as IAudioAvtor | undefined,
        loading: false,
        error: null as any,

        deletemassege: "" as undefined | string,
        deleteLoading: false,
        deleteError: null as any,

        total: undefined as undefined | number,
        totalLoading: false,
        totalError: null as any,

        post: {} as IAvtorPost | undefined,
        postLoading: false,
        postError: null as any,

        oneAvtor: {} as IOneAvtor | undefined,
        oneLoading: false as boolean,
        oneError: null as any
    },
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(audioAvtorGet.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(audioAvtorGet.fulfilled, (state, { payload }) => {
                state.loading = false
                state.audiAvtor = payload
            })
            .addCase(audioAvtorGet.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
        builder
            .addCase(deleteAvtorAdmin.pending, (state) => {
                state.deleteLoading = true
                state.deleteError = null
                state.deletemassege = ""
            })
            .addCase(deleteAvtorAdmin.fulfilled, (state, { payload }) => {
                state.deletemassege = payload?.message
                state.deleteLoading = false
            })
            .addCase(deleteAvtorAdmin.rejected, (state, { payload }) => {
                state.deleteLoading = false
                state.deleteError = payload
            })

        builder
            .addCase(totalAvtorAudio.pending, (state) => {
                state.totalLoading = true
                state.totalError = null
            })
            .addCase(totalAvtorAudio.fulfilled, (state, { payload }) => {
                state.total = payload?.total
                state.totalLoading = false
            })
            .addCase(totalAvtorAudio.rejected, (state, { payload }) => {
                state.totalLoading = false
                state.totalError = payload
            })
        builder
            .addCase(postAvtorAudio.pending, (state) => {
                state.postLoading = true
                state.postError = null
            })
            .addCase(postAvtorAudio.fulfilled, (state, { payload }) => {
                state.postLoading = false
                state.post = payload
            })
            .addCase(postAvtorAudio.rejected, (state, { payload }) => {
                state.postLoading = false
                state.postError = payload
            })
        builder
            .addCase(oneAvtorGet.pending, (state) => {
                state.oneLoading = true
                state.oneError = null
            })
            .addCase(oneAvtorGet.fulfilled, (state, { payload }) => {
                state.oneAvtor = payload
                state.oneLoading = false
            })
            .addCase(oneAvtorGet.rejected, (state, { payload }) => {
                state.oneLoading = false
                state.oneError = payload
            })
        builder
            .addCase(putAvtorAudio.pending, (state) => {
                state.postLoading = true
                state.postError = null
            })
            .addCase(putAvtorAudio.fulfilled, (state, { payload }) => {
                state.postLoading = false
                state.post = payload
            })
            .addCase(putAvtorAudio.rejected, (state, { payload }) => {
                state.postLoading = false
                state.postError = payload
            })
    }
})

export default adminAudioAvtorSlice.reducer