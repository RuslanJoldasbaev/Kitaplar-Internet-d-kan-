import { FC } from "react";
import { Skeleton } from "antd"
import "./korzinaloading.scss"
const KorzinaLoading: FC = () => {
    const loading = [1, 2, 3, 4]
    return (
        <div className="container">
            <div className="korzinaloading">
                <div className="korzina__body__title">
                    <div className="korzina__body__title__name">
                        <h3>Kitap suwreti</h3>
                        <h3>Kitap atları </h3>
                        <h3>Bahası </h3>
                        <h3> </h3>
                    </div>

                </div>
                {
                    loading.map((el) => {
                        return (
                            <div key={el}>
                                <div className="korzina__body__items__item" key={el}>
                                    <div className="korzina__body__items__item__img">
                                        <Skeleton.Image />
                                    </div>
                                    <div className="korzina__body__items__item__name">
                                        <h3><Skeleton.Input /></h3>
                                    </div>
                                    <div className="korzina__body__items__item__price">
                                        <h3><Skeleton.Button /> Swm</h3>
                                    </div>
                                    <div className="korzina__body__items__item__button">
                                        <div className="korzina__body__items__item__button__buy">
                                            <button >
                                                satip aliw
                                            </button>
                                        </div>
                                        <div className="korzina__body__items__item__button__delete">
                                            <button >
                                                Óshiriw
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}
export default KorzinaLoading