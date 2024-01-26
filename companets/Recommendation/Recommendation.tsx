import React from "react"
import { NavLink } from "react-router-dom"
import { recomendationGet ,userRecomendationGet} from "../../redux/bookSlice/bookSlice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks"
import SliderItem from "../Slider/SliderItem"
import Slider from "react-slick";
import "./recommendation.scss"
const Recommendation: React.FC = () => {
    const req = window.location.search
    const dispatch = useAppDispatch()
    const { recomen } = useAppSelector(state => state.bookSlice)
    const { token } = useAppSelector(state => state.loginSlice)
    const settings = {
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 1,
    };

    React.useEffect(() => {
        if (token) {
            dispatch(userRecomendationGet(6))
        }
        if(!token) {
            dispatch(recomendationGet(6))
        }
    }, [req])
    return (
        <div className="recomen">
            <div className="container">
                <div className="recomen__title">
                    <h3>Recommendations</h3>
                    <NavLink to="/category/recommendations"><p>View All</p></NavLink>
                </div>
                <div className="recomen__items">
                    <div className="recomen__items__item">
                        {recomen?
                        <SliderItem book={recomen} />:""
}
                    </div>
                </div>
            </div>


            {/* Mobil vsersiya  */}
            <div className="recomen__mobil">
                <Slider {...settings}>
                    {
                        recomen?.data?.map(el => {
                            return (
                                <div className="recomen__mobil__item" key={el.id}>
                                    <NavLink to={`/bookInfo/${el.name}/${el.id}`}>
                                        <div className="recomen__mobil__item__img">
                                            <span>
                                                <img src={`${el.image}`} alt="" />
                                            </span>
                                        </div>
                                    </NavLink>

                                    <div className="recomen__mobil__item__text">
                                        <h2>{el.name}</h2>
                                        <p>{el.author?.name}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}
export default Recommendation