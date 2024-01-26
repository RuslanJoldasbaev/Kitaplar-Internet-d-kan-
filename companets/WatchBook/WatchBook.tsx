import React from "react";
import "./watchBook.scss"
const WatchBook:React.FC =()=>{
    return(
        <div className="watchbook">
            <div className="container">
                <div className="watchbook__item">
                    <div className="watchbook__item__centr">
                        <span className="watchbook__item__centr__title">
                            <h2>Recommended books from you to review</h2>
                        </span>
                        <div className="watchbook__item__centr__body">
                            <span className="watchbook__item__centr__body__input">
                                <input type="text" placeholder="write your recommendation"/>
                            </span>
                            <button className="watchbook__item__centr__body__btn">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WatchBook