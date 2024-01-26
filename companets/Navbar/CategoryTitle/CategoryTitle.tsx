import React from "react"
import { categoryGet,janrCategoryReducers } from "../../../redux/categorySlice/categorySlice"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks"
import { useNavigate } from "react-router-dom"
const CategoryTitle: React.FC = () => {
    const data=[{
        id:1,
        name:"Home"
    },
    {
        id:2,
        name:"Bestseller"
    },
    {
        id:3,
        name:"category"
    },
    {
        id:4,
        name:"Community"
    }

]
    const dispatch = useAppDispatch()
    const history=useNavigate()
    const req=window.location.search
    const { category,loading } = useAppSelector(state => state.categorySlice)

    const categoryClick=(id:number)=>{

        dispatch(janrCategoryReducers(id))
        history(`/category/recommendations`)
    }
    React.useEffect(()=>{
        dispatch(categoryGet(null))
    },[req])

    return (
        <div className="category1" >
            <div className="category1__centr">
                <ul className="category1__centr__items">
                    {loading?
                    data.map((el)=>{
                        return(
                            <li key={el.id} className="category1__centr__items__item">
                                {el.name}
                            </li>
                        )
                    })
                    :
                        category.data?.map((el)=>{
                            return(
                                <li key={el.id} className="category1__centr__items__item" onClick={()=>categoryClick(el.id)}>{el.name}</li>
                            )
                        })
                    }
                </ul>
            </div>


        </div>
    )
}
export default CategoryTitle