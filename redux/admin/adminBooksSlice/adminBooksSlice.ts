import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { $userhost } from "../../../api/axios";
import { IAllBooksAdmin, IOneBook, IBookPost,IAllBooks } from "./booksTypes";

export const allBooksAdminGet = createAsyncThunk("adminBooks/allBooksAdminGet", async (data:{limit: number,page:number}, { rejectWithValue }) => {
    try {
        const responce = await $userhost.get<IAllBooksAdmin>(`/api/new_book?limit=${data.limit}&page=${data.page}`)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const oneBookGetAdmin = createAsyncThunk("adminBooks/oneBookGetAdmin", async (id: string, { rejectWithValue }) => {
    try {
        const responce = await $userhost.get<IOneBook>(`/api/book/${id}`)
        if (responce.status === 200) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const deleteBook = createAsyncThunk("adminBooks/deleteBook", async (id: number, { rejectWithValue, dispatch }) => {
    try {
        const responce = await $userhost.delete<{ message: string }>(`/api/book/${id}`)
        if (responce.status === 200) {
            dispatch(deleteBooks({ id }))
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const addBookPost = createAsyncThunk("adminBooks/addBookPost", async (data: FormData, { rejectWithValue }) => {
    try {
        const responce = await $userhost.post<IBookPost>("/api/book", data)
        if (responce.status === 201) {
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const adminBookPut = createAsyncThunk("adminBooks/adminBookPut", async (data: { id: string, data: any }, { rejectWithValue }) => {
    try {
        const responce = await $userhost.post(`/api/book/${data.id}`, data.data)
        console.log(responce)
    } catch (error) {
        rejectWithValue(error)
    }
})

export const totalBookGet=createAsyncThunk("/api/book",async(_,{rejectWithValue})=>{
    try {
        const responce = await $userhost.get<IAllBooks>("/api/book")
        if(responce.status===200){
            return responce.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})


const adminBooksSlice = createSlice({
    name: "adminBooks",
    initialState: {
        books: {} as IAllBooksAdmin | undefined,
        loading: false as boolean,
        error: null as any,

        deleteLoading: false,
        deleteError: null as any,
        deleteMessage: "" as string | undefined,

        oneBook: undefined as undefined | IOneBook,
        oneBookLoading: false as boolean,
        oneBookError: null as any,

        postBook: undefined as IBookPost | undefined,
        postBookLoading: false as boolean,
        postBookError: null as any,

        total:undefined as number|undefined,
        totalLoading:false as boolean,
        totalError:null as any
    },
    reducers: {
        deleteBooks(state, { payload }: PayloadAction<{ id: number }>) {
            state.books = {
                message: state.books?.message, data: state.books?.data?.filter((el) => {
                    if (el.id !== payload.id) {
                        return el
                    }
                })
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(allBooksAdminGet.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(allBooksAdminGet.fulfilled, (state, { payload }) => {
                state.books = payload
                state.loading = false
            })
            .addCase(allBooksAdminGet.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

        builder
            .addCase(deleteBook.pending, (state) => {
                state.deleteLoading = true
                state.deleteError = null
            })
            .addCase(deleteBook.fulfilled, (state, { payload }) => {
                state.deleteMessage = payload?.message
                state.deleteLoading = false
            })
            .addCase(deleteBook.rejected, (state, { payload }) => {
                state.deleteLoading = false
                state.deleteError = payload
            })
        builder
            .addCase(addBookPost.pending, (state) => {
                state.postBookLoading = true
                state.postBookError = null
            })
            .addCase(addBookPost.fulfilled, (state, { payload }) => {
                state.postBook = payload
                state.postBookLoading = false
            })
            .addCase(addBookPost.rejected, (state, { payload }) => {
                state.postBookLoading = false
                state.postBookError = payload
            })
        builder
            .addCase(oneBookGetAdmin.pending, (state) => {
                state.oneBookError = null
                state.oneBookLoading = true
            })
            .addCase(oneBookGetAdmin.fulfilled, (state, { payload }) => {
                state.oneBookLoading = false
                state.oneBook = payload
            })
            .addCase(oneBookGetAdmin.rejected, (state, { payload }) => {
                state.oneBookError = payload
                state.oneBookLoading = false
            })

        builder
            .addCase(adminBookPut.pending, (state) => { })
            .addCase(adminBookPut.fulfilled, (state) => { })
            .addCase(adminBookPut.rejected, (state) => { })

        builder
        .addCase(totalBookGet.pending,(state)=>{
            state.totalLoading=true
            state.totalError=null
        })
        .addCase(totalBookGet.fulfilled,(state,{payload})=>{
            state.totalLoading=false
            state.total=payload?.total
        })
        .addCase(totalBookGet.rejected,(state,{payload})=>{
            state.totalLoading=false
            state.totalError=payload
        })
    }
})

export const { deleteBooks } = adminBooksSlice.actions
export default adminBooksSlice.reducer