import React from "react";
import { orderReducers } from "../../redux/orderSlice/orderSlice";
import CategoryRigthLoading from "./CategoryRigthLoading/CategoryRigthLoading";
import StarFunction from "../ui/StarFunction/StarFunction";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import BookItem from "../BookItem/BookItem";
import Pagination from "./Pagination/Pagination";
import { korzinaPost } from "../../redux/korzinaSlice/korzinaSlice";
const CategoryRigthItem: React.FC = () => {
    const dispatch = useAppDispatch()
    const history=useNavigate()
   
    const { allbooks,categoryAllBooks } = useAppSelector(state => state.allBooksSlice)
    const [book, setBook] = React.useState([] as {
        audio: string,
        author: {
            id: number,
            name: string
        },
        categories: {
            id: number,
            name: string
        }[],
        id: number,
        image: string,
        name: string,
        price: string,
        rating: null | string,
        title: string,
        baskets: number,
        favorite: number
    }[])

    const hendleClick=(id:number)=>{
        dispatch(korzinaPost({book_id:id}))
    }
    const orderClick=(id:number)=>{
        dispatch(orderReducers(id))
        history("/order")
    }
 
    React.useEffect(() => {
        if (allbooks?.data) {
            setBook(allbooks.data)
        }
    }, [allbooks])
    React.useEffect(()=>{
        if(categoryAllBooks?.data){
            setBook(categoryAllBooks.data.books)
        }
    },[categoryAllBooks])
    return (
        <div>
            {book.length>0 ?
                <div className="categoryfull__body__rigth">
                    {
                        book.map((el) => {
                            return <div className="categoryfull__body__rigth__item" key={el.id}>
                                <div className="categoryfull__body__rigth__item__desktop">
                                    <BookItem data={el} />
                                </div>

                                {/* mobil */}
                                <div className="categoryfull__body__rigth__item__mobil">
                                    <div className="categoryfull__body__rigth__item__mobil__img">
                                        <img src={`${el.image}`} alt="" />
                                    </div>
                                    <div className="categoryfull__body__rigth__item__mobil__rigth">
                                        <h3>{el.name}</h3>
                                        <p>{el.author.name}</p>
                                        <div className="categoryfull__body__rigth__item__mobil__rigth__star">
                                            <StarFunction rating={el.rating} width="14"/>
                                        </div>
                                        <div className="categoryfull__body__rigth__item__mobil__rigth__button">
                                            <button onClick={()=>hendleClick(el.id)} className={el.baskets===0?"categoryfull__body__rigth__item__mobil__rigth__button__delete":"categoryfull__body__rigth__item__mobil__rigth__button__delete active"}>
                                                korzina
                                            </button>
                                            <button className="categoryfull__body__rigth__item__mobil__rigth__button__edit" onClick={()=>orderClick(el.id)}>
                                                zakaz beriw
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
                : <CategoryRigthLoading/>
            }
            <Pagination />
            
        </div>
    )
}
export default CategoryRigthItem