import React from "react";
import SearchImg from "../../../../assets/icon/search.png"
import { Button } from "@mui/material";
interface IBookTitle{
    setModal:React.Dispatch<React.SetStateAction<boolean>>
}
const AdminBookieTitle:React.FC<IBookTitle> =({setModal})=>{
    const hendeSearchBook=(value:string)=>{
        // console.log(value)
    }
    const hendeleClick=()=>{
        setModal(true)
    }
    return(
        <div className="adminbook__title">
        <div className="adminbook__title__input">
            <span>
                <img src={SearchImg} alt="" />
            </span>
            <input type="text" onChange={(el)=>hendeSearchBook(el.target.value)} placeholder="Search for employee/project"/>
        </div>
        <div className="adminbook__title__btn">
                <Button variant="outlined" onClick={()=>hendeleClick()}>Taza kitap qosiw</Button>
            </div>
        </div>
    )
}
export default AdminBookieTitle