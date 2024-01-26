import React from "react";
import SearchImg from "../../assets/icon/search.png"
import FilterImg from "../../assets/icon/filter.png"

const KorzinaTitle: React.FC = () => {

    return (
        <div className="korzina__title">
            <div className="korzina__title__mobil">
                <span className="korzina__title__mobil__search">
                    <img src={SearchImg} alt="" />
                </span>
                <input type="text" placeholder="Search Books, Authors, or ISBN" />
                <span className="korzina__title__mobil__filter">
                    <img src={FilterImg} alt="" />
                </span>
            </div>
            <h2>Meniń kitaplarım </h2>
        </div >
    )
}

export default KorzinaTitle