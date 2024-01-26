import React from "react";
import { NavLink } from "react-router-dom";
import InstagramIcon from "../../assets/icon/instagram.png"
import FaceBook from "../../assets/icon/facebook.png"
import "./footer.scss"

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__top">
                    <div className="footer__top__title">
                        <h2>
                            Review
                            <span>
                                Book
                            </span>
                        </h2>
                        <p>Is the best place to review a book</p>
                    </div>
                    <div className="footer__top__navigate">
                        <h2>Navigation</h2>
                        <NavLink to="/"><p>Home</p></NavLink>
                        <NavLink to="/"><p>Bestseller</p></NavLink>
                        <NavLink to="/"><p>Category</p></NavLink>
                        <NavLink to="/"><p>Community</p></NavLink>
                        <NavLink to="/"><p>Blog</p></NavLink>
                    </div>
                    <div className="footer__top__category">
                        <h2>Company</h2>
                        
                        <NavLink to="/">
                            <p>admin@reviewbook.com</p>
                        </NavLink>
                        <NavLink to="/">
                            <p>Jln. Stiabudhi No. 193</p>
                        </NavLink>
                        <NavLink to="/">
                            <p>Bandung Indonesia</p>
                        </NavLink>
                    </div>
                </div>
                <div className="footer__bottom">
                    <NavLink to="">
                        <p>© 2021 ReviewBook. All rights reserved.</p>
                    </NavLink>
                    <div className="footer__bottom__icon">
                        <div className="footer__bottom__icon__img">
                            <img src={InstagramIcon} alt="" />
                        </div>
                        <div className="footer__bottom__icon__img">
                            <img src={FaceBook} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer