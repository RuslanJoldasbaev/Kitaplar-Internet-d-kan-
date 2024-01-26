import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { korzinaGet } from "../../redux/korzinaSlice/korzinaSlice";
import { favoriteGet } from "../../redux/korzinaSlice/korzinaSlice";
import { setPageReducers } from "../../redux/pageSlice/pageSlice";
import KorzinaTitle from "./KorzinaTitle";
import KorzinaBody from "./KorzinaBody";
import "./korzina.scss"
const KorzinaCompanet: React.FC = () => {
    const req = window.location.search
    const history=useNavigate()
    const dispatch = useAppDispatch()
    const { token } = useAppSelector(state => state.loginSlice)
    React.useEffect(() => {
        if (token) {
            dispatch(korzinaGet())
            dispatch(setPageReducers(2))
        }
        if(!token){
            history("/login")
        }

    }, [req])

    return (
        <div className="korzina">
            <div className="container">
                <KorzinaTitle />
                <KorzinaBody />
            </div>
        </div>
    )
}

export default KorzinaCompanet