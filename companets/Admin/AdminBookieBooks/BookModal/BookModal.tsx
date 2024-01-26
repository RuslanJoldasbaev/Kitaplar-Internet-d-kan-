import React from "react";
import { adminCategoryGet } from "../../../../redux/admin/categoryAdminSlice/categoryAdminSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { addBookPost, oneBookGetAdmin, adminBookPut } from "../../../../redux/admin/adminBooksSlice/adminBooksSlice";
import { totalAvtorsGet} from "../../../../redux/admin/avtorsAdminSlice/avtorsAdminSlice";
import { useParams } from "react-router-dom";
import "./bookModal.scss"
interface IModal {
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}


const BookModal: React.FC<IModal> = ({ modal, setModal }) => {
    const { id } = useParams()
    const req = window.location.search
    const dispatch = useAppDispatch()
    const { category } = useAppSelector(state => state.categoryAdminSlice)
    const { oneBook, postBook } = useAppSelector(state => state.adminBooksSlice)
    const { allAvtors } = useAppSelector(state => state.avtorsAdminSlice)
    console.log(allAvtors)
    const [formData, setFormData] = React.useState({
        name: oneBook ? oneBook.data.name : "",
        author: {
            id: oneBook ? oneBook.data.author.id : 1,
            name: oneBook ? oneBook.data.author.name : ""
        },
        title: oneBook ? oneBook.data.title : "",
        categories_id: oneBook ? oneBook.data.categories[0].id : "",
        price: oneBook ? oneBook.data.price : "",
        image:  null
    } as {
        name: string,
        author: {
            id: number,
            name: string
        }
        title: string,
        categories_id: string,
        price: string,
        image: any
    })

    const fileChange = (value: any | null) => {
        setFormData(prev => ({ ...prev, image: value[0] }))
    }
    const selectChange = (value: string) => {
        setFormData(prev => ({ ...prev, categories_id: value }))
    }

    const authorChange=(value:string)=>{
        setFormData(prev=>({...prev,author:{name:"ddkk",id:parseInt(value)}}))
    }

    const hendeleCange = (value: string, name: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const btnClick = () => {
        if (formData.categories_id && formData.name && formData.price && formData.title) {

            const data = new FormData()
            data.append("name", formData.name)
            data.append("author_id", `${formData.author.id}`)
            data.append("title", formData.title)
            data.append("categories_id", formData.categories_id)
            data.append("price", formData.price)
            data.append("image", formData.image)
            if (id) {
                console.log(id)
                return dispatch(adminBookPut({ id: id, data: formData }))
            }
            return dispatch(addBookPost(data))
        }
        console.log("e")
    }


    React.useEffect(() => {
        dispatch(adminCategoryGet())
        dispatch(totalAvtorsGet())
    }, [req])

    React.useEffect(() => {
        if (id) {
            dispatch(oneBookGetAdmin(id))
            dispatch(totalAvtorsGet())
        }
    }, [id])

    React.useEffect(() => {
        if (postBook?.data.id) {
            setModal(false)
        }
    }, [postBook])
    React.useEffect(() => {
        setFormData({
            name: oneBook ? oneBook.data.name : "",
            author: {
                id: oneBook ? oneBook.data.author.id : 0,
                name: oneBook ? oneBook.data.author.name : ""
            },
            title: oneBook ? oneBook.data.title : "",
            categories_id: oneBook ? `${oneBook.data.categories[0].id}` : "",
            price: oneBook ? oneBook.data.price : "",
            image: oneBook ? oneBook.data.image : ""
        })
    }, [oneBook])
    return (
        <div className={modal ? "adminbook__modal active" : "adminbook__modal"} onClick={() => setModal(false)}>
            <div className="adminbook__modal__element" onClick={(event) => (event.stopPropagation())}>
                <div className="adminbook__modal__element__title">
                    <h2>{id ? `${oneBook?.data.name} ozgertpekshi kitabiniz` : `kitabinizdi kiritin'`}</h2>
                </div>
                <div className="adminbook__modal__element__body">
                    <div className="adminbook__modal__element__body__top">
                        <div className="adminbook__modal__element__body__top__left">
                            <div className="adminbook__modal__element__body__top__left__name">
                                <h2>book name </h2>
                                <input type="text" placeholder="book name" value={formData.name} name="name" onChange={(el) => { hendeleCange(el.target.value, el.target.name) }} />
                            </div>
                            <div className="adminbook__modal__element__body__top__left__authorname">
                                <h2>author name</h2>
                                <select onChange={(el) => authorChange(el.target.value)}>
                                    {
                                        allAvtors?.data?.map((el) => {
                                            return (
                                                <option key={el.id} value={el.id}>{el.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="adminbook__modal__element__body__top__left__price">
                                <h2>price</h2>
                                <input type="number" placeholder="kitap bahasi" min="0" max="10000" step="1" id="broker_fees" value={formData.price} name="price" onChange={(el) => { hendeleCange(el.target.value, el.target.name) }} />
                            </div>
                            <div className="adminbook__modal__element__body__top__left__image">
                                <h2>book image</h2>
                                <input type="file" onChange={(el) => fileChange(el.target.files)} />
                            </div>
                        </div>
                        <div className="adminbook__modal__element__body__top__rigth">
                            <div className="adminbook__modal__element__body__top__rigth__category">
                                <h2>categoryasi</h2>
                                <select onChange={(el) => selectChange(el.target.value)}>
                                    {
                                        category?.data?.map((el) => {
                                            return (
                                                <option key={el.id} value={el.id}>{el.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="adminbook__modal__element__body__top__rigth__title">
                                <h2>title</h2>
                                <textarea rows={2} cols={40} maxLength={300} name="title" value={formData.title} placeholder="kitap haqqinda" onChange={(el) => { hendeleCange(el.target.value, el.target.name) }} />
                            </div>

                        </div>
                    </div>
                    <div className="adminbook__modal__element__body__btn">
                        <button onClick={btnClick}>Add</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BookModal