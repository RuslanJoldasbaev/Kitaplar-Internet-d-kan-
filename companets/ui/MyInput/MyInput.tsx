import { FC } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import "./myInput.scss"
interface IPhone {
  setInputValue: React.Dispatch<React.SetStateAction<{
    phone: string;
    password: string;
  }>>
}
const MyInput: FC<IPhone> = ({ setInputValue }) => {

  const phoneChange = (el: {phone:string}) => {
    setInputValue((prev) => ({ ...prev, phone:"+"+el.phone }))
  }
  return (
    <PhoneInput
      country={'uz'}
      //@ts-ignore
      value="+998"
      //@ts-ignore
      onChange={phone => phoneChange({ phone })}
    />
  )
}

export default MyInput