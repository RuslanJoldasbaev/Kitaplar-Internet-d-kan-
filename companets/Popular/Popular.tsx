import React from "react";
import { NavLink } from "react-router-dom";
import SliderItem from "../Slider/SliderItem";
import { popularGet, userPopularGet } from "../../redux/bookSlice/bookSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import "./popular.scss"
const Popular: React.FC = () => {
    const dispatch = useAppDispatch()
    const req = window.location.search
    const { popular } = useAppSelector(state => state.bookSlice)
    const { token } = useAppSelector(state => state.loginSlice)
    React.useEffect(() => {
        if (token) {
            dispatch(userPopularGet(6))
        }
        if (!token) {
            dispatch(popularGet(6))
        }
    }, [req])
    return (
        <div className="popular">
            <div className="container">
                <div className="popular__items__title">
                    <h3>Popular</h3>
                    <NavLink to="/category/popular"><p>View All</p></NavLink>
                </div>
                <div className="popular__items">
                    <div className="popular__items__item">
                        {
                            popular ? <SliderItem book={popular} /> : ""
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Popular