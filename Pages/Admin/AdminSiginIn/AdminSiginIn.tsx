import React from "react";
import "./adminSiginIn.scss"
const AdminSiginIn: React.FC = () => {
    const basti = () => {

    }
    return (
        <div className="adminSiginIn">
            <div className="main">
                <div className="container">
                    <div className="form">
                        <h2>Creat accaunt</h2>
                        <i className="fa-brands fa-instagram"></i>
                        <div className="form__input">
                            <input type="text" placeholder="Name" className="name" />
                        </div>
                        <h3 className="name3">atinizdi jazin'</h3>
                        <div className="form__input">
                            <input type="text" placeholder="Email" className="email" />
                        </div>

                        <h3 className="name2">tomendegi koriniste jazin' Email@gmail.com</h3>
                        <div className="form__input">
                            <input type="password" placeholder="password" className="pasword" />

                        </div>
                        <h3 className="name1">minimom 8 element boliwi kerek</h3>
                        <button className="button" onClick={basti} type="submit">SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminSiginIn