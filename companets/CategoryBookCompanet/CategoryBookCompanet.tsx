import React from "react";
import { useParams } from "react-router-dom";
import CategoryBookTitle from "./CategoryBookTitle";
import CategoryRigthItem from "./CategoryRigthItems";
import Filter from "../Filter/Filter";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { categoryAllBooksGet,allBooksGet } from "../../redux/allBooksSlice/allBooksSlice";
import { setPageReducers } from "../../redux/pageSlice/pageSlice";
import SearchImg from "../../assets/icon/search.png"
import filterImg from "../../assets/icon/filter.png"
import "./categoryBook.scss"
const CategoryBookCompanet: React.FC = () => {
    const dispatch = useAppDispatch()
    const [modal,setModal]=React.useState(false)
    const { category_name } = useParams()
    const req=window.location.search
    const {janr}=useAppSelector(state=>state.categorySlice)
    React.useEffect(() => {
        dispatch(allBooksGet({limit:6,page:1}))
        dispatch(setPageReducers(4))
    }, [req])
    React.useEffect(() => {
        if (janr) {
            dispatch(categoryAllBooksGet({ id: janr, limit: 6 ,page:1}))
        }
    }, [janr])
    return (
        <div className="categoryfull">
            <div className="container">
                <div className="categoryfull__title">
                    <h2>Home/<span>{category_name} </span></h2>
                </div>
                <div className="categoryfull__mobil">
                    <div className="categoryfull__mobil__left">
                        <div className="categoryfull__mobil__left__input">
                            <span className="categoryfull__mobil__left__input__search">
                                <img src={SearchImg} alt="" />
                            </span>
                            <input type="text" placeholder="kitabinizdi izlew" />
                            <span className="categoryfull__mobil__left__input__filter" onClick={()=>setModal(true)}>
                                <img src={filterImg} alt="" />
                            </span>
                        </div>
                    </div>
                    <div className="categoryfull__mobil__rigth">
                        cancel
                    </div>
                </div>
                <div className="categoryfull__body">
                    <CategoryBookTitle  />
                    <CategoryRigthItem />
                </div>
                <Filter modal={modal} setModal={setModal}/>
            </div>
        </div>
    )
}
export default CategoryBookCompanet