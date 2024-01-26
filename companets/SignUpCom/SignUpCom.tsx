import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { siginPost } from "../../redux/loginSlice/loginSlice";
import { message } from "antd";
import LoadingOutlined from "@ant-design/icons"
import MyInput from "../ui/MyInputSigin/MyInputSigin";
import LoginInImg from "../../assets/loginIn/loginin.png"
const SiginInCom: React.FC = () => {
    const dispatch = useAppDispatch()
    const history = useNavigate()
    const { user,loading,error } = useAppSelector(state => state.loginSlice)
    console.log(error)
    const [messageApi, contextHolder] = message.useMessage()
    const warning = (el: string) => {
        messageApi.open({
            type: 'warning',
            content: `${el}`,
        });
    };
    const [formData, setFormData] = React.useState({
        name: "",
        password: "",
        phone: "+998",
        confirm_password: ""
    })
    const inputNameChange = (value: string) => {
        setFormData((prev) => ({ ...prev, name: value }))
    }
    const inputPasswordChange = (value: string) => {
        setFormData((prev) => ({ ...prev, password: value }))
        setFormData((prev) => ({ ...prev, confirm_password: value }))
    }
    const siginInCLick = () => {
        if (!formData.name) {
            return warning("atinizdi kiritin'")
        }
        if (formData.password.split('').length <= 7) {
            return warning("8 haripten kop boliwi kerek parol")
        }
        if (formData.phone.split("").length < 13) {
            return warning("telefon nomerinizdi duris toltirin'")
        }
        return dispatch(siginPost(formData))
    }
    React.useEffect(() => {
        if (user) {
            history("/book")
        }
    })
    return (
        <React.Fragment>
            {contextHolder}
            <div className="loginin">

                <div className="loginin__items">
                    <div className="loginin__items__container">
                        <div className="loginin__items__container__title">
                            <img src={LoginInImg} alt="" />
                        </div>
                        <h2 className="loginin__items__container__h2">Sign up</h2>
                        <div className="loginin__items__container__body">
                            <h2>Name</h2>
                            <div className="loginin__items__container__body__input">
                                <input type="text" placeholder="name " name="name" onChange={(el) => inputNameChange(el.target.value)} />
                            </div>
                            <h2>Password</h2>
                            <div className="loginin__items__container__body__input">
                                <input type="password" placeholder="password" name="password" onChange={(el) => inputPasswordChange(el.target.value)} />
                            </div>
                            <h2>phone number</h2>
                            <div className="loginin__items__container__body__input">
                                <MyInput setFormData={setFormData} />
                            </div>
                            <div className="loginin__items__container__body__btn">
                                <button className={`loginin__items__container__body__btn__button ${loading?"active":""}`} onClick={() => siginInCLick()}> Submit</button>
                            </div>
                        </div>
                        <div className="loginin__items__container__bottom">
                            <NavLink to="/book">bookie</NavLink>
                            <NavLink to="/login">login</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default SiginInCom