import React, { Component } from "react";
import Slider from "react-slick";
import { useAppSelector } from "../../redux/hooks/hooks";
import rigthArrow from "../../assets/icon/rigth_arrow.png"
import StarFunction from "../ui/StarFunction/StarFunction"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./bookInRecomended.scss"
import bookImg from "../../assets/img/book.png"
import { NavLink } from "react-router-dom";
const BookInRecomended: React.FC = () => {
    const { oneBookCategoryBook } = useAppSelector((state => state.bookSlice))
    console.log(oneBookCategoryBook)
    const settings = {
        dots: true,
        Infinity: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 10000
    }
    return (
        <section className="bookRecoomendation">
            <div className="container">
                <div className="slider__items">
                    <Slider {...settings}>

                        {oneBookCategoryBook?.data?.books?.length === 1 ? "" :
                            oneBookCategoryBook?.data?.books?.map((el) => {
                                return (
                                    <NavLink to={`/bookInfo/${el.name}/${el.id}`} key={el.id}>
                                        <div className="bookReco">
                                            <div className="bookReco__baground">
                                                <div className="bookReco__baground__left">
                                                    <img src={el.image ? el.image : bookImg} alt="" />
                                                </div>
                                                <div className="bookReco__baground__rigth">
                                                    <h2>Kitob nomi:<span> {el.name}</span></h2>
                                                    <h2>Muallif:<span>  {el.author.name}</span></h2>
                                                    <h2>Kategoriya:<span>  {oneBookCategoryBook.data.name}</span></h2>
                                                    <div className="bookReco__baground__rigth__star">
                                                        <div className="bookReco__baground__rigth__star__flex">
                                                            <StarFunction width="14" rating={el.rating} />
                                                        </div>
                                                        <div className="bookReco__baground__rigth__star__text">
                                                            <p>12 sharhlar</p>
                                                        </div>
                                                    </div>

                                                    <p>{el.title}</p>
                                                    <div className="bookReco__baground__rigth__bottom">
                                                        <p>Batafsil</p>
                                                        <img src={rigthArrow} alt="" />
                                                    </div>
                                                </div>
                                                <div className="bookReco__baground__mobil">
                                                    <h2>{el.name}</h2>
                                                    <h3>{el.author.name}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                )
                            })
                        }

                    </Slider>
                </div>
            </div>
        </section>
    );
}
export default BookInRecomended