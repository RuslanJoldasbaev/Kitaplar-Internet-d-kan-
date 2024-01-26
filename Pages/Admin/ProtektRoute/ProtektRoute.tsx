import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../../../redux/hooks/hooks"

const ProtectorRoutes:React.FC = () => {
  const {user}=useAppSelector(state=>state.loginSlice)
  return (
    <>
      {user?.role==="super-admin"|| user?.role==="admin"? <Outlet /> : <Navigate to={`/book`} />}
    </>
  )
}

export default ProtectorRoutes