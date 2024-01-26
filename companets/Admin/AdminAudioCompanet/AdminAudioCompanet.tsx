import React from "react";
import "./adminAudio.scss"
import AdminAudioTitle from "./AdminAudioTitle/AdminAudioTitle";
import AdminAudioBody from "./AdminAudioBody/AdminAudioBody";
import AdminAudioModal from "./AdminAudioModal/AdminAudioModal";
const AdminAudioCompanet: React.FC = () => {
    const [modal,setModal]=React.useState(false)
    return (
        <div className="adminAudio">
            <AdminAudioTitle />
            <AdminAudioBody />
            <AdminAudioModal modal={modal} setModal={setModal}/>
        </div>
    )
}

export default AdminAudioCompanet