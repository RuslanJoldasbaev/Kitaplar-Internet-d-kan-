import React from "react";
import { AdminDashboard,DashboardTitle } from "../../../companets/Admin";
import { Outlet } from "react-router-dom";
import "./dashboard.scss"
const Dashboard: React.FC = () => {
    return (
        <div className="adminDashboard">
            <div className="adminDashboard__left">
                <AdminDashboard />
            </div>
            <div className="adminDashboard__rigth">
                <DashboardTitle/>
                <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard