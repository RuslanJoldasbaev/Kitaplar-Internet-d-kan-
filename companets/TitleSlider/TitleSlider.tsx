import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { setPageReducers } from "../../redux/pageSlice/pageSlice";
import { discountGet } from "../../redux/discountSlice/discountSlice";
import Slider from "react-slick";
import ImgTitle1 from "../../assets/slider_title/1.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./titleSlider.scss"
import { tile2LatLng } from "google-map-react";
const SimpleSlider: React.FC = () => {
    const req = window.location.search
    const data = [1, 2, 3, 4, 5, 6, 7, 8]
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        cssEase: 'linear'
    };
    const { discount, loading } = useAppSelector(state => state.discountSlice)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(discountGet())
        dispatch(setPageReducers(1))
    }, [req])
    return (
        <section>
            <div className="container">
                <div className="slideritem">
                    <Slider {...settings}>
                        {
                            loading ?
                                data.map((el) => {
                                    return (
                                        <div className="slideritem__item" key={el}>
                                            <div>
                                                <div className="slideritem__item__body">
                                                </div>
                                                <div className="slideritem__item__img">
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                discount?.data?.map((el) => {
                                    return (
                                        <div className="slideritem__item" key={el.id}>
                                            <img src={el.image} className="slideritem__item__baground" alt="" />
                                            <div className="slideritem__item__body">
                                                <h2>{el.amount} %<br />aksiyada </h2>
                                                <p>{el.name}</p>
                                                <div className="slideritem__item__body__btn">
                                                    <button>READ NOW</button>
                                                </div>
                                            </div>
                                            <div className="slideritem__item__img">
                                                <img src={el.image} alt="" />
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </Slider>
                </div>
            </div>


        </section>
    );
}

export default SimpleSlider