import React, { useState } from "react";
import { usersAdminGet } from "../../../redux/admin/usersAdminSlice/usersAdminSlice";
import { useAppDispatch,useAppSelector } from "../../../redux/hooks/hooks";
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import './adminPagination.scss'

interface IProps{
    total:number|undefined,
    page:number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}
const AdminPagination: React.FC<IProps> = ({total,setPage}) => {
    const onChange: PaginationProps['onChange'] = (page1) => {
        setPage(page1);
    };
    return (
        <div className="pagination">
            <Pagination defaultCurrent={1} total={total?total:50} onChange={onChange} />
        </div>
    )
}
export default AdminPagination