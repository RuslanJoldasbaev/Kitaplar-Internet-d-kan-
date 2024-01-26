import React from "react";
import Slider from "react-slick";
import ComentImg from "../../assets/img/comment1.png"
import DotsImg from "../../assets/img/dots.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./thougth.scss"
const Thought: React.FC = () => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="thougth">
            <div className="container">
                <div className="thougth__items">
                    <div className="thougth__items__slider">
                        <Slider {...settings}>

                            <div className="thougth__items__slider__element">
                                <div className="thougth__items__slider__element">
                                    <div className="thougth__items__slider__element__item">
                                        <div className="thougth__items__slider__element__item__img">
                                            <span>
                                                <img src={ComentImg} alt="" />
                                            </span>
                                            <div className="thougth__items__slider__element__item__img__dots">
                                                <img src={DotsImg} alt="" />
                                            </div>
                                        </div>
                                        <div className="thougth__items__slider__element__item__title">
                                            <h3>Eka Ardilah</h3>
                                        </div>
                                        <div className="thougth__items__slider__element__item__text">
                                            <p>I feel very helpful with all the books provided, so I do my job easily and happily</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="thougth__items__slider__element">
                                <div className="thougth__items__slider__element">
                                    <div className="thougth__items__slider__element__item">
                                        <div className="thougth__items__slider__element__item__img">
                                            <span>
                                                <img src={ComentImg} alt="" />
                                            </span>
                                            <div className="thougth__items__slider__element__item__img__dots">
                                                <img src={DotsImg} alt="" />
                                            </div>
                                        </div>
                                        <div className="thougth__items__slider__element__item__title">
                                            <h3>Eka Ardilah</h3>
                                        </div>
                                        <div className="thougth__items__slider__element__item__text">
                                            <p>I feel very helpful with all the books provided, so I do my job easily and happily</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="thougth__items__slider__element">
                                <div className="thougth__items__slider__element">
                                    <div className="thougth__items__slider__element__item">
                                        <div className="thougth__items__slider__element__item__img">
                                            <span>
                                                <img src={ComentImg} alt="" />
                                            </span>
                                            <div className="thougth__items__slider__element__item__img__dots">
                                                <img src={DotsImg} alt="" />
                                            </div>
                                        </div>
                                        <div className="thougth__items__slider__element__item__title">
                                            <h3>Eka Ardilah</h3>
                                        </div>
                                        <div className="thougth__items__slider__element__item__text">
                                            <p>I feel very helpful with all the books provided, so I do my job easily and happily</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="thougth__items__slider__element">
                                <div className="thougth__items__slider__element">
                                    <div className="thougth__items__slider__element__item">
                                        <div className="thougth__items__slider__element__item__img">
                                            <span>
                                                <img src={ComentImg} alt="" />
                                            </span>
                                            <div className="thougth__items__slider__element__item__img__dots">
                                                <img src={DotsImg} alt="" />
                                            </div>
                                        </div>
                                        <div className="thougth__items__slider__element__item__title">
                                            <h3>Eka Ardilah</h3>
                                        </div>
                                        <div className="thougth__items__slider__element__item__text">
                                            <p>I feel very helpful with all the books provided, so I do my job easily and happily</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Thought