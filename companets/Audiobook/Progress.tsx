import React from "react";

interface IProps {
    progressBarRef: any,
    audioRef: any,
    timeProgress:number,
    duration:number
}
const Progress: React.FC<IProps> = ({ progressBarRef, audioRef,timeProgress,duration }) => {
    const handleProgressChange = (el: string) => {
        audioRef.current.currentTime = progressBarRef.current.value;
    };
    
    const formatTime = (time:number) => {
        if (time && !isNaN(time)) {
          const minutes = Math.floor(time / 60);
          const formatMinutes =
            minutes < 10 ? `0${minutes}` : `${minutes}`;
          const seconds = Math.floor(time % 60);
          const formatSeconds =
            seconds < 10 ? `0${seconds}` : `${seconds}`;
          return `${formatMinutes}:${formatSeconds}`;
        }
        return '00:00';
      };
    return (
        <div className="audio__top__progress">
            <span className="time current">{formatTime(timeProgress)}</span>
            <input type="range"
                ref={progressBarRef}
                defaultValue="0"
                onChange={(el) => handleProgressChange(el.target.value)} 
              />
            <span className="time">{formatTime(duration)}</span>
        </div>
    )
}
export default Progress