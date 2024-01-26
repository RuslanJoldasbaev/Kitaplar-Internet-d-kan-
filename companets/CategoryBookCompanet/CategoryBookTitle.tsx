import React from "react";
import { Slider, Switch } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useParams } from "react-router-dom";
import { categoryGet, janrCategoryReducers } from "../../redux/categorySlice/categorySlice";
import arrowBottomImg from "../../assets/icon/arrow_bottom.png"
import topArrow from "../../assets/icon/top_arrow.png"

const marks: SliderMarks = {
    0: '0',
    25: '50000',
    75: '150000',
    100: {
        style: {

        },
        label: <strong></strong>,
    },
};


const CategoryBookTitle: React.FC = () => {
    const req = window.location.search
    const dispatch = useAppDispatch()
    const { category_name } = useParams()
    const { category, janr } = useAppSelector(state => state.categorySlice)
    const [disabled, setDisabled] = React.useState(false);

    const [reverse, setReverse] = React.useState(true);
    const [arrowbutton, setArrowbutton] = React.useState(true)

    const [price1, setPrice1] = React.useState(100000)
    const [price2, setPrice2] = React.useState(0)

    const JanrClick = () => {
        if (arrowbutton) {
            return setArrowbutton(false)
        }
        setArrowbutton(true)
    }

    const handleChange = (el: string) => {
        setPrice1(parseInt(el) * 2000)
    }
    const priceClick = (el: string | any) => {
    }

    const hendelClick = ( id: number) => {
        dispatch(janrCategoryReducers(id))
    }

    React.useEffect(() => {
        dispatch(categoryGet(null))
    }, [req])
    return (
        <div className="categoryfull__body__left">

            <div className="categoryfull__body__left__janri__title">

                <p onClick={JanrClick}>
                    Janrlar
                    <img className={arrowbutton ?
                        "categoryfull__body__left__janri__title__img active"
                        : "categoryfull__body__left__janri__title__img"}
                        src={arrowbutton ? topArrow : arrowBottomImg} alt="" />
                </p>

                <div className={arrowbutton ? "categoryfull__body__left__janri__title__janr active" : "categoryfull__body__left__janri__title__janr"}>
                    <ul className="categoryfull__body__left__janri__title__janr__ul">
                        {
                            category?.data?.map((el) => {
                                return (
                                    <li key={el.id} className={janr === el.id ? "categoryfull__body__left__janri__title__janr__ul__li active" : "categoryfull__body__left__janri__title__janr__ul__li"} onClick={() => { hendelClick( el.id) }}>{el.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>

            </div>

            <div className="categoryfull__body__left__sena">
                <h2>bahasi : {price2 + " - " + price1}</h2>
                <div className="categoryfull__body__left__sena__item">
                    <div className="categoryfull__body__left__sena__item__title">
                        <p>0</p>
                        <p>50000 UZC</p>
                        <p>150000 UZC</p>
                    </div>
                    <Slider range marks={marks} defaultValue={[25, 75]} disabled={disabled} />
                </div>
            </div>


            <div className="categoryfull__body__left__format">
                <div className="categoryfull__body__left__format__audio">
                    {/* @ts-ignore */}
                    <input type="checkbox" placeholder="Audio" name="audio" id="audio" />
                </div>
                <div className="categoryfull__body__left__format__audio">
                    {/* @ts-ignore */}
                    <input type="checkbox" name="podkast" id="podkast" />
                </div>
            </div>


            <div className="categoryfull__body__left__score">
                <div className="categoryfull__body__left__score__dareje">
                    <p>Yuqori baho</p>
                    <Switch size="small" checked={reverse} onChange={setReverse} />
                </div>

                <div className="categoryfull__body__left__score__dareje">
                    <p>Chegirmali</p>
                    <Switch size="small" checked={reverse} onChange={setReverse} />
                </div>

            </div>
        </div>
    )
}

export default CategoryBookTitle