import React from "react"
import BookImg from "../../../assets/img/korzinaBook.png"
import "./bosKorzina.scss"

interface IBosKorzina{
    text:string
}
const BosKorzina:React.FC<IBosKorzina>=({text})=>{
    return(
        <div className="bosKorzina">
            <div className="bosKorzina__item">
                <img src={BookImg} alt="" />
                <h2>{text}</h2>
            </div>
        </div>
    )
}

export default BosKorzina