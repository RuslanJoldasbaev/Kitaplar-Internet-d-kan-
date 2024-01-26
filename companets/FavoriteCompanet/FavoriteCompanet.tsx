import React from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { favoriteDeleteReducers, favoriteDelete, favoriteGet } from "../../redux/korzinaSlice/korzinaSlice";
import { useNavigate } from "react-router-dom";
import { setPageReducers } from "../../redux/pageSlice/pageSlice";
import FavoriteNull from "./FavoriteNull/FavoriteNull";
import SearchImg from "../../assets/icon/search.png"
import FilterImg from "../../assets/icon/filter.png"
import KorzinaLoading from "../KorzinaCompanet/korzinaLoading/KorzinaLoading";
import deleteImg from "../../assets/icon/delete.png"
import KorzinaPng from "../../assets/icon/korzinka.png"
import { useAppSelector } from "../../redux/hooks/hooks";
import "./favoriteCompanet.scss"
const FavoriteCompanet: React.FC = () => {
    const { favoriteProdukt, favoriteDeteteMessage } = useAppSelector(state => state.korzinaSlice)
    const {token}=useAppSelector(state=>state.loginSlice)
    const history=useNavigate()
    const req = window.location.search
    const dispatch = useAppDispatch()
    const favoriteDeleteClick = (id: number) => {
        dispatch(favoriteDelete(id))
        dispatch(favoriteDeleteReducers(id))
    }

    React.useEffect(() => {
        if(token){
        dispatch(favoriteGet())
        dispatch(setPageReducers(5))
        }
        if(!token){
            history("/login")
        }
    }, [req])

    return (
        <div className="favorite">
            {
                favoriteProdukt?.data ? favoriteProdukt.data.length > 0 ?
                    <div className="container">
                        <div className="favorite__title">
                            <div className="favorite__title__mobil">
                                <span className="favorite__title__mobil__search">
                                    <img src={SearchImg} alt="" />
                                </span>
                                <input type="text" placeholder="Search Books, Authors, or ISBN" />
                                <span className="favorite__title__mobil__filter">
                                    <img src={FilterImg} alt="" />
                                </span>
                            </div>
                            <h2>unatqan kiaplariniz </h2>

                        </div>

                        <div className="favorite__body">
                            <div className="favorite__body__title">
                                <div className="favorite__body__title__name">
                                    <h3>Kitap suwreti</h3>
                                    <h3>Kitap atları </h3>
                                    <h3>Bahası </h3>
                                    <h3> </h3>
                                </div>

                            </div>
                            <div className="favorite__body__items">
                                {
                                    favoriteProdukt.data.map((el) => {
                                        return (
                                            <div className="favorite__body__items__item" key={el.id}>
                                                <div className="favorite__body__items__item__img">
                                                    <img src={`${el.image}`} alt="" />
                                                </div>
                                                <div className="favorite__body__items__item__name">
                                                    <h3>{el.name}</h3>
                                                </div>
                                                <div className="favorite__body__items__item__price">
                                                    <h3>{el.price} Swm</h3>
                                                </div>
                                                <div className="favorite__body__items__item__button">
                                                    <div className="favorite__body__items__item__button__delete">
                                                        <button onClick={() => favoriteDeleteClick(el.id)}>
                                                            <img src={deleteImg} alt="" /> Óshiriw
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    : <FavoriteNull /> : <KorzinaLoading />
            }
        </div>
    )
}

export default FavoriteCompanet