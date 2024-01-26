import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { $userhost } from "../../api/axios";
import { IKorzinaProdukt, IFavoriteProdukt } from "./typeKorzina";

export const korzinaGet = createAsyncThunk("korzina/KorzinaGet", async (_, { rejectWithValue }) => {
    try {
        const response = await $userhost.get<IKorzinaProdukt>("/api/basket")
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const korzinaPost = createAsyncThunk("korzina/korzinaPost", async (data: { book_id: number }, { rejectWithValue }) => {
    try {
        const response = await $userhost.post<{ message: string }>("/api/basket", data)
        if (response.status === 201) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const korzinaDelete = createAsyncThunk("korzina/korzinaDelate", async (id: number, { rejectWithValue }) => {
    try {
        const response = await $userhost.delete<{ message: string }>(`/api/basket/${id}`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const favoriteGet = createAsyncThunk("korzina/fovoriteGet", async (_, { rejectWithValue }) => {
    try {
        const response = await $userhost.get<IFavoriteProdukt>("/api/favorite")
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})


export const favoritePost = createAsyncThunk("korzina/favoritePost", async (data: { book_id: number }, { rejectWithValue }) => {
    try {
        const response = await $userhost.post<{ message: string }>("/api/favorite", data)
        if (response.status === 201) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const favoriteDelete = createAsyncThunk("korzina/favoriteDelete", async (id: number, { rejectWithValue }) => {
    try {
        const response = await $userhost.delete<{ message: string }>(`/api/favorite/${id}`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

const korzinaSlice = createSlice({
    name: "korzina",
    initialState: {
        korzinaProdukt: {} as IKorzinaProdukt | undefined,
        korzinaloading: false,
        korzinaError: null as any,

        korzinaMassage: "" as string | undefined,
        kpostloading: false,
        kpostError: null as any,

        korzinaDeleteMessage: "" as undefined | string,
        korzinaDeleteLoading: false,
        korzinaDeleteError: null as any,

        favoriteProdukt: {} as IFavoriteProdukt | undefined,
        favoviteLoading: false,
        favoriteError: null as any,

        favoriteMassage: "" as string | undefined,
        favPostLoading: false,
        favpostError: null as any,

        favoriteDeteteMessage: "" as string | undefined,
        favoriteDeleteLoading: false,
        favoriteDeleteError: null as any

    },
    reducers: {
        korzinaDeleteReducers(state, { payload }: PayloadAction<number>) {
            state.korzinaProdukt = {
                message: state.korzinaProdukt?.message, 
                data: state.korzinaProdukt?.data?.filter((el) => {
                    if (el.id === payload) {
                        return
                    }
                    return el
                }),
                summa:state.korzinaProdukt?.summa
            }
        },
        favoriteDeleteReducers(state, { payload }: PayloadAction<number>) {
            state.favoriteProdukt = {
                message: state.favoriteProdukt?.message, data: state.favoriteProdukt?.data?.filter((el) => {
                    if (el.id === payload) {
                        return
                    }
                    return el
                })
            }
        },
        favoriteAddReducers(state, { payload }: PayloadAction<number>) {
            state.favoriteProdukt = {
                message: state.favoriteProdukt?.message,
                data: state.favoriteProdukt?.data?.filter((el) => {
                    if (el.id === payload) {
                        return {
                            id: el.id,
                            name: el.name,
                            author: {
                                id: el.author.id,
                                name: el.author.name
                            },
                            title: el.title,
                            price: el.price,
                            image: el.image
                        }
                    }
                    return el
                })
            }
        }
    },

    extraReducers: builder => {
        builder
            .addCase(korzinaGet.pending, (state) => {
                state.korzinaloading = true
                state.korzinaError = null
            })
            .addCase(korzinaGet.fulfilled, (state, { payload }) => {
                state.korzinaProdukt = payload
                state.korzinaError = null
                state.korzinaloading = false
            })
            .addCase(korzinaGet.rejected, (state, { payload }) => {
                state.korzinaError = payload
                state.korzinaloading = false
            })
        builder
            .addCase(korzinaPost.pending, (state) => {
                state.kpostloading = true
                state.korzinaMassage = ""
                state.kpostError = null
            })
            .addCase(korzinaPost.fulfilled, (state, { payload }) => {
                state.korzinaMassage = payload?.message
                state.kpostloading = false
            })
            .addCase(korzinaPost.rejected, (state, { payload }) => {
                state.kpostError = payload
                state.kpostloading = false
            })
        builder
            .addCase(korzinaDelete.pending, (state) => {
                state.korzinaDeleteMessage = ""
                state.korzinaDeleteLoading = true
                state.korzinaDeleteError = null
            })
            .addCase(korzinaDelete.fulfilled, (state, { payload }) => {
                state.korzinaDeleteLoading = false
                state.korzinaDeleteMessage = payload?.message
            })
            .addCase(korzinaDelete.rejected, (state, { payload }) => {
                state.korzinaDeleteLoading = false
                state.korzinaDeleteError = payload
            })

        builder
            .addCase(favoriteGet.pending, (state) => {
                state.favoviteLoading = true
                state.favoriteError = null
            })
            .addCase(favoriteGet.fulfilled, (state, { payload }) => {
                state.favoriteProdukt = payload
                state.favoviteLoading = false
            })
            .addCase(favoriteGet.rejected, (state, { payload }) => {
                state.favoviteLoading = false
                state.favoriteError = payload
            })
        builder
            .addCase(favoritePost.pending, (state) => {
                state.favPostLoading = true
                state.favoriteMassage = ""
                state.favpostError = null
            })
            .addCase(favoritePost.fulfilled, (state, { payload }) => {
                state.favoriteMassage = payload?.message
                state.favPostLoading = false
            })
            .addCase(favoritePost.rejected, (state, { payload }) => {
                state.favpostError = payload
                state.favPostLoading = false
            })
        builder
            .addCase(favoriteDelete.pending, (state) => {
                state.favoriteDeteteMessage = ""
                state.favoriteDeleteLoading = true
                state.favoriteDeleteError = null
            })
            .addCase(favoriteDelete.fulfilled, (state, { payload }) => {
                state.favoriteDeleteLoading = false
                state.favoriteDeteteMessage = payload?.message
            })
            .addCase(favoriteDelete.rejected, (state, { payload }) => {
                state.favoriteDeleteLoading = false
                state.favoriteDeleteError = payload
            })
    }
})
export const { korzinaDeleteReducers, favoriteDeleteReducers,favoriteAddReducers } = korzinaSlice.actions
export default korzinaSlice.reducer