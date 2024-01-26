import React from "react";
import AdminBookieTitle from "./AdminBookieTitle/AdminBookieTitle";
import AdminBookieBody from "./AdminBookieBody/AdminBookieBody";
import BookModal from "./BookModal/BookModal";
import "./adminBook.scss"
const AdminBookieBooks:React.FC=()=>{
    const [modal,setModal]=React.useState(false)
    return(
        <div className="adminbook">
            <AdminBookieTitle setModal={setModal}/>
            <AdminBookieBody setMenu={setModal}/>
            <BookModal modal={modal} setModal={setModal}/>
        </div>
    )
}

export default AdminBookieBooks