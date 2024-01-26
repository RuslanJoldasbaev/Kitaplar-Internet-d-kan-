import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { comentPost } from "../../redux/comentSlice/comentSlice";
import { comentInfoGet, comentsGet } from "../../redux/comentSlice/comentSlice";
import { useNavigate } from "react-router-dom";
import Coments from "./Coments/Coments";
import starImg from "../../assets/icon/star.png"
import starActiveImg from "../../assets/icon/starac.png"
import blackStar from "../../assets/icon/black_star.png"
import blackUser from "../../assets/icon/black_user.png"
import NoActiveStar from "../../assets/icon/noActiveStar.png"
import "./comentary.scss"
const Comentary: React.FC = () => {
    const { id } = useParams()
    const [messageApi, contextHolder] = message.useMessage()
    const history=useNavigate()
    const warning = (el: string) => {
        messageApi.open({
            type: 'warning',
            content: `${el}`,
        });
    };
    const dispatch = useAppDispatch()
    const { infoComent, postComent } = useAppSelector((state) => state.comentSlice)
    const {token}=useAppSelector(state=>state.loginSlice)
    const [comentValue, setComentValue] = React.useState("")
    const comLength = comentValue.split('')
    const [rating, setRating] = React.useState("")
    const [star, setStar] = React.useState([] as number[])
    const [nostar, setNoStar] = React.useState([1, 2, 3, 4, 5] as number[])

    const starClick = (number: number) => {
        setRating(`${number}`)
        setStar([])
        setNoStar([1, 2, 3, 4, 5])
        for (let i = 1; i <= number; i++) {
            setStar((prev) => [...prev, i])
        }
        setNoStar((prev) => prev.filter((el, index) => {
            if (el > number) {
                return el
            }
        }))
    }

    const comentsChange = (value: string) => {
        setComentValue(value)
    }

    const hendeleClick = () => {
        if(!token){
            history("/signup")
        }
        if (!id || !comentValue) {
            return warning("coment jazin'")
        }
        if (!rating) {
            return warning("reting belgilen'")
        }
        return dispatch(comentPost({
            comment: comentValue,
            book_id: id,
            rating: rating
        }))
    }

    React.useEffect(() => {
        if (id) {
            dispatch(comentInfoGet(id))
        }
    }, [id])

    React.useEffect(() => {
        if (postComent && id) {
            dispatch(comentsGet(id))
        }
    }, [postComent])
    return (
        <React.Fragment>
            {contextHolder}
            <section className="comentary">
                <div className="container">
                    <div className="coment">

                        <div className="coment__title">
                            <div className="coment__title__text1 active">
                                <p>Sharhlar</p>
                            </div>
                            <div className="coment__title__text1">
                                <p>Kitob haqida</p>
                            </div>

                            <div className="coment__title__mobil">
                                <h4>Sharhlar</h4>
                            </div>

                        </div>

                        <div className="coment__body">

                            <div className="coment__body__title">
                                <div className="coment__body__title__left">
                                    <h2>{infoComent?.data?.rating ? Math.round(parseInt(infoComent.data.rating)) : ""}</h2>
                                    <div className="coment__body__title__left__star">
                                        <img src={starActiveImg} alt="" />
                                        <img src={starActiveImg} alt="" />
                                        <img src={starActiveImg} alt="" />
                                        <img src={starActiveImg} alt="" />
                                        <img src={starImg} alt="" />
                                    </div>
                                </div>
                                <div className="coment__body__title__rigth">
                                    <div className="coment__body__title__rigth__star">
                                        <span>
                                            <img src={blackStar} alt="" />
                                        </span>
                                        <p>{infoComent?.data?.comments_count}</p>
                                    </div>
                                    <div className="coment__body__title__rigth__user">
                                        <span>
                                            <img src={blackUser} alt="" />
                                        </span>
                                        <p>{infoComent?.data?.clicks}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="coment__body__iam">
                                <div className="coment__body__iam__left">
                                    <div className="coment__body__iam__left__star">
                                        {
                                            star.map((el) => {
                                                return <img src={starActiveImg} alt="" className="active" key={el} onClick={() => starClick(el)} />
                                            })
                                        }
                                        {
                                            nostar.map((el) => {
                                                return <img src={NoActiveStar} alt="" onClick={() => starClick(el)} key={el} />
                                            })
                                        }
                                    </div>
                                    <div className="coment__body__iam__left__item">
                                        <div className="coment__body__iam__left__item__user">
                                            <span>
                                                A
                                            </span>
                                        </div>

                                        <div className="coment__body__iam__left__item__input">
                                            <textarea className="coment__body__iam__left__item__input__textarea"
                                                id="w3review" name="pikirinizdi jazin" rows={3} cols={50} maxLength={500}
                                                onChange={(el) => comentsChange(el.target.value)}
                                            >



                                            </textarea>

                                            <textarea className="coment__body__iam__left__item__input__480__textarea"
                                                id="w3review" name="pikirinizdi jazin" rows={2} cols={25} maxLength={500}
                                                onChange={(el) => comentsChange(el.target.value)}
                                            >

                                            </textarea>

                                            <textarea className="coment__body__iam__left__item__input__mobil__textaerea"
                                                id="w3review" name="pikirinizdi jazin" rows={2} cols={15} maxLength={500}
                                                onChange={(el) => comentsChange(el.target.value)}
                                            >

                                            </textarea>
                                            <p>{comLength.length}/700</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="coment__body__iam__rigth">
                                    <button onClick={hendeleClick}>
                                        send
                                    </button>
                                </div>
                            </div>

                            <Coments />
                        </div>

                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default Comentary