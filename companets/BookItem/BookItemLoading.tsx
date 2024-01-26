import React, { FC } from "react";
import StarFunction from "../ui/StarFunction/StarFunction";
import { Skeleton } from "antd";
import Like from "../../assets/icon/love.png"
const BookItemLoading: FC = () => {
    return (
        <React.Fragment>
            <div className="bookItem">
                <div className="bookItem__element">
                    <div>
                        <div className="bookItem__element__title">
                            <span className="bookItem__element__title__img">
                                <Skeleton.Image />
                            </span>
                        </div>
                        <div className="bookItem__element__body">
                            <div className="bookItem__element__body__like">
                                <div className="bookItem__element__body__like__loading"></div>
                                <img src={Like} alt="" />
                            </div>
                            <div className="bookItem__element__body__star">
                                <StarFunction rating="3" width="14" />
                            </div>
                            <div className="bookItem__element__body__text">
                                <div className="bookItem__element__body__text__loading"></div>
                            </div>
                            <div className="bookItem__element__body__bottom">
                                <div className="bookItem__element__body__bottom__sena">
                                    <div className="bookItem__element__body__bottom__sena__loading">
                                    </div>
                                </div>
                                <div className="bookItem__element__body__bottom__korzinka">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bookItem__mobil">
                <div className="bookItem__mobil__img">
                    <span>
                        <Skeleton.Image />
                    </span>
                </div>
                <div className="bookItem__mobil__text">
                    <h2>Fatherhood</h2>
                    <p>by Christopher Wilson</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BookItemLoading