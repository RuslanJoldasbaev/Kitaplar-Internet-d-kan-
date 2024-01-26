import React from "react";
import { useAppSelector,useAppDispatch } from "../../../redux/hooks/hooks";
import { comentsGet } from "../../../redux/comentSlice/comentSlice";
import { useParams } from "react-router-dom";

import "./coments.scss"
const Coments: React.FC = () => {
    const { id } = useParams()
    const {coments,comentsLoading}=useAppSelector(state=>state.comentSlice)
    const dispatch = useAppDispatch()
    const arr: number[] = [1, 2, 3, 4, 5, 6]
    React.useEffect(() => {
        if (id) {
            dispatch(comentsGet(id))
        }
    }, [id])
    return (
        <div className="coments">
            {
                comentsLoading?""
                :coments?.data?.map((el) => {
                    return (
                        <div className="coments__item" key={el.id}>
                            <div className="coments__item__left">
                                <span>
                                    {el.user.split("")[0]}
                                </span>
                            </div>
                            <div className="coments__item__rigth">
                                <h2>{el.user}</h2>
                                <h5>{(el.created_at?.split("T")[0])}</h5>
                                <p>{el.comment}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Coments