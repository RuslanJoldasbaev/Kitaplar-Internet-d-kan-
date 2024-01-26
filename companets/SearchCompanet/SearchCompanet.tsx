import React from "react";
import { searchBookGet } from "../../redux/searchBookSlice/searchBookSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { setPageReducers } from "../../redux/pageSlice/pageSlice";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CloseIcon from '@mui/icons-material/Close';
import "./search.scss"
const SearchCompanet: React.FC = () => {
    const timeOut = React.useRef()
    const req=window.location.search
    const history=useNavigate()
    const [searchValue, setSearchValue] = React.useState("")
    const { books } = useAppSelector((state) => state.searchBookSlice)
    const dispatch = useAppDispatch()
    const hendleChange = (value: string) => {
        setSearchValue(value)
        clearTimeout(timeOut.current)
        // @ts-ignore
        timeOut.current = setTimeout(() => {
            dispatch(searchBookGet({ value: value, limit: 20 }))
        }, 500)
    }
    const hedleClick=(el:{id:number,name:string})=>{
        history(`/bookInfo/${el.name}%20bola/${el.id}`)
    }
    React.useEffect(()=>{
        dispatch(setPageReducers(3))
    },[req])
    return (
        <section className="search1">
            <div className="conatiner">
                <div className="search1__title">
                    <button><KeyboardArrowLeftIcon /></button>
                    <div className="search1__title__input">
                        <input type="text" value={searchValue} placeholder="kitabinizdi jazin'" onChange={(el) => hendleChange(el.target.value)} />
                        {searchValue ? <div className="search1__title__input__close" onClick={()=>setSearchValue("")}> <CloseIcon /></div> : ""}
                    </div>
                </div>
                <div className="search1__items">
                    <div className="search1__items__clear">
                        {
                            searchValue ?
                                books?.data?.books?.length === 0 ? "kitap tabilmadi" :
                                    books?.data?.books?.map((el) => {
                                        return (
                                            <div key={el.id} className="search1__items__clear__book" onClick={()=>hedleClick({name:el.name,id:el.id})}>
                                                <div className="search1__items__clear__book__left">
                                                    <img src={el.image} alt="" />
                                                </div>
                                                <div className="search1__items__clear__book__name">
                                                    <h2>{el.name}</h2>
                                                </div>
                                            </div>
                                        )
                                    })
                                : ""
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SearchCompanet