import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { usersAdminGet, addAdminPost, deleteAdminUser, allusersTotal } from "../../../redux/admin/usersAdminSlice/usersAdminSlice";
import { categoryReducers } from "../../../redux/admin/dashboardSlice/dashboardSlice";
import AdminPagination from "../AdminPagination/AdminPagination";
import SearchImg from "../../../assets/icon/search.png"
import userImg from '../../../assets/icon/user_img.png'

import "./adminCompanetUser.scss"
const AdminCompanetUser: React.FC = () => {
    const req = window.location.search
    const dispatch = useAppDispatch()
    const [id,setId]=React.useState(0)
    const { users, total, deleteAdmin, adminPost,deleteLoading } = useAppSelector(state => state.usersAdminSlice)
    const { user } = useAppSelector(state => state.userAdminSlice)
    const [page, setPage] = React.useState(1)
    const addAdmin = (id: number) => {
        if (user?.data.role === "super-admin") {
            return dispatch(addAdminPost({ user_id: id }))
        }
    }
    const deleteAdminBtn = (id: number) => {
        if (user?.data.role === "super-admin") {
            setId(id)
            dispatch(deleteAdminUser(id))
        }
    }
    const hendeSearchBook = (item: string) => {

    }
    React.useEffect(() => {
        dispatch(categoryReducers(2))
        dispatch(usersAdminGet({ limit: 10, page: page }))
        dispatch(allusersTotal())
    }, [req])

    React.useEffect(() => {
        if (adminPost?.message) {
            dispatch(usersAdminGet({ limit: 10, page: page }))
        }
    }, [adminPost?.message])

    React.useEffect(() => {
        if (deleteAdmin?.message) {
            dispatch(usersAdminGet({ limit: 10, page: page }))
        }
    }, [deleteAdmin?.message])

    React.useEffect(() => {
        dispatch(usersAdminGet({ limit: 10, page: page }))
    }, [page])
    return (
        <div className="adminuser">
            <div className="adminuser__title">
                <span>
                    <img src={SearchImg} alt="" />
                </span>
                <input type="text" onChange={(el) => hendeSearchBook(el.target.value)} placeholder="Search for employee/project" />
            </div>



            <div className="adminuser__body">
                <h2>Paydalaniwshilar </h2>

                <div className="adminuser__body__title">
                    <div className="adminuser__body__title__left">
                        <p>user name</p>
                        <p>user type</p>
                    </div>
                    <div className="adminuser__body__title__rigth">

                    </div>
                </div>

                <div className="adminuser__body__book">
                    <ul className="adminuser__body__book__ul">
                        {
                            users?.data?.map((el) => {
                                return (
                                    <li className="adminuser__body__book__ul__li" key={el.id}>
                                        <div className="adminuser__body__book__ul__li__left">
                                            <div className="adminuser__body__book__ul__li__left__book">
                                                <div className="adminuser__body__book__ul__li__left__book__img">
                                                    <span>
                                                        <img src={el.image ? `${el.image}` : userImg} alt="" />
                                                    </span>
                                                </div>
                                                <div className="adminuser__body__book__ul__li__left__name">
                                                    <h2>{el.name}</h2>
                                                    <h3>{el.phone}</h3>
                                                </div>
                                            </div>

                                            <div className="adminuser__body__book__ul__li__left__count">
                                                <strong>{el.role}</strong>
                                            </div>
                                        </div>

                                        <div className="adminuser__body__book__ul__li__rigth">
                                            <div className="adminuser__body__book__ul__li__rigth__edit">
                                                <button onClick={() => addAdmin(el.id)}>admin</button>
                                            </div>
                                            <div className="adminuser__body__book__ul__li__rigth__delete">
                                                <button className={id===el.id&&deleteLoading?"active":""} onClick={() => deleteAdminBtn(el.id)}> delete admin</button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <AdminPagination total={total} page={page} setPage={setPage} />
            </div>

        </div>
    )
}
export default AdminCompanetUser