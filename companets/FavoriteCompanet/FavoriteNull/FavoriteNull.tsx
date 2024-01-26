import React from "react";
import NullImg from "../../../assets/img/favoriteBook.webp"
import "./favoritenull.scss"
const FavoriteNull: React.FC = () => {
    return (
        <div className="favoritenull">
            <img src={NullImg} alt="" />
            <h2>ozinizge unag'an kitaplarinizdi saqlap qoyiw ushin</h2>
        </div>
    )
}

export default FavoriteNull