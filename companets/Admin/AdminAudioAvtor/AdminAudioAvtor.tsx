import React from "react";
import SearchImg from "../../../assets/icon/search.png"
import AdminPagination from "../AdminPagination/AdminPagination";
import { categoryReducers } from "../../../redux/admin/dashboardSlice/dashboardSlice";
import { useParams, useNavigate } from "react-router-dom";
import { audioAvtorGet, deleteAvtorAdmin, totalAvtorAudio, postAvtorAudio, oneAvtorGet, putAvtorAudio } from "../../../redux/admin/adminAudioAvtorSlice/adminAudioAvtorSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { Button } from "@mui/material";
const AdminAudioAvtor: React.FC = () => {
    const { audiAvtor, total, post, deletemassege, oneAvtor } = useAppSelector(state => state.adminAudioAvtorSlice)
    const [modal, setModal] = React.useState(false)
    const [avtorName, setAuthorName] = React.useState(oneAvtor?.data ? oneAvtor?.data.name : "")
    const [page, setPage] = React.useState(1)
    const req = window.location.search
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const navigate = useNavigate()



    const editBtnClick = (id: number) => {
        setModal(true)
        navigate(`/admin/author_audio/${id}`)
    }
    const deleteClick = (id: number) => {
        dispatch(deleteAvtorAdmin(id))
    }


    const btnClickAdd = () => {
        if (id) {
            return dispatch(putAvtorAudio({ id: parseInt(id), data: { name: avtorName } }))
        }

        return dispatch(postAvtorAudio({ name: avtorName }))
    }
    const hendeSearchBook = (value: string) => {
        console.log(value)
    }


    React.useEffect(() => {
        dispatch(totalAvtorAudio())
        dispatch(audioAvtorGet({ limit: 10, page: page }))
        dispatch(categoryReducers(7))
    }, [req])
    React.useEffect(() => {
        if (post?.message) {
            dispatch(totalAvtorAudio())
            dispatch(audioAvtorGet({ limit: 10, page: page }))
            setModal(false)
        }

    }, [post])
    React.useEffect(() => {
        if (deletemassege) {
            dispatch(totalAvtorAudio())
            dispatch(audioAvtorGet({ limit: 10, page: page }))
            setModal(false)
        }
    })
    React.useEffect(() => {
        if (id) {
            dispatch(oneAvtorGet(parseInt(id)))
        }
    }, [id])
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
                <h2>Audio Avtorlar </h2>

                <div className="avtor__admin__body__title">
                    <div className="avtor__admin__body__title__left">
                        <p>avtor audio name</p>
                        <p></p>
                    </div>
                    <div className="avtor__admin__body__title__rigth">

                    </div>
                </div>


                <ul className="avtor__admin__body__ul">
                    {
                        audiAvtor?.data?.map((el) => {
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
                                <input type="text" value={avtorName} placeholder="Avtor ati famiylasin kiritin'" onChange={(e) => { setAuthorName(e.target.value) }} />
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

export default AdminAudioAvtor