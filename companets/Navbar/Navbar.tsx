import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks"
import { useNavigate, NavLink, Navigate } from "react-router-dom"
import { logoAutReducers } from "../../redux/loginSlice/loginSlice"
import MobilNavbar from "./MobilNavbar/MobilNavbar"
import SearchBook from "./SearchBook/SearchBook"
// companet 


import CategoryTitle from "./CategoryTitle/CategoryTitle"
import Footer from "../Footer/Footer"

// img 

import KorzinaImg from "../../assets/icon/korzinka.png"
import favoriteImg from "../../assets/img/heart.png"
import Logo from "../../assets/img/logo.png"
import userImg from "../../assets/icon/user_img.png"
import logoAut from "../../assets/icon/logo_aut.png"
// css 

import "./navbar.scss"

const meneCom = [
    {
        name: "Home",
        silka: "/book",
        id: 1
    },
    {
        name: "korzina",
        silka: "/korzina",
        id: 2
    },
    {
        name:"search",
        silka:"/search",
        id:3
    },
    {
        name: "kitaplar",
        silka: "/category/books",
        id: 4
    },
    {
        name: "favorite",
        silka: "/favorite",
        id: 5
    },
    {
        name: "profil",
        silka: "/profil",
        id: 6
    },
    {
        name: "logo aut",
        silka: "/profil",
        id: 7
    }
]

const meneCom1 = [
    {
        name: "Home",
        silka: "/book",
        id: 1
    },
    {
        name: "kitaplar",
        silka: "/category/books",
        id: 4
    },
    {
        name: "login",
        silka: "/login",
        id: 14
    },
    {
        name: "sign up",
        silka: "/signup",
        id: 12
    }
]


const Navbar: React.FC = () => {
    const { token, user } = useAppSelector(state => state.loginSlice)
    const {page}=useAppSelector(state=>state.pageSlice)
    const [modal, setModal] = useState(false)
    const dispatch = useAppDispatch()
    const [menu, setMenu] = React.useState(false)
    const history = useNavigate()



    const favoriteClick = () => {
        history("/favorite")
    }
    const menuClose = () => {
        setMenu(false)
    }
    const catalogClick = (id: number, silka: string) => {
        if(id===7){
            history("/book")
            setMenu(false)
            return dispatch(logoAutReducers())
        }
        history(`${silka}`)
        setMenu(false)
        
    }
    const profilClick = () => {
        history("/profil")
        setModal(false)
    }
    const stopPropucation = (event: any) => {
        event.stopPropagation()
    }
    const KorzinkaClick = () => {
        history("/korzina")
    }
    const logoautClick = () => {
        dispatch(logoAutReducers())
        history("/book")
    }
    return (
        <header className="navbar">
            <div className="container">
                <div className="navbar__item">
                    <NavLink to="/book">
                        <div className="navbar__item__left">
                            <img src={Logo} alt="" />
                        </div>
                    </NavLink>

                    <SearchBook />


                    {token ?
                        <div className="navbar__item__rigth">
                            <div className="navbar__item__rigth__book">
                                <div className="navbar__item__rigth__book__favorite">
                                    <button onClick={favoriteClick}>
                                        <p>favorite</p>
                                        <img src={favoriteImg} alt="" />
                                    </button>
                                </div>
                                <div className="navbar__item__rigth__book__korzina">
                                    <button onClick={KorzinkaClick}>
                                        <p>korzina</p>
                                        <img src={KorzinaImg} alt="" />
                                    </button>
                                </div>
                            </div>
                            <div className="navbar__item__rigth__user">
                                <div className="navbar__item__rigth__user__left">
                                    <h3>{user?.name}</h3>
                                    <p>{user?.phone}</p>
                                </div>
                                <div className="navbar__item__rigth__user__rigth">
                                    <div className="navbar__item__rigth__user__rigth__img" onClick={() => setModal(true)}>
                                        <img src={user ? (user.image ? `${user.image}` : userImg) : userImg} alt="" />
                                    </div>

                                    <div className={`navbar__item__rigth__user__rigth__modal ${modal ? "active" : ""}`} >
                                        <ul className="navbar__item__rigth__user__rigth__modal__ul">
                                            <li className="navbar__item__rigth__user__rigth__modal__ul__li" onClick={profilClick}>
                                                <img src={userImg} alt="" /> <p> profil </p>
                                            </li>
                                            <li className="navbar__item__rigth__user__rigth__modal__ul__li" onClick={logoautClick}>
                                                <img src={logoAut} alt="" /> <p> login aut </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                        :
                        <div className="navbar__item__rigth">
                            <div className="navbar__item__rigth__item">
                                <NavLink to="/login"><p>Log In</p></NavLink>
                            </div>
                            <div className="navbar__item__rigth__item">
                                <NavLink to="/signup"><button>Sign up</button></NavLink>
                            </div>
                        </div>
                    }
                </div>

                <MobilNavbar setMenu={setMenu} />



            </div>

            <div className={menu ? "navbar__menu active" : "navbar__menu"} onClick={menuClose}>
                <div className="navbar__menu__title">
                    <div className=""></div>
                    <div className="navbar__menu__title__rigth" onClick={stopPropucation}>
                        <ul className="navbar__menu__title__rigth__ul">
                            {
                                token?
                                meneCom.map((el, index) => {
                                    return (
                                            <li className={el.id === page ? "navbar__menu__title__rigth__ul__li active" : "navbar__menu__title__rigth__ul__li"} onClick={() => catalogClick(el.id, el.silka)} key={index}>
                                                {el.name}
                                            </li>
                                    )
                                }):
                                meneCom1.map((el, index) => {
                                    return (
                                            <li className={el.id === page ? "navbar__menu__title__rigth__ul__li active" : "navbar__menu__title__rigth__ul__li"} onClick={() => catalogClick(el.id, el.silka)} key={index}>
                                                {el.name}
                                            </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="navbar__menu__title__rigth__bottom">
                            <strong>Terms </strong> <strong> Privacy</strong>
                        </div>
                    </div>

                </div>
            </div>

            <CategoryTitle />

            <Outlet />
            <Footer />

        </header>
    )
}
export default Navbar