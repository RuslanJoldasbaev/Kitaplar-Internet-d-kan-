import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { oneBookGet, oneBookCategoryGet } from "../../redux/bookSlice/bookSlice";
import { useParams, useNavigate } from "react-router-dom";
import { korzinaPost } from "../../redux/korzinaSlice/korzinaSlice";
import StarFunction from "../ui/StarFunction/StarFunction";
import Korzinka from "../../assets/icon/korzinka.png"
import { orderReducers } from "../../redux/orderSlice/orderSlice";
import { setPageReducers } from "../../redux/pageSlice/pageSlice";
import leftArrow from "../../assets/icon/left_arrow.png"
import SearchImg from "../../assets/icon/search.png"
import ShareImg from "../../assets/icon/share_black.png"
import LikeImg from "../../assets/icon/love.png"
import LikeActiveImg from "../../assets/icon/loveactive.png"
import "./bookFullInfo.scss"
const BookFullInfo: React.FC = () => {
    const [data, setData] = React.useState({} as {
        id: number;
        name: string;
        author: {
            id: number,
            name: string
        },
        title: string;
        price: string;
        categories: {
            id: number;
            name: string;
        }[];
        image: string;
        audio: string;
        rating: string | null;
        baskets: number;
        favorite: number;
        comments: number;
    })
    const dispatch = useAppDispatch()
    const history = useNavigate()
    const { name, id } = useParams()
    const { oneBook } = useAppSelector(state => state.bookSlice)
    const { token } = useAppSelector(state => state.loginSlice)

    const [likeBtn, setLikeBtn] = React.useState(false)
    const req = window.location.search
    const LikeClick = () => {
        if (likeBtn) {
            setLikeBtn(false)
        }
        if (!likeBtn) {
            setLikeBtn(true)
        }
    }

    const buyBook = (id: number) => {
        if(!token){
            return history("/signup")
        }
        dispatch(orderReducers(id))
        history("/order")
    }
    const korzinaClick = () => {
        if (token) {
            if (id) {
                return dispatch(korzinaPost({ book_id: parseInt(id) }))
            }
            return
        }
        return history("/signup")
    }
    React.useEffect(() => {
        if (id) {
            dispatch(setPageReducers(4))
            dispatch(oneBookGet(id))
            
        }
    }
        , [req, id])
    React.useEffect(() => {
        if (oneBook?.data) {
            setData(oneBook.data)
        }
    }, [oneBook,])


    React.useEffect(() => {
        if (oneBook?.data?.categories[0].id) {
            dispatch(oneBookCategoryGet(oneBook.data.categories[0].id))
        }
    }, [oneBook?.data?.id])

    return (
        <div className="bookfullInfo">
            <div className="container">

                <div className="bookfullInfo__title">
                    <h2>Home/ <span>{name}</span> </h2>
                    <div className="bookfullInfo__title__mobil">
                        <div className="bookfullInfo__title__mobil__left">
                            <img src={leftArrow} alt="" />
                        </div>

                        {/* Mobil Title  */}

                        <div className="bookfullInfo__title__mobil__rigth">
                            <ul className="bookfullInfo__title__mobil__rigth__ul">
                                <li className="bookfullInfo__title__mobil__rigth__ul__li">
                                    <img src={SearchImg} alt="" />
                                </li>
                                <li className="bookfullInfo__title__mobil__rigth__ul__li" onClick={LikeClick}>
                                    <img src={oneBook ? LikeActiveImg : LikeImg} alt="" />
                                </li>
                                <li className="bookfullInfo__title__mobil__rigth__ul__li">
                                    <img src={ShareImg} alt="" />
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                {data ?
                    <div className="bookfullInfo__item">
                        <div className="bookfullInfo__item__left">
                            <div className="bookfullInfo__item__left__card">
                                <span className="bookfullInfo__item__left__card__img">
                                    <img src={`${data.image}`} alt="" />
                                </span>
                            </div>

                        </div>
                        <div className="bookfullInfo__item__rigth">
                            <div className="bookfullInfo__item__rigth__about">
                                <h2>Kitob nomi: <span>{data.name}</span></h2>
                                <h2>Muallif: <span>{data.author?.name}</span></h2>
                                <h2>Kategoriya: <span>{data.categories?.length > 0 ? data.categories[0].name : ""}</span></h2>
                            </div>
                            <div className="bookfullInfo__item__rigth__sena">
                                <h3>Narxi: {data.price} UZS</h3>
                            </div>
                            <div className="bookfullInfo__item__rigth__star">
                                <StarFunction rating={data.rating} width="20" />
                                <div className="bookfullInfo__item__rigth__star__text">
                                    <p>{data.comments} sharhlar</p>
                                    <div className="bookfullInfo__item__rigth__star__text__mobil">
                                        <h4>{Math.round(parseInt(data.rating ? data.rating : "5"))}.0</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="bookfullInfo__item__rigth__opicayne">
                                <p>{data.title}</p>
                            </div>
                            <div className="bookfullInfo__item__rigth__btn">
                                <button onClick={() => korzinaClick()}><img src={Korzinka} alt="" /> Add to Card</button>
                                <button onClick={() => buyBook(data.id)}> santip aliw</button>
                            </div>
                        </div>
                    </div> : ""
                }
                <div className="bookfullInfo__body">
                    <div className="bookfullInfo__body__btn">
                        <button onClick={() => korzinaClick()}>Add to card</button>
                    </div>
                    <h2>Kitob haqida</h2>
                    <p>Integer amet faucibus imperdiet mauris ultrices ut metus elementum. Vitae nulla sapien sed eget vel purus sed. Cursus feugiat sit pretium auctor a sed. Habitant lacus pellentesque id convallis ultricies luctus.</p>
                </div>

            </div>
        </div>
    )
}
export default BookFullInfo