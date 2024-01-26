import { FC } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
interface IPhone {
    setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    password: string;
    phone: string;
    confirm_password: string;
  }>>
}
const MyInput: FC<IPhone> = ({ setFormData }) => {

  const phoneChange = (el: {phone:string}) => {
    setFormData((prev) => ({ ...prev, phone:"+"+el.phone }))
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