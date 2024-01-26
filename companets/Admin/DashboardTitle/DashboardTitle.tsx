import React from "react";
import { useAppDispatch ,useAppSelector} from "../../../redux/hooks/hooks";
import MenuImg from "../../../assets/icon/main_admin.png"
import Search from "../../../assets/icon/search.png";
import userImg from '../../../assets/icon/user_img.png'
import { userGet } from "../../../redux/admin/userAdminSlice/userAdminSlice";
import "./dashboardtitle.scss"

const DashboardTitle: React.FC = () => {
    const dispatch=useAppDispatch()
    const req=window.location.search
    const {user}=useAppSelector(state=>state.userAdminSlice)
    React.useEffect(()=>{
        dispatch(userGet())
    },[req])
    return (
        <div className="dashboardTitle">
            <div className="dashboardTitle__left">
                <div className="dashboardTitle__left__menu">
                    <img src={MenuImg} alt="" />
                </div>
                <div className="dashboardTitle__left__input">
                    <span>
                        <img src={Search} alt="" />
                    </span>
                    <input type="text" placeholder="Search for employee/project" />
                </div>
            </div>
            <div className="dashboardTitle__rigth">
                <div className="dashboardTitle__rigth__img">
                    <img src={user?.data?.image?`${user.data.image}`:userImg} alt="" />
                </div>
                <div className="dashboardTitle__rigth__name">
                    <p>{user?.data?.name}</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardTitle