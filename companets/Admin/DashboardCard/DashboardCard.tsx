import React from "react";
import TradingbuyImg from "../../../assets/img/tredingAdd.png"
import arrowBtnImg from "../../../assets/icon/arrow_top.png"
import "./dashboardCard.scss"
const card = [{
    id: 1,
    name: "",
    count: 230
},
{
    id: 2,
    name: "",
    count: 450
},
{
    id: 3,
    name: "",
    count: 21
}]
const DashboardCard: React.FC = () => {
    return (
        <div className="dashboard__card">
            <div className="dashboard__card__flex">
                {
                    card.map((el) => {
                        return (
                            <div className="dashboard__card__flex__item" key={el.id}>
                                <div className="dashboard__card__flex__item__title">
                                    <span className="dashboard__card__flex__item__title__left">
                                        <img src={arrowBtnImg} alt="" />
                                    </span>
                                    <div className="dashboard__card__flex__item__title__rigth">
                                        <span>
                                            <img src={TradingbuyImg} alt="" />
                                        </span>
                                        <strong>
                                            +10%
                                        </strong>
                                    </div>
                                </div>

                                <div className="dashboard__card__flex__item__body">
                                    <h2>{el.count}</h2>
                                    <p>Количество книг</p>
                                </div>
                                
                                
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default DashboardCard