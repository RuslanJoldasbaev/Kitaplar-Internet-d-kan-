import React, { useRef } from "react";
interface IFace {
    currentTrack: {
        title: string,
        src: any,
        author: string
    },
    audioRef: any,
    setDuration: React.Dispatch<React.SetStateAction<number>>,
    progressBarRef: any
}
const AudioDisplay: React.FC<IFace> = ({ currentTrack, audioRef, setDuration, progressBarRef }) => {
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    };
    return (
        <div className="audio__top__audio">
            <audio src={currentTrack.src} ref={audioRef} onLoadedMetadata={onLoadedMetadata} >
            </audio>
            <div className="audio-info">
                <div className="audio-image">
                </div>
            </div>
        </div>
    );
}
export default AudioDisplay