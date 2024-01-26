import React from "react";
import SearchImg from "../../../../assets/icon/search.png"


const AdminAudioTitle: React.FC = () => {
    const hendeSearchBook = (value: string) => {
        console.log(value)
    }
    return (
        <div className="adminbook__title">
            <div className="adminbook__title__input">
                <span>
                    <img src={SearchImg} alt="" />
                </span>
                <input type="text" onChange={(el) => hendeSearchBook(el.target.value)} placeholder="Search for employee/project" />
            </div>
        </div>
    )
}

export default AdminAudioTitle