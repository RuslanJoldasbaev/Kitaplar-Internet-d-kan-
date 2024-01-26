import React from "react";
import MyInput from "../ui/MyInput/MyInput";
import { NavLink, useNavigate } from "react-router-dom";
import { loginPost } from "../../redux/loginSlice/loginSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { message } from "antd";
import LoginInImg from "../../assets/loginIn/loginin.png"

import "./login.scss"
const LoginIn: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch()
    const history = useNavigate()
    const [inputValue, setInputValue] = React.useState({
        phone: "",
        password: ""
    })
    const warning = (el:string) => {
        messageApi.open({
          type: 'warning',
          content: `${el}`,
        });
      };
    const { user,loading ,error} = useAppSelector(state => state.loginSlice)
    console.log(error)

    const hendleChange = (value: string, name: string) => {
        if (name === "password") {
            setInputValue((prev) => ({ ...prev, password: value }))
        }
    }

    function btnClick() {
        if(!inputValue.phone){
            return warning("namedi kiritin'")
        }
        if(inputValue.password.split("").length<=7){
            return warning("parol 8 haripten kop boliwi kerek")
        }
        dispatch(loginPost(inputValue))
    }

    React.useEffect(() => {
        if (user) {
            history("/book")
        }
    }, [user])
    return (
        <div className="loginin">
            <div className="loginin__items">
                <div className="loginin__items__container">
                    <div className="loginin__items__container__title">
                        <img src={LoginInImg} alt="" />
                    </div>
                    <h2 className="loginin__items__container__h2">Login</h2>
                    <div className="loginin__items__container__body">
                        <h2>phone number</h2>
                        <div className="loginin__items__container__body__input">
                            <MyInput setInputValue={setInputValue}/>
                        </div>

                        <h2>Email pochta</h2>
                        <div className="loginin__items__container__body__input">
                            <input type="password" placeholder="password" name="password" onChange={(el) => hendleChange(el.target.value, el.target.name)} />
                        </div>
                        <div className="loginin__items__container__body__btn">
                            <button onClick={btnClick} className={`loginin__items__container__body__btn__button ${loading?"active":""}`}>Submit</button>
                        </div>
                    </div>
                    <div className="loginin__items__container__bottom">
                        <NavLink to="/book">bookie</NavLink>
                        <NavLink to="/signup">sign up</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginIn
