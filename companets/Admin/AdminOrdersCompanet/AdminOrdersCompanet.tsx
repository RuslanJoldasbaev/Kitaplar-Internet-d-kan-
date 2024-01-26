import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { adminOrdersGet, adminOrdersUpdate, deleteOrders, ordersAllGet } from "../../../redux/admin/adminOrdersSlice/adminOrdersSlice";
import { categoryReducers } from "../../../redux/admin/dashboardSlice/dashboardSlice";
import AdminPagination from "../AdminPagination/AdminPagination";
import SearchImg from "../../../assets/icon/search.png"
import "./adminOrder.scss"
const AdminOrdersCompanet: React.FC = () => {
    const dispatch = useAppDispatch()
    const req = window.location.search
    const { order, orderupdate, deletemassge, total,deleteLoading } = useAppSelector(state => state.adminOrdersSlice)
    const [id,setId]=React.useState(0)
    const [page, setPage] = React.useState(1)
    const hendeSearchBook = (value: string) => {
        console.log(value)
    }
    const excelectClick = (id: number) => {
        dispatch(adminOrdersUpdate(id))
    }
    const deleteClick = (id: number) => {
        setId(id)
        dispatch(deleteOrders(id))
    }
    React.useEffect(() => {
        dispatch(adminOrdersGet({ limit: 10, page: page }))
        dispatch(categoryReducers(4))
        dispatch(ordersAllGet())
    }, [req || orderupdate])

    React.useEffect(() => {
        dispatch(adminOrdersGet({ limit: 10, page: page }))
    }, [page])

    React.useEffect(() => {
        if (deletemassge) {
            dispatch(adminOrdersGet({ limit: 10, page: page }))
        }
    }, [deletemassge])
    return (
        <div className="orders">
            <div className="orders__title">
                <span>
                    <img src={SearchImg} alt="" />
                </span>
                <input type="text" onChange={(el) => hendeSearchBook(el.target.value)} placeholder="Search for employee/project" />
            </div>
            <div className="orders__body">
                <h2>buyirtpalar</h2>
                <div className="orders__body__title">
                    <div className="orders__body__title__left">
                        <p>user name</p>
                        <p>book name</p>
                    </div>
                    <div className="orders__body__title__rigth">
                        <p>data</p>
                        <p>oshiriw</p>
                        <p>tasirildi</p>
                    </div>
                </div>
                <div className="orders__body__book">
                    <ul className="orders__body__book__ul">
                        {
                            order?.data?.map((el) => {
                                return (
                                    <li className="orders__body__book__ul__li" key={el.id}>
                                        <div className="orders__body__book__ul__li__left">
                                            <div className="orders__body__book__ul__li__left__book">
                                                <div className="orders__body__book__ul__li__left__name">
                                                    <h2>{el.user.name}</h2>
                                                    <h3>{el.user.phone}</h3>
                                                </div>
                                            </div>

                                            <div className="orders__body__book__ul__li__left__count">
                                                <strong>{el.book.name}</strong>
                                            </div>
                                        </div>

                                        <div className="orders__body__book__ul__li__rigth">
                                            <div className="orders__body__book__ul__li__rigth__text">
                                                <p>{el.created_at?.split("T")[1].split(".")[0] + " " + el.created_at?.split("T")[0]}</p>
                                            </div>
                                            <div className="orders__body__book__ul__li__rigth__delete">
                                                {el.status === "1" ? "" :
                                                    <button className={deleteLoading&&id===el.id?"active":""} onClick={() => deleteClick(el.id)}>{deleteLoading&&id===el.id?` loading`:"delete"}</button>
                                                }
                                            </div>
                                            <div className="orders__body__book__ul__li__rigth__edit">
                                                <button onClick={() => excelectClick(el.id)} >{el.status === "1" ? "kitap berildi" : "tapsiriw"}</button>
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

export default AdminOrdersCompanet