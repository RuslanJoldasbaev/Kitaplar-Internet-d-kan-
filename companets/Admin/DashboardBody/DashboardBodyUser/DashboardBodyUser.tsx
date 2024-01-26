import React from "react";
import { NavLink } from "react-router-dom";
import Person from "../../../../assets/img/person.png"
import "./dashboardBodyUser.scss"
import { dashboardUserGet } from "../../../../redux/admin/dashboardSlice/dashboardSlice";
import { useAppDispatch,useAppSelector } from "../../../../redux/hooks/hooks";
const elemntuser=[
    1,
    2,
    3,
    4,
    5,
    6
]
const DashboardBodyUser: React.FC = () => {
    const dispatch=useAppDispatch()
    const req=window.location.search
    const {users}=useAppSelector(state=>state.dashboardSlice)
    React.useEffect(()=>{
        dispatch(dashboardUserGet(6))
    },[req])
    return (
        <div className="dashboardbody__element">
            <div className="dashboardbody__element__title">
                <h2>Aqırǵı qosılǵan paydalanıwshı </h2>
                <NavLink to="/admin/users"><h3>View</h3></NavLink>
            </div>
            <div className="dashboardbody__element__body">
                <div className="dashboardbody__element__body__title">
                    <div className="dashboardbody__element__body__title__left">
                        <h3>User name</h3>
                    </div>
                    <div className="dashboardbody__element__body__title__rigth">
                        <h3>Password</h3>
                    </div>
                </div>

                <div className="dashboardbody__element__body__items">
                    <ul className="dashboardbody__element__body__items__ul">
                        {users?.data?users.data.map((el)=>{
                            return(
                                <li key={el.id}  className="dashboardbody__element__body__items__ul__li">
                                        <div className="dashboardbody__element__body__items__ul__li__left">
                                            <div className="dashboardbody__element__body__items__ul__li__left__img">
                                                <img src={el.image? `${el.image}`: Person} alt="" />
                                            </div>
                                            <div className="dashboardbody__element__body__items__ul__li__left__text">
                                                <h3>{el.name}</h3>
                                                <h4>{el.phone}</h4>
                                            </div>
                                        </div>
                                        <div className="dashboardbody__element__body__items__ul__li__rigth">
                                            <h2>{el.role}</h2>
                                        </div>
                                    </li>
                            )
                        }):
                            elemntuser.map((el)=>{
                                return (
                                    <li key={el}  className="dashboardbody__element__body__items__ul__li">
                                        <div className="dashboardbody__element__body__items__ul__li__left">
                                            <div className="dashboardbody__element__body__items__ul__li__left__img">
                                                <img src={Person} alt="" />
                                            </div>
                                            <div className="dashboardbody__element__body__items__ul__li__left__text">
                                                <h3>Jenny Wilson</h3>
                                                <h4>Writer</h4>
                                            </div>
                                        </div>
                                        <div className="dashboardbody__element__body__items__ul__li__rigth">
                                            <h2>123456789</h2>
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
export default DashboardBodyUser