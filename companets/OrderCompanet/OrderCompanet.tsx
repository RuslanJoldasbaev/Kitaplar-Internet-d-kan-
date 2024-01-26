import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { orderOnePost, orderReducers, orderPostReducers,allOrdersPost} from "../../redux/orderSlice/orderSlice";
import { korzinaGet } from "../../redux/korzinaSlice/korzinaSlice";
import { oneBookGet } from "../../redux/bookSlice/bookSlice";
import { useNavigate } from "react-router-dom";
import "./order.scss"
const OrderCompanet: React.FC = () => {
    const { order, loading, orderPost } = useAppSelector(state => state.orderSlice)
    const { oneBook } = useAppSelector(state => state.bookSlice)
    const { korzinaProdukt } = useAppSelector(state => state.korzinaSlice)
    const [modal, setModal] = React.useState(false)
    console.log(oneBook)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const req = window.location.search

    const orderClick = () => {
        if (order.book_id) {
            dispatch(orderOnePost({ book_id: order.book_id }))
        }
        if(order.korzina){
            dispatch(allOrdersPost())
        }
    }

    const homePageClick=()=>{
        navigate("/book")
    }
    React.useEffect(() => {
        if (!order.book_id && !order.korzina) {
            // navigate("/book")
        }
        if (order.book_id) {
            dispatch(oneBookGet(`${order.book_id}`))
        }
        if (order.korzina) {
            dispatch(korzinaGet())
        }
    }, [req])

    React.useEffect(() => {
        if (orderPost) {
            setModal(true)
            dispatch(orderPostReducers())
        }
    }, [orderPost])

    return (
        <React.Fragment>
            <div className="order">
                <div className="container">
                    <div className="order__top">
                        <h2>buyirtpanizdi rasmiylastiriw</h2>
                    </div>
                    <div className="order__body">
                        <div className="order__body__left">
                            <div className="order__body__left__item">
                                <h2>siz tanlag'an kitaplar</h2>
                            </div>
                            {
                                order.book_id ?
                                    <div className="order__body__left__books">
                                        <div className="order__body__left__books__item">
                                            <div className="order__body__left__books__item__index">
                                                <h3>1</h3>
                                            </div>
                                            <div className="order__body__left__books__item__img">
                                                <img src={`${oneBook?.data?.image}`} alt="" />
                                            </div>
                                            <div className="order__body__left__books__item__name">
                                                <p>{oneBook?.data?.name}</p>
                                            </div>
                                            <div className="order__body__left__books__item__price">
                                                <p>{oneBook?.data?.price} som</p>
                                            </div>
                                        </div>
                                    </div>
                                    : korzinaProdukt?.data?.map((el,index) => {
                                        return (
                                            <div className="order__body__left__books" key={el.id}>
                                                <div className="order__body__left__books__item">
                                                    <div className="order__body__left__books__item__index">
                                                        <h3>{index+1}</h3>
                                                    </div>
                                                    <div className="order__body__left__books__item__img">
                                                        <img src={`${el?.image}`} alt="" />
                                                    </div>
                                                    <div className="order__body__left__books__item__name">
                                                        <p>{el?.name}</p>
                                                    </div>
                                                    <div className="order__body__left__books__item__price">
                                                        <p>{el?.price} som</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                            }

                            <div className="order__body__left__informatcion">
                                <h4>uluma sani : {order.book_id? 1: korzinaProdukt?.data?.length}</h4>
                                <h4>uluma bahasi : {order.book_id? oneBook?.data?.price:korzinaProdukt?.summa}</h4>
                            </div>
                        </div>
                        <div className="order__body__rigth">
                            <div className="order__body__rigth__item">
                                <div className="order__body__rigth__item__title">
                                    <p>buyirtpaniz</p>

                                </div>
                                <div className="order__body__rigth__item__price">
                                    <p>mahsulatingiz :({order.book_id?1:korzinaProdukt?.data?.length})</p>
                                    <p>{oneBook?.data?.price} uzc</p>
                                </div>
                                <div className="order__body__rigth__item__zakaz">
                                    <p>qachon beriladi :</p>
                                    <p>1 kunda</p>
                                </div>
                                <div className="order__body__rigth__item__allPrice">
                                    <p>uluma bahsi :</p>
                                    <h3>{order.book_id? oneBook?.data?.price:korzinaProdukt?.summa} uzc</h3>
                                </div>
                                <div className="order__body__rigth__item__button">
                                    <button className={loading ? "active" : ""} onClick={orderClick}>buyirtma berish</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={modal ? "order__modal active" : "order__modal"}>
                <div className="order__modal__item">
                    <h3>sawdaniz ushin raxmet jaqin arada kitabiniz tapsiriladi! </h3>
                    <button onClick={homePageClick}>bas betke otiw</button>
                </div>
            </div>
        </React.Fragment>
    )
}
export default OrderCompanet