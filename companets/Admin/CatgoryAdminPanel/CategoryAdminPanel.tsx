import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { adminCategoryGet, categoryDelete, addCategoryPost } from "../../../redux/admin/categoryAdminSlice/categoryAdminSlice";
import { categoryReducers } from "../../../redux/admin/dashboardSlice/dashboardSlice";
import "./categoryAdminPanel.scss"
import { Button } from "@mui/material";
const CategoryAdminPanel: React.FC = () => {
    const [edit,setEdit]=React.useState(null as number|null)
    const [modal, setModal] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [deleteid, setDeleteId] = React.useState(0 as number)
    const dispatch = useAppDispatch()
    const req = window.location.search
    const { category, deletemessage, addCategory, deleteLoading } = useAppSelector((state) => state.categoryAdminSlice)
    const categoryDeleteClick = (id: number) => {
        if (!deleteLoading) {
            setDeleteId(id)
            dispatch(categoryDelete(id))
        }
    }
    const AddCategoryClick = () => {
        setModal(true)
    }
    const modalClickFalse = () => {
        setModal(false)
    }

    const btnClickAdd = () => {
        dispatch(addCategoryPost({ name: value }))
    }
    const editBtnClick=(id:number)=>{
        setEdit(id)
        setModal(true)
    }
    React.useEffect(() => {
        dispatch(adminCategoryGet())
        dispatch(categoryReducers(3))
    }, [req || deletemessage])

    React.useEffect(() => {
        if (addCategory?.message) {
            dispatch(adminCategoryGet())
            setModal(false)
        }
    }, [addCategory])

    React.useEffect(()=>{
        if(edit){
            
        }
    },[edit])
    return (
        <div className="admincategory">
            <div className="admincategory__title">
                <input type="text" placeholder="categoryani izlew" />
                <Button variant="outlined" onClick={() => { AddCategoryClick() }}>Add to Category</Button>
            </div>
            <div className="admincategory__body">
                <h2>Categoriyalar</h2>
                <div className="admincategory__body__title">
                    <div className="admincategory__body__title__left">
                        <p>categoriyalar</p>
                        <p>catogiya tipleri</p>
                    </div>
                    <div className="admincategory__body__title__rigth">

                    </div>
                </div>
                <div className="admincategory__body__category">
                    <ul className="admincategory__body__category__ul">
                        {
                            category?.data?.map((el) => {
                                return (
                                    <li className="admincategory__body__category__ul__li" key={el.id}>
                                        <div className="admincategory__body__category__ul__li__left">
                                            <div className="admincategory__body__category__ul__li__left__book">
                                                <div className="admincategory__body__category__ul__li__left__name">
                                                    <h2>{el.name}</h2>
                                                </div>
                                            </div>
                                            <ul>
                                                {el.categories?.map((el) => {
                                                    return (<li key={el.id}>{el.name}</li>)
                                                })}
                                            </ul>

                                        </div>

                                        <div className="admincategory__body__category__ul__li__rigth">
                                            <div className="admincategory__body__category__ul__li__rigth__edit">
                                                <button onClick={()=>editBtnClick(el.id)}>edit</button>
                                            </div>
                                            <div className="admincategory__body__category__ul__li__rigth__delete">
                                                <button onClick={() => categoryDeleteClick(el.id)}>{deleteLoading && el.id === deleteid ? "oading" : "delete"}</button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>



            {/* MODAL */}

            <div className={modal ? "admincategory__modal active" : "admincategory__modal"} onClick={() => modalClickFalse()}>
                <div className="admincategory__modal__item" onClick={(event) => { event.stopPropagation() }}>
                    <div className="admincategory__modal__item__title">
                        <h2>Add to Category</h2>
                    </div>
                    <div className="admincategory__modal__item__body">
                        <div className="admincategory__modal__item__body__input">
                            <input type="text" value={value} placeholder="categoriyanizdi kiritin'" onChange={(e) => { setValue(e.target.value) }} />
                        </div>
                        <div className="admincategory__modal__item__body__button">
                            <Button variant="contained" onClick={() => btnClickAdd()}>ADD</Button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default CategoryAdminPanel