import React from "react";
import { searchBookGet } from "../../../redux/searchBookSlice/searchBookSlice";
import { searchModalReducers } from "../../../redux/searchBookSlice/searchBookSlice";
import BookImg from "../../../assets/img/book.png"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import "./searchBook.scss"
import { NavLink } from "react-router-dom";
const SearchBook: React.FC = () => {
    const timeOut = React.useRef()
    const [inputValue, setInputValue] = React.useState("")
    const { books, modal } = useAppSelector((state) => state.searchBookSlice)
    const dispatch = useAppDispatch()

    const navbarInputChange = (name: string) => {
        setInputValue(name)
        clearTimeout(timeOut.current)
        // @ts-ignore
        timeOut.current = setTimeout(() => {
            dispatch(searchBookGet({ value: name, limit: 6 }))
        }, 500)
        if (name) {
            dispatch(searchModalReducers(true))
        }
        if (!name) {
            dispatch(searchModalReducers(false))
        }
    }
    const bookClick = (value: boolean) => {
        dispatch(searchModalReducers(value))
    }

    return (
        <div className="search" onClick={(event) => { event.stopPropagation() }}>
            <div className="search__input" onClick={() => bookClick(true)}>
                <input type="search" value={inputValue} placeholder="Find the book you are looking for" onChange={(el) => navbarInputChange(el.target.value)} />
            </div>
            <div className="search__elemet">
                {modal ?
                    books?.data?.books ?
                        <div className="search__elemet__books">
                            {
                                books.data.books.map((el) => {
                                    return (
                                        <NavLink to={`/bookInfo/${el.name}%20bola/${el.id}`} key={el.id} onClick={() => bookClick(false)}>
                                            <div className="search__elemet__books__element">
                                                <div className="search__elemet__books__element__img">
                                                    <img src={el.image ? `${el.image}` : `${BookImg}`} alt="" />
                                                </div>
                                                <div className="search__elemet__books__element__price">
                                                    <p>{el.price} sum</p>
                                                </div>
                                                <div className="search__elemet__books__element__name">
                                                    <h3>{el.name}</h3>
                                                </div>
                                            </div>
                                        </NavLink>
                                    )
                                })
                            }
                        </div>
                        :
                        "" : ""
                }

            </div>
        </div>
    )
}

export default SearchBook