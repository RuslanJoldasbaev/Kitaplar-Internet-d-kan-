import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch,useAppSelector } from "../../../redux/hooks/hooks";
import { categoryReducers } from "../../../redux/admin/dashboardSlice/dashboardSlice";
import MenuImg from "../../../assets/icon/menu_admin.png"
import MainImg from "../../../assets/icon/main_admin.png"
import PeopleImg from "../../../assets/icon/people.png"
import FileImg from "../../../assets/icon/file.png"
import BookImg from "../../../assets/icon/book.png"
import SetingImg from "../../../assets/icon/setting.png"
import LogoImg from "../../../assets/img/logo.png"
import AudioAvtor from "../../../assets/img/audio__admin.png"
import AudioBook from "../../../assets/img/audiobook.png"

import "./adminDashboard.scss"
const AdminDashboard: React.FC = () => {
    const navigate = useNavigate()
    const {category}=useAppSelector(state=>state.dashboardSlice)
    const categoryDash = [
        {
            id: 1,
            name: "Dashboard",
            img: MenuImg,
            url: "/admin/dashboard"
        },
        {
            id: 2,
            name: "Paydalanıwshılar",
            img: PeopleImg,
            url: "/admin/users"
        },
        {
            id: 3,
            name: "Kategoriya",
            img: MainImg,
            url: "/admin/category"
        },
        {
            id: 4,
            name: "Buyırtpalar",
            img: FileImg,
            url: "/admin/order"
        },
        {
            id: 5,
            name: "Kitap",
            img: BookImg,
            url: "/admin/books"
        },
        {
            id:6,
            name:"avtor",
            img: PeopleImg,
            url:"/admin/author"
        },
        {
            id:7,
            name:"audio avtor",
            img:AudioAvtor,
            url:"/admin/author_audio"
        },
        {
            id:8,
            name:"audio book",
            img:AudioBook,
            url:"/admin/audio"
        }
    ]
    const dispatch = useAppDispatch()

    const hendeleClick = (url: string, id: number) => {
        dispatch(categoryReducers(id))
        navigate(`${url}`)
    }
    return (
        <div className="dashboard">
            <div className="dashboard__title">
                <span>
                    <img src={LogoImg} alt="" />
                </span>
                <h2>Bookie.uz</h2>
            </div>
            <div className="dashboard__body">
                <div className="dashboard__body__title">
                    <p>MAIN MENU</p>
                </div>
                <ul className="dashboard__body__ul">
                    {categoryDash.map((el) => {
                        return (
                            <li className={category===el.id?"dashboard__body__ul__li active":"dashboard__body__ul__li"} key={el.id} onClick={() => hendeleClick(el.url, el.id)}>
                                <span>
                                    <img src={el.img} alt="" />
                                </span>
                                <p>{el.name}</p>
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
            <div className="dashboard__bottom">
                <div className="dashboard__bottom__title">
                    <p>basqa</p>
                </div>
                <div className="dashboard__bottom__body">
                    <span>
                        <img src={SetingImg} alt="" />
                    </span>
                    <p>Sazlamalar</p>
                </div>
            </div>
        </div>

    )
}

export default AdminDashboard