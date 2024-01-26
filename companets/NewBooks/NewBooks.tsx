import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch,useAppSelector } from "../../redux/hooks/hooks";
import { newBooksGet ,newBooksUserGet} from "../../redux/bookSlice/bookSlice";
import SliderItem from "../Slider/SliderItem";
import "./newBooks.scss"
const NewBooks: React.FC = () => {
    const req=window.location.search
    const dispatch=useAppDispatch()
    const {token}=useAppSelector(state=>state.loginSlice)
    const {newBooks}=useAppSelector(state=>state.bookSlice)
    React.useEffect(()=>{
        if(token){
            dispatch(newBooksUserGet(6))
        }
        if(!token){
            dispatch(newBooksGet(6))
        }
    },[req])
    return (
        <section className="newBooke">
            <div className="container">
                <div className="newBooke__items__title">
                    <h3>New Books</h3>
                    <NavLink to="/category/newbooks"><p>View All</p></NavLink>
                </div>
                <div className="newBooke__items">
                    <div className="newBooke__items__item">
                        {newBooks?
                        <SliderItem book={newBooks} />:""
                    }
                    </div>
                </div>
            </div>
        </section>
    )
}
export default NewBooks