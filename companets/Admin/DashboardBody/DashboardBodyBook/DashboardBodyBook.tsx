import React from "react";
import { NavLink } from "react-router-dom";
import BookImg from "../../../../assets/img/book.png"
import { DashBooksGet } from "../../../../redux/admin/dashboardSlice/dashboardSlice";
import { useAppDispatch ,useAppSelector} from "../../../../redux/hooks/hooks";
const elemntuser=[
    1,
    2,
    3,
    4,
    5,
    6
]
const DashboardBodyBook:React.FC=()=>{
    const dispatch=useAppDispatch()
    const {newBooks}=useAppSelector(state=>state.dashboardSlice)
    React.useEffect(()=>{
        dispatch(DashBooksGet(6))
    },[])
    return(
        <div className="dashboardbody__element">
            <div className="dashboardbody__element__title">
                <h2>Eń sońǵı qosılǵan kitaplar  </h2>
                <NavLink to="/admin/books"><h3>View</h3></NavLink>
            </div>
            <div className="dashboardbody__element__body">
                <div className="dashboardbody__element__body__title">
                    <div className="dashboardbody__element__body__title__left">
                        <h3>Book name</h3>
                    </div>
                    <div className="dashboardbody__element__body__title__rigth">
                        <h3>Data</h3>
                    </div>
                </div>

                <div className="dashboardbody__element__body__items">
                    <ul className="dashboardbody__element__body__items__ul">
                        {newBooks?.data?
                        newBooks.data.map((el)=>{
                            return (
                                <li key={el.id}  className="dashboardbody__element__body__items__ul__li">
                                        <div className="dashboardbody__element__body__items__ul__li__left">
                                            <div className="dashboardbody__element__body__items__ul__li__left__img">
                                                <img src={el.image?`${el.image}`:BookImg} alt="" />
                                            </div>
                                            <div className="dashboardbody__element__body__items__ul__li__left__text">
                                                <h3>{el.name}</h3>
                                                <h4>{el.author.name}</h4>
                                            </div>
                                        </div>
                                        <div className="dashboardbody__element__body__items__ul__li__rigth">
                                            <h3>{el.created_at.split("T")[0]  + " "+ el.created_at.split("T")[1].split(".")[0] }</h3>
                                        </div>
                                    </li>
                            )
                        }
                        )
                        
                        :
                            elemntuser.map((el)=>{
                                return (
                                    <li key={el}  className="dashboardbody__element__body__items__ul__li">
                                        <div className="dashboardbody__element__body__items__ul__li__left">
                                            <div className="dashboardbody__element__body__items__ul__li__left__img">
                                                <img src={BookImg} alt="" />
                                            </div>
                                            <div className="dashboardbody__element__body__items__ul__li__left__text">
                                                <h3>Jenny Wilson</h3>
                                                <h4>Writer</h4>
                                            </div>
                                        </div>
                                        <div className="dashboardbody__element__body__items__ul__li__rigth">
                                            <h3>07.03.2023</h3>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default DashboardBodyBook