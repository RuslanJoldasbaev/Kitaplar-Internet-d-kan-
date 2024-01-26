import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { korzinaPost, favoritePost, favoriteDelete } from "../../redux/korzinaSlice/korzinaSlice";
import StarFunction from "../ui/StarFunction/StarFunction";
import { message } from 'antd';
import { likePopularReducer } from "../../redux/bookSlice/bookSlice";
import { favoriteAddReducers } from "../../redux/korzinaSlice/korzinaSlice";
import Like from "../../assets/icon/love.png"
import LikeActive from "../../assets/icon/loveactive.png"
import BookImg from '../../assets/img/book.png'
import Korzinka from "../../assets/icon/korzinka.png"
import "./bookItem.scss"
interface IBookInfo {
    data: {
        audio: string,
        author: {
            id: number,
            name: string
        },
        categories: {
            id: number,
            name: string
        }[],
        id: number,
        image: string,
        name: string,
        price: string,
        rating: null | string,
        title: string,
        baskets: number,
        favorite: number
    }
}

const BookItem: React.FC<IBookInfo> = ({ data }) => {
    const dispatch = useAppDispatch()
    const history = useNavigate()

    const { token } = useAppSelector(state => state.loginSlice)

    const [messageApi, contextHolder] = message.useMessage();

    const success = (value: string) => {
        messageApi.open({
            type: 'success',
            content: `${value}`,
        });
    };

    const korzinaClick = (id: number, basket: number) => {
        if (token) {
            if (basket === 0) {
                success("korzinag'a qosildi")
                return dispatch(korzinaPost({
                    book_id: id
                }))
            }
            return success("korzinada bar")
        }
        return history("/signup")

    }

    const likeClick = (id: number, like: number) => {
        if (token) {
            if (like === 0) {
                dispatch(likePopularReducer({ id: id, like: 1 }))
                return dispatch(favoritePost({
                    book_id: id
                }))
            }
            if (like === 1) {
                dispatch(likePopularReducer({ id: id, like: 0 }))
                return dispatch(favoriteDelete(id))
            }
        }
        return history("/signup")
    }



    return (
        <React.Fragment>
            {contextHolder}
            <div className="bookItem">
                <div className="bookItem__element">
                    <div>
                        <NavLink to={`/bookInfo/${data.name}/${data.id}`}>
                            <div className="bookItem__element__title">
                                <span className="bookItem__element__title__img">
                                    {data.image === null ? <img src={BookImg} alt="" /> :
                                        <img src={`${data.image}`} alt="" />
                                    }
                                </span>
                            </div>
                        </NavLink>
                        <div className="bookItem__element__body">
                            <div className="bookItem__element__body__like">
                                <h3>{data.name}</h3>
                                <img src={data.favorite === 0 ? Like : LikeActive} alt="" onClick={() => likeClick(data.id, data.favorite)} />
                            </div>
                            <div className="bookItem__element__body__star">
                                <StarFunction rating={data.rating} width="14" />
                            </div>
                            <div className="bookItem__element__body__text">
                                <p>{data.author.name}</p>
                            </div>
                            <div className="bookItem__element__body__bottom">
                                <div className="bookItem__element__body__bottom__sena">
                                    <h2>{data.price} UZS</h2>
                                </div>
                                <div className="bookItem__element__body__bottom__korzinka">
                                    <button onClick={() => korzinaClick(data.id, data.baskets)} className={data.baskets === 1 ? "bookItem__element__body__bottom__korzinka__button active" : "bookItem__element__body__bottom__korzinka__button"}>
                                        <img src={data.baskets === 1 ? Korzinka : Korzinka} alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bookItem__mobil">
                <div className="bookItem__mobil__img">
                    <NavLink to={`/bookInfo/${data.name}/${data.id}`}>
                        <span>
                            <img src={`${data.image}`} alt="" />
                        </span>
                    </NavLink>
                </div>
                <div className="bookItem__mobil__text">
                    <h2>{data?.name}</h2>
                    <p>{data?.author?.name}</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BookItem