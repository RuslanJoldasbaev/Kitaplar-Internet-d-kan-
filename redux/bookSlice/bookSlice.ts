import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { $host, $userhost } from "../../api/axios";
import { IPopular, IRecomen, IOneBook, INewBooks, IBookCatgory } from "./typebook";

export const popularGet = createAsyncThunk("book/popularGet", async (count: number, { rejectWithValue }) => {
    try {
        const response = await $host.get<IPopular>(`/api/book_click?limit=${count}`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const userPopularGet = createAsyncThunk("book/userPopularGet", async (count: number, { rejectWithValue }) => {
    try {
        const response = await $userhost.get<IPopular>(`/api/book_click_user?limit=${count}`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const recomendationGet = createAsyncThunk("book/recomendationGet", async (count: number, { rejectWithValue }) => {
    try {
        const response = await $userhost.get<IRecomen>(`/api/book_rating?limit=${count}`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const userRecomendationGet = createAsyncThunk("book/userRecomendationGet", async (count: number, { rejectWithValue }) => {
    try {
        const response = await $userhost.get<IRecomen>(`/api/book_rating_user?limit=${count}`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const oneBookGet = createAsyncThunk("book/oneBookGet", async (id: string, { rejectWithValue }) => {
    try {
        const response = await $userhost.get<IOneBook>(`/api/book/${id}`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})


export const newBooksGet = createAsyncThunk("book/newBooksGet", async (count: number, { rejectWithValue }) => {
    try {
        const response = await $host.get<INewBooks>(`/api/book_new?limit=${count}`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const newBooksUserGet = createAsyncThunk("book/newBooksUserGet", async (count: number, { rejectWithValue }) => {
    try {
        const response = await $userhost.get<INewBooks>(`/api/book_new_user?limit=${count}`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const oneBookCategoryGet = createAsyncThunk("book/oneBookCategory", async (id: number, { rejectWithValue }) => {
    try {
        const response = await $host.get<IBookCatgory>(`/api/category/${id}`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

const bookSlice = createSlice({
    name: "book",
    initialState: {
        popular: {} as IPopular | undefined,
        popularLoading: false,
        popularError: null as any,

        recomen: {} as IRecomen | undefined,
        recomenLoading: false,
        recomenError: null as any,

        oneBook: {} as IOneBook | undefined,
        oneBookLoading: false,
        oneBookError: null as any,


        newBooks: {} as INewBooks | undefined,
        newBooksLoading: false,
        newBooksError: null as any,

        oneBookCategoryBook: {} as IBookCatgory | undefined,
        oneBookCategoryLoading: false as boolean,
        oneBookCategoryError: null as any

    },
    reducers: {

        likePopularReducer(state, { payload }: PayloadAction<{ id: number, like: number }>) {
            const test = state.recomen?.data
            let data = {
                message: "message all boook",
                data: test ? test.filter((el) => {
                    if (el.id === payload.id) {
                        return ({
                            audio: el.audio,
                            author: {
                                id: el.author.id,
                                name: el.author.name
                            },
                            categories: el.categories,
                            id: el.id,
                            image: el.image,
                            name: el.name,
                            price: el.price,
                            rating: el.rating,
                            title: el.title,
                            baskets: el.baskets,
                            favorite: payload.like
                        })
                    }
                    return el
                })
                    : []
            }
            state.recomen = data
        }
    },
    extraReducers: builder => {
        builder
            .addCase(popularGet.pending, (state) => {
                state.popularLoading = true
                state.popularError = null
            })
            .addCase(popularGet.fulfilled, (state, { payload }) => {
                state.popularLoading = false
                state.popular = payload
            })
            .addCase(popularGet.rejected, (state, { payload }) => {
                state.popularError = payload
                state.popularLoading = false
            })
        builder
            .addCase(userPopularGet.pending, (state) => {
                state.popularLoading = true
                state.popularError = null
            })
            .addCase(userPopularGet.fulfilled, (state, { payload }) => {
                state.popularLoading = false
                state.popular = payload
            })
            .addCase(userPopularGet.rejected, (state, { payload }) => {
                state.popularError = payload
                state.popularLoading = false
            })
        builder
            .addCase(recomendationGet.pending, (state) => {
                state.recomenLoading = true
                state.recomenError = null
            })
            .addCase(recomendationGet.fulfilled, (state, { payload }) => {
                state.recomen = payload
                state.recomenLoading = false
            })
            .addCase(recomendationGet.rejected, (state, { payload }) => {
                state.recomenLoading = false
                state.recomenError = payload
            })
        builder
            .addCase(userRecomendationGet.pending, (state) => {
                state.recomenLoading = true
                state.recomenError = null
            })
            .addCase(userRecomendationGet.fulfilled, (state, { payload }) => {
                state.recomen = payload
                state.recomenLoading = false
            })
            .addCase(userRecomendationGet.rejected, (state, { payload }) => {
                state.recomenLoading = false
                state.recomenError = payload
            })


        builder
            .addCase(oneBookGet.pending, (state) => {
                state.oneBookLoading = true
                state.oneBookError = null
            })
            .addCase(oneBookGet.fulfilled, (state, { payload }) => {
                state.oneBookLoading = false
                state.oneBook = payload
            })
            .addCase(oneBookGet.rejected, (state, { payload }) => {
                state.oneBookLoading = false
                state.oneBookError = payload
            })
        builder
            .addCase(newBooksUserGet.pending, (state) => {
                state.newBooksLoading = true
                state.newBooksError = null
            })
            .addCase(newBooksUserGet.fulfilled, (state, { payload }) => {
                state.newBooksLoading = false
                state.newBooks = payload
            })
            .addCase(newBooksUserGet.rejected, (state, { payload }) => {
                state.newBooksLoading = false
                state.newBooksError = payload
            })
        builder
            .addCase(newBooksGet.pending, (state) => {
                state.newBooksLoading = true
                state.newBooksError = null
            })
            .addCase(newBooksGet.fulfilled, (state, { payload }) => {
                state.newBooks = payload
                state.newBooksLoading = false
            })
            .addCase(newBooksGet.rejected, (state, { payload }) => {
                state.newBooksLoading = false
                state.newBooksError = payload
            })
        builder
            .addCase(oneBookCategoryGet.pending, (state) => {
                state.oneBookCategoryLoading = true
                state.oneBookCategoryError = null
            })
            .addCase(oneBookCategoryGet.fulfilled, (state, { payload }) => {
                state.oneBookCategoryBook = payload
                state.oneBookCategoryLoading = false
            })
            .addCase(oneBookCategoryGet.rejected, (state, { payload }) => {
                state.oneBookCategoryError = payload
                state.oneBookCategoryLoading = false
            })

    }
})

export const { likePopularReducer } = bookSlice.actions
export default bookSlice.reducer