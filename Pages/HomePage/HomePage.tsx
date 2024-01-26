import React from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks"
import { userGet } from "../../redux/loginSlice/loginSlice"
import { NewBooks, Recommendation, WatchBook, Popular, Thougth } from "../../companets"
import MobilTitle from "../../companets/Navbar/MobileTitle/MobileTitle"
import SimpleSlider from "../../companets/TitleSlider/TitleSlider"
const HomePage: React.FC = () => {
    const dispatch = useAppDispatch()
    const { token } = useAppSelector(state => state.loginSlice)
    React.useEffect(() => {
        if (token) {
            dispatch(userGet())
        }
    }, [])
    return (
        <React.Fragment>
            <MobilTitle />
            <SimpleSlider />
            <Recommendation />
            <Popular />
            <NewBooks />
            <WatchBook />
            <Thougth />
        </React.Fragment>
    )
}
export default HomePage