import {configureStore} from "@reduxjs/toolkit"
import categorySlice from "./categorySlice/categorySlice"
import adminLoginSlice from "./adminLoginSlice/adminLoginSlice"
import menuSlice from "./menuSlice/menuSlice"
import loginSlice from "./loginSlice/loginSlice"
import bookSlice from "./bookSlice/bookSlice"
import korzinaSlice from "./korzinaSlice/korzinaSlice"
import comentSlice from "./comentSlice/comentSlice"
import allBooksSlice from "./allBooksSlice/allBooksSlice"
import searchBookSlice from "./searchBookSlice/searchBookSlice"
import profilSlice from "./profilSlice/profilSlice"
import discountSlice from "./discountSlice/discountSlice"
import orderSlice from "./orderSlice/orderSlice"
import pageSlice from "./pageSlice/pageSlice"

import userAdminSlice from "./admin/userAdminSlice/userAdminSlice"
import dashboardSlice from "./admin/dashboardSlice/dashboardSlice"
import adminBooksSlice from "./admin/adminBooksSlice/adminBooksSlice"
import usersAdminSlice from "./admin/usersAdminSlice/usersAdminSlice"
import categoryAdminSlice from "./admin/categoryAdminSlice/categoryAdminSlice"
import adminOrdersSlice from "./admin/adminOrdersSlice/adminOrdersSlice"
import avtorsAdminSlice from "./admin/avtorsAdminSlice/avtorsAdminSlice"
import adminAudioAvtorSlice from "./admin/adminAudioAvtorSlice/adminAudioAvtorSlice"
import adminAudioSlice from "./admin/adminAudioSlice/adminAudioSlice"
const store = configureStore({
    reducer:{
        categorySlice,
        adminLoginSlice,
        menuSlice,
        loginSlice,
        bookSlice,
        korzinaSlice,
        comentSlice,
        allBooksSlice,
        searchBookSlice,
        profilSlice,
        discountSlice,
        orderSlice,
        pageSlice,

        userAdminSlice,
        dashboardSlice,
        adminBooksSlice,
        usersAdminSlice,
        categoryAdminSlice,
        adminOrdersSlice,
        avtorsAdminSlice,
        adminAudioAvtorSlice,
        adminAudioSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch