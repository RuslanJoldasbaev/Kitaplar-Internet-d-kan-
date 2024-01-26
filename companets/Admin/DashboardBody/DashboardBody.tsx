import React from "react";
import DashboardBodyUser from "./DashboardBodyUser/DashboardBodyUser";
import DashboardBodyBook from "./DashboardBodyBook/DashboardBodyBook";

import "./dashboardbody.scss"
const DashboardBody: React.FC = () => {
    return (
        <div className="dashboardBody">
            <DashboardBodyUser />
            <DashboardBodyBook />
        </div>
    )
}

export default DashboardBody