import React,{FC} from "react";
import { Skeleton } from "antd";
import ActivStarImg from "../../../assets/icon/star.png"
import BookItemLoading from "../../BookItem/BookItemLoading";
const book=[1,2,3,4,5,6]
const CategoryRigthLoading:FC=()=>{
    return(
        <div className="categoryfull__body__rigth">
                    {
                        book.map((el) => {
                            return <div className="categoryfull__body__rigth__item" key={el}>
                                <div className="categoryfull__body__rigth__item__desktop">
                                    <BookItemLoading />
                                </div>
                                <div className="categoryfull__body__rigth__item__mobil">
                                    <div className="categoryfull__body__rigth__item__mobil__img">
                                        <Skeleton.Image/>
                                    </div>
                                    <div className="categoryfull__body__rigth__item__mobil__rigth">
                                        <h3>The Heart of Hell</h3>
                                        <p>Mitch Weiss</p>
                                        <div className="categoryfull__body__rigth__item__mobil__rigth__star">
                                            <img src={ActivStarImg} alt="" />
                                            <img src={ActivStarImg} alt="" />
                                            <img src={ActivStarImg} alt="" />
                                            <img src={ActivStarImg} alt="" />
                                            <img src={ActivStarImg} alt="" />
                                        </div>
                                        <div className="categoryfull__body__rigth__item__mobil__rigth__button">
                                            <button>
                                                Add to cart
                                            </button>
                                            <button>
                                                Add to wishlist
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
    )
}

export default CategoryRigthLoading