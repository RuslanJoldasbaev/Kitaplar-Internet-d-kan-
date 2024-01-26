import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { profilGet, profilPut } from "../../redux/profilSlice/profilSlice";
import { profilImgPost } from "../../redux/profilSlice/profilSlice";
import { setPageReducers } from "../../redux/pageSlice/pageSlice";
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import profilHover from "../../assets/img/profil_hover.png"

import userImg from "../../assets/icon/user_img.png"
import "./profilCompanet.scss"
const ProfilCompanet: React.FC = () => {
    const dispatch = useAppDispatch()
    const req = window.location.search
    const history = useNavigate()
    const [file, setFile] = React.useState(null as any)
    const { user } = useAppSelector(state => state.profilSlice)
    const { token } = useAppSelector(state => state.loginSlice)
    const hendeChange = (el: any | null) => {
        const formData = new FormData
        formData.append("image", el[0])
        if (user?.user?.image) {
            return dispatch(profilPut(formData))
        }
        return dispatch(profilImgPost(formData))
    }

    React.useEffect(() => {
        if (token) {
            dispatch(profilGet())
            dispatch(setPageReducers(6))
        }
        if (!token) {
            history("/login")
        }
    }, [req])
    return (
        <div className="profil">
            <div className="profil__container">
                <div className="profil__title">
                    <h2>Profil</h2>
                </div>
                <div className="profil__body">
                    <div className="profil__body__left">
                        <div className="profil__body__left__input">
                            <input type="file" accept=".jpg,.png" onChange={(el) => hendeChange(el.target.files)} />
                        </div>
                        <div className="profil__body__left__user">
                            <img src={user?.user?.image ? `${user?.user?.image}` : userImg} alt="" />

                        </div>
                        <div className="profil__body__left__img">
                            <img src={profilHover} alt="" />
                        </div>

                    </div>
                    <div className="profil__body__rigth">
                        <h2><PersonIcon sx={{ fontSize: 30 }} /> name : {user?.user?.name}</h2>
                        <h2><CallIcon sx={{ fontSize: 30 }} />telefon : {user?.user?.phone}</h2>
                        <h3 className="profil__body__rigth__heart"><span><FavoriteIcon sx={{ fontSize: 30 }} /></span>unatqanlari : {user?.count_favorite}</h3>
                        <h3 className="profil__body__rigth__korzina"><span><ShoppingCartIcon sx={{ fontSize: 30 }} /></span>sebettegi kitaplar : {user?.count_basket}</h3>
                        <h3 className="profil__body__rigth__purchased"><span><AutoStoriesIcon sx={{ fontSize: 30 }} /></span>satip aling'an kitaplar : {user?.count_purchased}</h3>
                        <h3 className="profil__body__rigth__zakaz"><span><CloudDownloadIcon sx={{ fontSize: 30 }} /></span>zakaz berilgen kitaplar : {user?.count_order}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilCompanet