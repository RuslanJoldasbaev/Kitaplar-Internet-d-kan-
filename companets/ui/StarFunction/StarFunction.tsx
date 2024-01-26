import React from "react";
import starActive from "../../../assets/icon/starac.png"
import star from "../../../assets/icon/star.png"
import "./starFunction.scss"
interface IStar {
    rating: string | null,
    width:string
}
const StarFunction: React.FC<IStar> = ({ rating ,width}) => {
    if (!rating) {
        return <>
            <div  className={width==="14"?"star s14":"star"}>
                <img src={starActive} alt="" />
                <img src={starActive} alt="" />
                <img src={starActive} alt="" />
                <img src={starActive} alt="" />
                <img src={starActive} alt="" />
            </div>
        </>
    }

    const count = parseInt(rating)

    if (count > 4.5) {
        return (
            <div className={width==="14"?"star s14":"star"}>
                <img src={starActive} alt="" />
                <img src={starActive} alt="" />
                <img src={starActive} alt="" />
                <img src={starActive} alt="" />
                <img src={starActive} alt="" />
            </div>
        )
    }

    if (count > 3.5) {
        return (
            <div className={width==="14"?"star s14":"star"}>
                <img src={starActive} alt="" />
                <img src={starActive} alt="" />
                <img src={starActive} alt="" />
                <img src={starActive} alt="" />
                <img src={star} alt="" />
            </div>
        )
    }

    if (count > 2.5) {
        return (
            <div className={width==="14"?"star s14":"star"}>
                <img src={starActive} alt="" />
                <img src={starActive} alt="" />
                <img src={starActive} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
            </div>
        )
    }

    if (count > 1.5) {
        return (
            <div className={width==="14"?"star s14":"star"}>
                <img src={starActive} alt="" />
                <img src={starActive} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
            </div>
        )
    }

    if (count > .5) {
        return (
            <div className={width==="14"?"star s14":"star"}>
                <img src={starActive} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
            </div>
        )
    }
    return (
        <div className="star">
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
        </div>
    )

}
export default StarFunction