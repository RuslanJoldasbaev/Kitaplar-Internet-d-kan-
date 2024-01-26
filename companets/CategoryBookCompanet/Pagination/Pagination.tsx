import React from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks/hooks";
import { totalAllboks, categoryTotalGet ,categoryAllBooksGet,allBooksGet} from "../../../redux/allBooksSlice/allBooksSlice";

import right from "../../../assets/icon/right.svg"
import left from "../../../assets/icon/left.svg"
import "./pagination.scss"
const Pagination: React.FC = () => {
    const req = window.location.search
    const dispatch = useAppDispatch()
    const [array, setArray] = React.useState(0)
    const [array2, setArray2] = React.useState(1)
    const [array3, setArray3] = React.useState(2)
    const { janr } = useAppSelector(state => state.categorySlice)
    const { total, totalLoading, totalError } = useAppSelector(state => state.allBooksSlice)
    const [totaldata,setTotalData]=React.useState(total)
    console.log(total)
    const liBtnClick = (id: number) => {
            setArray(array+id)
            setArray2(array2+id)
            setArray3(array3+id)
    }
    const hendleClick = (id: number) => {
        setArray(array+id)
        setArray2(array2+id)
        setArray3(array3+id)
    }
    React.useEffect(() => {
        if (!janr) {
            dispatch(totalAllboks())
            setArray(0)
            setArray2(1)
            setArray3(2)
        }
        if (janr) {
            dispatch(categoryTotalGet(janr))
            setArray(0)
            setArray2(1)
            setArray3(2)
        }
    }, [janr || req])
    React.useEffect(()=>{
        setTotalData(total)
    },[total])
    React.useEffect(()=>{
        if(janr){
            dispatch(categoryAllBooksGet({id:janr,limit:6,page:array2}))
        }
        if(!janr){
            dispatch(allBooksGet({limit:6,page:array2}))
        }
    },[array2])
    return (
        <div className="pagination">
            <button className={array2 === 1 ? "pagination-btn left active" : "pagination-btn left"} onClick={() => hendleClick(-1)}>
                <img src={left} alt="left" />
            </button>
            {
                <ul className="pagination-list">
                    <li className={array === 0 ? "li active" : "li"} onClick={() => liBtnClick(-1)}>{array}</li>
                    <li>{array2}</li>
                    <li className={array3 === (Math.round(totaldata/6) + 1) ? "li active" : "li"} onClick={() => liBtnClick(1)}>{array3}</li>
                </ul>
            }
            <button className={array3 === (Math.round(totaldata/6) + 1) ? "pagination-btn right active" : "pagination-btn right"} onClick={() => hendleClick(1)}>
                <img src={right} alt="right" />
            </button>
        </div>
    )
}
export default Pagination