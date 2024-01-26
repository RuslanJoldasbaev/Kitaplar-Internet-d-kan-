import React from "react";
import { bookOneAudioGet, deleteAudio, audioAvtorsGet, bookAudioPost, audiosGet } from "../../../../redux/admin/adminAudioSlice/adminAudioSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { useParams } from "react-router-dom";
import MicrafonImg from "../../../../assets/img/micrafon.png"
import "./adminAudioModal.scss"
import { Button } from "@mui/material";
interface IAdminModal {
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}
const AdminAudioModal: React.FC<IAdminModal> = ({ modal, setModal }) => {
    const { id } = useParams()
    const { oneBook, avtors, audios, postLoading, post } = useAppSelector(state => state.adminAudioSlice)
    console.log(postLoading)
    const dispatch = useAppDispatch()
    const [formdata, setFormdata] = React.useState({
        book_id: null as string | null,
        dubauthor_id: null as number | null,
        name: "",
        audio: {} as any
    })



    const onChangeInput = (value: string) => {
        setFormdata((prev) => ({ ...prev, name: value }))
    }
    const authorChange = (id: string) => {
        setFormdata((prev) => ({ ...prev, dubauthor_id: parseInt(id) }))
    }
    const audioChange = (file: any) => {
        setFormdata((prev) => ({ ...prev, audio: file[0] }))
    }
    const hendeleClick = () => {
        console.log(formdata)
        if (formdata.audio && formdata.book_id && formdata.dubauthor_id && formdata.name) {
            console.log("isledi")
            const data = new FormData
            data.append("book_id", formdata.book_id)
            data.append("dubauthor_id", `${formdata.dubauthor_id}`)
            data.append("audio", formdata.audio)
            data.append("name", formdata.name)
            dispatch(bookAudioPost(data))
        }
    }
    const deleteClick = () => {
        if (id) {
            dispatch(deleteAudio(parseInt(id)))
        }
    }
    React.useEffect(() => {
        if (id) {
            dispatch(bookOneAudioGet(parseInt(id)))
            setModal(true)
            dispatch(audioAvtorsGet())
            dispatch(audiosGet(parseInt(id)))
            setFormdata({
                book_id: null,
                dubauthor_id: null,
                name: "",
                audio: {}
            })
            setFormdata((prev) => ({ ...prev, book_id: id }))
        }
    }, [id, post?.message])

    return (
        <div className={modal ? "adminAudio__modal active" : "adminAudio__modal"} onClick={() => { setModal(false) }}>
            <div className="adminAudio__modal__item" onClick={(event) => { event.stopPropagation() }}>
                <div className="adminAudio__modal__item__title">
                    <h2>Kitapqa Audionizdi kiritin'</h2>
                </div>
                <div className="adminAudio__modal__item__body">
                    <div className="adminAudio__modal__item__body__left">
                        <span className="adminAudio__modal__item__body__left__img">
                            <h2>book img:</h2>
                            <img src={`${oneBook?.data?.image}`} alt="" />
                        </span>
                        <div className="adminAudio__modal__item__body__left__name">
                            <h2>book name : {oneBook?.data?.name}</h2>
                        </div>
                        <div className="adminAudio__modal__item__body__left__author">
                            <h2>author name : {oneBook?.data?.author?.name}</h2>
                        </div>
                        <div className="adminAudio__modal__item__body__left__audios">
                            <h2>Audios</h2>
                            <div className="adminAudio__modal__item__body__left__audios__items">
                                <div className="adminAudio__modal__item__body__left__audios__items__item">
                                    {
                                        audios?.data?.audios ? audios?.data.audios.map((el, index) => {
                                            return (<div className="adminAudio__modal__item__body__left__audios__items__item__audio" key={el.id}>
                                                <div className="adminAudio__modal__item__body__left__audios__items__item__audio__name">
                                                    <p> {index + 1 + ". "}{el.name}</p>
                                                </div>
                                                <div className="adminAudio__modal__item__body__left__audios__items__item__audio__delete">
                                                    <button>delete</button>
                                                </div>
                                            </div>)
                                        }) : "qosiq joq"
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="adminAudio__modal__item__body__rigth">
                        <div className="adminAudio__modal__item__body__rigth__input">
                            <h3>audio name</h3>
                            <input type="text" placeholder="audio name" onChange={(el) => onChangeInput(el.target.value)} />
                        </div>
                        <div className="adminAudio__modal__item__body__rigth__avtor">
                            <h3>audio avtor</h3>
                            <select onChange={(el) => authorChange(el.target.value)}>
                                {
                                    avtors?.data?.map((el) => {
                                        return (
                                            <option key={el.id} value={el.id}>{el.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="adminAudio__modal__item__body__rigth__micrafon">

                            <img src={MicrafonImg} alt="" />
                            <div className="adminAudio__modal__item__body__rigth__micrafon__input">
                                <input type="file" onChange={(el) => audioChange(el.target.files)} accept=".mp3,.ogg,.wav" />
                            </div>
                        </div>
                        <Button variant="outlined" onClick={hendeleClick}> {postLoading ? "loading" : "Add"}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAudioModal