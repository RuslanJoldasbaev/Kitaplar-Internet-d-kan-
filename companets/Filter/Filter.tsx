import React from "react";
import { categoryGet } from "../../redux/categorySlice/categorySlice";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { janrCategoryReducers } from "../../redux/categorySlice/categorySlice";
import "./filter.scss"
interface IFilter{
    modal:boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}
const Filter: React.FC<IFilter> = ({modal,setModal}) => {
    const dispatch = useAppDispatch()
    const [categoryModal,setCategoryModal]=React.useState(true)
    const { category } = useAppSelector(state => state.categorySlice)
    const categoryClick=(id:number)=>{
        dispatch(janrCategoryReducers(id))
        setModal(false)
    }
    console.log(category)
    const hendeleClick=()=>{
        if(categoryModal){
         return setCategoryModal(false)
        }
        setCategoryModal(true)
    }
    React.useEffect(() => {

    }, [])
    return (
        <div className={modal?"filter active":"filter"}>
            <div className="filter__title">
                <p></p>
                <h2>filter</h2>
                <button onClick={()=>setModal(false)}>biykar etiw</button>
            </div>

            <div className="filter__body">
                <div className="filter__body__type">
                    <div className="filter__body__type__title" onClick={()=>hendeleClick()}>
                        <h2>categoriya</h2>
                        <div className={`filter__body__type__title__icon ${categoryModal?"active":""}`}>
                            <ChevronLeftIcon />
                        </div>
                    </div>
                    <div className={`filter__body__type__items ${categoryModal?"active":""}`}>
                        {
                            category?.data?.map((el, index) => {
                                return (
                                    <div className="filter__body__type__items__item" key={el.id} onClick={()=>categoryClick(el.id)}>
                                        {index+1} . {el.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Filter