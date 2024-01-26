import React from "react";
import SearchImg from "../../../assets/icon/search.png"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { categoryReducers } from "../../../redux/admin/dashboardSlice/dashboardSlice";
import { avtorsGet, avtorsDelete, totalAvtorsGet, avtorPost } from "../../../redux/admin/avtorsAdminSlice/avtorsAdminSlice";
import { useParams } from "react-router-dom";
import AdminPagination from "../AdminPagination/AdminPagination";
import { Button } from "@mui/material";
import "./adminAvtor.scss"
const AdminAvtorCompanet: React.FC = () => {
    const dispatch = useAppDispatch()
    const req = window.location.search
    const {id}=useParams()
    const { avtors, total, deleteAvtor,post } = useAppSelector(state => state.avtorsAdminSlice)
    const [modal, setModal] = React.useState(false)
    const [authorName, setAuthorName] = React.useState("")
    const [page, setPage] = React.useState(1)

    const editBtnClick = (id: number) => { }
    const deleteClick = (id: number) => {
        dispatch(avtorsDelete(id))
    }
    const hendeSearchBook = (el: string) => {
        console.log(el)
    }

    const btnClickAdd = () => {
        if (authorName) {
            dispatch(avtorPost(authorName))
        }
    }


    React.useEffect(() => {
        dispatch(categoryReducers(6))
        dispatch(avtorsGet({ limit: 10, page: page }))
        dispatch(totalAvtorsGet())
    }, [req||page])

    React.useEffect(()=>{
        if(deleteAvtor?.message){
            dispatch(avtorsGet({ limit: 10, page: page }))
        }
    },[deleteAvtor])
    React.useEffect(()=>{
        if(post?.data?.id){
            dispatch(avtorsGet({ limit: 10, page: page }))
            dispatch(totalAvtorsGet())
        }
    },[post])
    React.useEffect(()=>{
        if(id){

        }
    },[id])
    return (
        <div className="avtor__admin">
            <div className="avtor__admin__title">
                <div className="avtor__admin__title__input">
                    <span>
                        <img src={SearchImg} alt="" />
                    </span>
                    <input type="text" onChange={(el) => hendeSearchBook(el.target.value)} placeholder="Search for employee/project" />
                </div>
                <div className="avtor__admin__title__button">
                    <Button variant="outlined" onClick={() => { setModal(true) }}>Add to Category</Button>
                </div>
            </div>
            <div className="avtor__admin__body">
                <h2>Avtorlar </h2>

                <div className="avtor__admin__body__title">
                    <div className="avtor__admin__body__title__left">
                        <p>avtor name</p>
                        <p></p>
                    </div>
                    <div className="avtor__admin__body__title__rigth">

                    </div>
                </div>


                <ul className="avtor__admin__body__ul">
                    {
                        avtors?.data?.map((el) => {
                            return (
                                <li className="avtor__admin__body__ul__li" key={el.id}>
                                    <div className="avtor__admin__body__ul__li__left">
                                        <div className="avtor__admin__body__ul__li__left__book">
                                            <div className="avtor__admin__body__ul__li__left__name">
                                                <h2>{el.name}</h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="avtor__admin__body__ul__li__rigth">
                                        <div className="avtor__admin__body__ul__li__rigth__edit">
                                            <button onClick={() => editBtnClick(el.id)}>edit</button>
                                        </div>
                                        <div className="avtor__admin__body__ul__li__rigth__delete">
                                            <button onClick={() => deleteClick(el.id)}> delete</button>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>


                <AdminPagination page={page} setPage={setPage} total={total} />
                {/* Modal   */}

                <div className={modal ? "avtor__admin__modal active" : "avtor__admin__modal"} onClick={() => { setModal(false) }}>
                    <div className="avtor__admin__modal__item" onClick={(event) => { event.stopPropagation() }}>
                        <div className="avtor__admin__modal__item__title">
                            <h2>Avtor ati famiylasin kiritin'</h2>
                        </div>
                        <div className="avtor__admin__modal__item__body">
                            <div className="avtor__admin__modal__item__body__input">
                                <input type="text" value={authorName} placeholder="Avtor ati famiylasin kiritin'" onChange={(e) => { setAuthorName(e.target.value) }} />
                            </div>
                            <div className="avtor__admin__modal__item__body__button">
                                <Button variant="contained" onClick={() => btnClickAdd()}>ADD</Button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default AdminAvtorCompanet