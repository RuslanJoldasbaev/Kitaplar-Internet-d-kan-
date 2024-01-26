import React, { useRef } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import AudioDisplay from "./AudioDisplay";
import Controls from "./Controls";
import Progress from "./Progress";
import AudioPlayList from "../AudioPlayList/AudioPlayList";
import audioImg from '../../assets/img/audio.png'
import "./audioBook.scss"
const AudioBook: React.FC = () => {
    const { oneBook } = useAppSelector(state => state.bookSlice)
    const [currentTrack, setCurrentTrack] = React.useState(
        {
            title: 'Trinix ft Rushawn – Its a beautiful day',
            src: oneBook?.data?.audio ? `${oneBook.data.audio}` : "",
            author: oneBook?.data?.author ? `${oneBook.data.author}` : "Xaliq sozi"
        }
    );
    console.log(oneBook)
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [timeProgress, setTimeProgress] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const audioRef = useRef()
    const progressBarRef = useRef();
    return (
        <>
            {oneBook?.data?.audio ?
                <div className="audi">
                    <div className="container">
                        <div className="audio">
                            <div className="audio__title">
                                <h2>Audiobook</h2>
                            </div>
                            <div className="audio__top">
                                <div className="audio__top__left">
                                    <span>
                                        <img src={audioImg} alt="" />
                                    </span>
                                </div>
                                <div className="audio__top__rigth">
                                    <AudioDisplay currentTrack={currentTrack} audioRef={audioRef} setDuration={setDuration} progressBarRef={progressBarRef} />
                                    <Controls audioRef={audioRef} progressBarRef={progressBarRef} duration={duration} setTimeProgress={setTimeProgress} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                                    <Progress progressBarRef={progressBarRef} audioRef={audioRef} timeProgress={timeProgress} duration={duration} />
                                </div>
                            </div>
                            <div className="audio__bottom">
                                <AudioPlayList isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                            </div>
                        </div>
                    </div>
                </div> :
                <div className="audio__null">
                    <h2>kazirshe audiolar joq</h2>
                </div>
            }
        </>
    )
}

export default AudioBook