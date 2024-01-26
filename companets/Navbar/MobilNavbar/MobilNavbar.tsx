import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import HomeImg from "../../../assets/icon/home.png"
import mobil_korzinka from "../../../assets/icon/mobil_korzika.png"
import MenuImg from "../../../assets/icon/menu.png"
import SearchImg from "../../../assets/img/search.png"
import { setPageReducers } from "../../../redux/pageSlice/pageSlice";


interface NavbarIN {
    setMenu: React.Dispatch<React.SetStateAction<boolean>>
}
const mobilCom = [
    {
        id: 1,
        img: HomeImg,
        name: "Home",
        path:"/book"
    },
    {
        id: 2,
        img: mobil_korzinka,
        name: "Korzina",
        path:"/korzina"
    },
    {
        id: 3,
        img: SearchImg,
        name: "search",
        path:"/search"
    }
]
const MobilNavbar: React.FC<NavbarIN> = ({ setMenu }) => {
    const dispatch=useAppDispatch()
    const history=useNavigate()
    const {page}=useAppSelector(state=>state.pageSlice)
    const hendeMenuClick = () => {
        setMenu(true)
    }
    const hendelClick=(id:number,path:string)=>{
        dispatch(setPageReducers(id))
        history(`${path}`)
    }
    return (
        <div className="navbar__mobil">
            <ul className="navbar__mobil__ul">
                {
                    mobilCom.map((el) => {
                        return (
                        <li className={page===el.id?"navbar__mobil__ul__li active":"navbar__mobil__ul__li"} onClick={()=>hendelClick(el.id,el.path)} key={el.id}>
                            <img src={el.img} alt="" /><p>{el.name}</p>
                        </li>)
                    })
                }

                <li className="navbar__mobil__ul__li" onClick={()=>hendeMenuClick()}>
                    <img src={MenuImg} alt="" />
                    <p>Menu</p>
                </li>
            </ul>
        </div>
    )
}

export default MobilNavbar