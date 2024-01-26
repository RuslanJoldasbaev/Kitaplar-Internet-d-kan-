import React from "react";
import { BookFullInfo,AudioBook,Coment ,BookInRecomended} from "../../companets";
const BookInfo: React.FC = () => {

    return (
        <>
            <BookFullInfo />
            <AudioBook/>
            <Coment/>
            <BookInRecomended/>
        </>
    )
}
export default BookInfo