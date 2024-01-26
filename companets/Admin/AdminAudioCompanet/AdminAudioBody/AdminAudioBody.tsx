import React from "react";
import { allBooksAdminGet, totalBookGet } from "../../../../redux/admin/adminBooksSlice/adminBooksSlice";
import { categoryReducers } from "../../../../redux/admin/dashboardSlice/dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { useNavigate, useParams } from "react-router-dom";
import AdminPagination from "../../AdminPagination/AdminPagination";
const AdminAudioBody: React.FC = () => {
    const [page, setPage] = React.useState(1)
    const {id}=useParams()
    const req = window.location.search
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { books, postBook, total } = useAppSelector(state => state.adminBooksSlice)


    const editBook = (id: number) => {
        navigate(`/admin/audio/${id}`)
    }
    React.useEffect(() => {
        dispatch(categoryReducers(8))
        dispatch(allBooksAdminGet({ limit: 10, page: page }))
        dispatch(totalBookGet())
    }, [req || postBook])

    React.useEffect(() => {
        dispatch(allBooksAdminGet({ limit: 10, page: page }))
        dispatch(totalBookGet())
    }, [page])


    return (
        <div className="adminbook__body">
            <h2>Kitaplar </h2>

            <div className="adminbook__body__title">
                <div className="adminbook__body__title__left">
                    <p>Book name</p>
                </div>
                <div className="adminbook__body__title__rigth">

                </div>
            </div>

            <div className="adminbook__body__book">
                <ul className="adminbook__body__book__ul">
                    {
                        books?.data?.map((el) => {
                            return (
                                <li className="adminbook__body__book__ul__li" key={el.id}>
                                    <div className="adminbook__body__book__ul__li__left">
                                        <div className="adminbook__body__book__ul__li__left__book">
                                            <div className="adminbook__body__book__ul__li__left__book__img">
                                                <span>
                                                    <img src={el.image ? `${el.image}` : ""} alt="" />
                                                </span>
                                            </div>
                                            <div className="adminbook__body__book__ul__li__left__name">
                                                <h2>{el.name}</h2>
                                                <h3>{el.author.name}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="adminbook__body__book__ul__li__rigth">
                                        <div className="adminbook__body__book__ul__li__rigth__edit">
                                            <button onClick={() => editBook(el.id)}>audio qosiw</button>
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
    )
}

export default AdminAudioBody