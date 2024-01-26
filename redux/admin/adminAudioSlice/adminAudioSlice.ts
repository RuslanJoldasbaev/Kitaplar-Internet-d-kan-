import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { $userhost } from "../../../api/axios";
import { IAudioAdmin, IDeleteAudio, IPostAudio, IAudios } from "./adminAudio.type";
import { IAudioAvtor } from "../adminAudioAvtorSlice/audioAvtor.type";



export const bookOneAudioGet = createAsyncThunk("adminAudio/bookOneAudio", async (id: number, { rejectWithValue }) => {
    try {
        const responce = await $userhost.get<IAudioAdmin>(`/api/onebook/${id}`)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const deleteAudio = createAsyncThunk("adminAudio/deleteAudio", async (id: number, { rejectWithValue }) => {
    try {
        const responce = await $userhost.delete<IDeleteAudio>(`/api/audio/${id}`)
        console.log(responce)
    } catch (error) {
        rejectWithValue(error)
    }
})

export const audioAvtorsGet = createAsyncThunk("admin_avtor_audio/audiAvtorGet", async (_, { rejectWithValue }) => {
    try {
        const responce = await $userhost.get<IAudioAvtor>(`/api/dubauthor`)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const bookAudioPost = createAsyncThunk("admin_avtor_audio/bookAudioPost", async (data: any, { rejectWithValue }) => {
    try {
        const responce = await $userhost.post<IPostAudio>("/api/audio", data)
        console.log(responce)
        if (responce.status === 201) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const audiosGet = createAsyncThunk("admin_avtor_audio/audiosGet", async (id:number,{rejectWithValue}) => {
    try {
        const responce = await $userhost.get<IAudios>(`/api/book_audios/${id}`)
        console.log(responce)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

const adminAudioSlice = createSlice({
    name: "adminAudio",
    initialState: {
        oneBook: {} as IAudioAdmin | undefined,
        loading: false as boolean,
        error: null as any,

        avtors: {} as IAudioAvtor | undefined,
        avtorloading: false,
        avtorError: null as any,

        post: {} as IPostAudio | undefined,
        postLoading: false as boolean,
        postError: null as any,

        audios: {} as IAudios | undefined,
        audiosLoading: false,
        audiosError: null as any
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(bookOneAudioGet.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(bookOneAudioGet.fulfilled, (state, { payload }) => {
                state.oneBook = payload
                state.loading = false
            })
            .addCase(bookOneAudioGet.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
        builder
            .addCase(audioAvtorsGet.pending, (state) => {
                state.avtorloading = true
                state.avtorError = null
            })
            .addCase(audioAvtorsGet.fulfilled, (state, { payload }) => {
                state.avtorloading = false
                state.avtors = payload
            })
            .addCase(audioAvtorsGet.rejected, (state, { payload }) => {
                state.avtorloading = false
                state.avtorError = payload
            })
        builder
            .addCase(deleteAudio.pending, (state) => { })
            .addCase(deleteAudio.fulfilled, (state) => { })
            .addCase(deleteAudio.rejected, (state) => { })
        builder
            .addCase(bookAudioPost.pending, (state) => {
                state.postLoading = true
                state.postError = null
            })
            .addCase(bookAudioPost.fulfilled, (state, { payload }) => {
                state.post = payload
                state.postLoading = false
            })
            .addCase(bookAudioPost.rejected, (state, { payload }) => {
                state.postLoading = false
                state.postError = payload
            })
        builder
            .addCase(audiosGet.pending, (state) => {
                state.audiosLoading = true
                state.audiosError = null
            })
            .addCase(audiosGet.fulfilled, (state, { payload }) => {
                state.audios = payload
                state.audiosLoading = false
            })
            .addCase(audiosGet.rejected, (state, { payload }) => {
                state.audiosLoading = false
                state.audiosError = payload
            })
    }
})

export default adminAudioSlice.reducer