import React from "react";
import BosKorzina from "./BosKorzina/BosKorzina";
import { korzinaDelete, korzinaDeleteReducers } from "../../redux/korzinaSlice/korzinaSlice";
import { useNavigate } from "react-router-dom";
import { orderAllReducers, orderReducers } from "../../redux/orderSlice/orderSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import deleteImg from "../../assets/icon/delete.png"
import KorzinaPng from "../../assets/icon/korzinka.png"
import KorzinaLoading from "./korzinaLoading/KorzinaLoading";

const KorzinaBody: React.FC = () => {
    const dispatch = useAppDispatch()
    const history = useNavigate()
    const { korzinaProdukt, korzinaloading } = useAppSelector(state => state.korzinaSlice)
    const {token}=useAppSelector(state=>state.loginSlice)
    const korzinaClickDelete = (id: number) => {
        dispatch(korzinaDelete(id))
        dispatch(korzinaDeleteReducers(id))
    }
    const orderClick = (id: number) => {
        if(!token){
            return history("/signup")
        }
        dispatch(orderReducers(id))
        history("/order")
    }
    const allOrderClick=()=>{
        if(!token){
            return history("/signup")
        }
        dispatch(orderAllReducers(true))
        history("/order")
    }
    if (korzinaProdukt?.data?.length === 0) {
        return (<><BosKorzina text="korzina bos ozinizge unag'an kitalardi saylap zakaz beriwiniz mumkin" /></>)
    }
    return (
        <React.Fragment>
            {
                korzinaProdukt?.data && !korzinaloading ?
                    <div className="korzina__body">
                        <div className="korzina__body__title">
                            <div className="korzina__body__title__name">
                                <h3>Kitap suwreti</h3>
                                <h3>Kitap atları </h3>
                                <h3>Bahası </h3>
                                <h3> </h3>
                            </div>
                        </div>

                        <div className="korzina__body__items">
                            {
                                korzinaProdukt.data.length > 0 ? korzinaProdukt.data.map((el) => {
                                    return (
                                        <div className="korzina__body__items__item" key={el.id}>
                                            <div className="korzina__body__items__item__img">
                                                <img src={`${el.image}`} alt="" />
                                            </div>
                                            <div className="korzina__body__items__item__name">
                                                <h3>{el.name}</h3>
                                            </div>
                                            <div className="korzina__body__items__item__price">
                                                <h3>{el.price} Swm</h3>
                                            </div>
                                            <div className="korzina__body__items__item__button">
                                                <div className="korzina__body__items__item__button__buy">
                                                    <button onClick={() => orderClick(el.id)}>
                                                        <img src={KorzinaPng} alt="" /> <p>satip aliw</p>
                                                    </button>
                                                </div>
                                                <div className="korzina__body__items__item__button__delete">
                                                    <button onClick={() => korzinaClickDelete(el.id)}>
                                                        <img src={deleteImg} alt="" /> <p>Óshiriw</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>)
                                }
                                ) : <BosKorzina text="korzina bos ozinizge unag'an kitalardi saylap zakaz beriwiniz mumkin" />
                            }
                            <div className="korzina__body__items__allorder">
                                <p>Hammesin aliw :</p>
                                <button onClick={allOrderClick}>buyirtpalardi rasmiylastiriw</button>
                            </div>
                        </div>
                    </div> :
                    <KorzinaLoading />
            }
        </React.Fragment>
    )
}

export default KorzinaBody