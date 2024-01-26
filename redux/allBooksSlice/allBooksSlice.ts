import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { $host, $userhost } from "../../api/axios";
import { IAllBooks, ICategoryBook } from "./allBooksType";

export const allBooksGet = createAsyncThunk("allBooks/allBooksGet", async (data :{limit:number,page:number}, { rejectWithValue }) => {
    try {
        const response = await $userhost.get<IAllBooks>(`/api/book?limit=${data.limit}&page=${data.page}`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const totalAllboks = createAsyncThunk("allBooks/totalAllboks", async (_, { rejectWithValue }) => {
    try {
        const response = await $host.get<IAllBooks>('/api/book')
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const categoryTotalGet = createAsyncThunk("allBooks/categoryTotalGet", async (id: number, { rejectWithValue }) => {
    try {
        const response = await $host.get<ICategoryBook>(`/api/category/${id}`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const categoryAllBooksGet = createAsyncThunk("allBooks/categoryAllBooksGet", async (data: { id: number, limit: number,page:number }, { rejectWithValue }) => {
    try {
        const response = await $userhost.get<ICategoryBook>(`/api/category/${data.id}?limit=${data.limit}&page=${data.page}`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})



const allBooksSlice = createSlice({
    name: "allBooks",
    initialState: {
        allbooks: {} as IAllBooks | undefined,
        loading: false,
        error: null as null | any,

        categoryAllBooks: {} as ICategoryBook | undefined,
        loadingCategory: false,
        errorCategory: null as any,

        total: 10 as number ,
        totalLoading: false as boolean,
        totalError: null as any
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(allBooksGet.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(allBooksGet.fulfilled, (state, { payload }) => {
                state.loading = false
                state.allbooks = payload
            })
            .addCase(allBooksGet.rejected, (state, { payload }) => {
                state.error = payload
                state.loading = false
            })

        builder
            .addCase(categoryAllBooksGet.pending, (state) => {
                state.loadingCategory = true
                state.errorCategory = null
            })
            .addCase(categoryAllBooksGet.fulfilled, (state, { payload }) => {
                state.categoryAllBooks = payload
                state.loadingCategory = false
                state.errorCategory = null
            })
            .addCase(categoryAllBooksGet.rejected, (state, { payload }) => {
                state.loadingCategory = false
                state.errorCategory = payload
            })
        builder
            .addCase(totalAllboks.pending, (state) => {
                state.totalLoading = true
                state.totalError = null
            })
            .addCase(totalAllboks.fulfilled, (state, { payload }) => {
                state.totalLoading = false
                state.total = payload?.total?payload.total:30
            })
            .addCase(totalAllboks.rejected, (state, { payload }) => {
                state.totalError = payload
                state.totalLoading = false
            })
        builder
            .addCase(categoryTotalGet.pending, (state) => {
                state.totalLoading = true
                state.totalError = null
            })
            .addCase(categoryTotalGet.fulfilled, (state, { payload }) => {
                state.totalLoading = false
                state.total = payload?.data?.books_total?payload.data.books_total:30
            })
            .addCase(categoryTotalGet.rejected, (state, { payload }) => {
                state.totalError = payload
                state.totalLoading = false
            })
    }
})

export default allBooksSlice.reducer