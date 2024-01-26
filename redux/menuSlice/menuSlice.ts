import { createSlice} from "@reduxjs/toolkit";


const menuSlice=createSlice({
    name:"menuSlice",
    initialState:{
        mobilmenu:0
    },
    reducers:{
        menuRuducers(state,{payload}){
            state.mobilmenu=payload
        }
    },
    extraReducers:{

    }
})

export const {menuRuducers}=menuSlice.actions
export default menuSlice.reducer