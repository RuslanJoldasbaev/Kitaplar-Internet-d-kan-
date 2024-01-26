import React from "react";
import BookItem from "../BookItem/BookItem";
import { IPopular } from "../../redux/bookSlice/typebook";
import BookItemLoading from "../BookItem/BookItemLoading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./skiderItem.scss"
const data = [1, 2, 3, 4, 5, 6]
interface INprops {
  book: IPopular
}
const SliderItem: React.FC<INprops> = ({ book }) => {
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 10000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <section className="slider">
      <div className="container">
        <div className="slider__items">
          <Slider {...settings}>
            {
              book?.data?.length > 0 ?
                book.data.map((el) => {
                  return (
                    <BookItem key={el.id} data={el} />
                  )
                }) :
                data.map((el) => {
                  return (
                    <BookItemLoading key={el} />
                  )
                })
            }
          </Slider>
        </div>
      </div>
    </section>
  );
}
export default SliderItem