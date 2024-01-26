import {  useEffect, useRef, useCallback } from "react";
import ShareImg from "../../assets/icon/share_black.png"
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';
interface IFace {
  audioRef: any,
  progressBarRef:any,
  duration:number,
  setTimeProgress:React.Dispatch<React.SetStateAction<number>>,
  isPlaying:boolean,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}
const Controls: React.FC<IFace> = ({ audioRef ,isPlaying,setIsPlaying,
  progressBarRef,
  duration,
  setTimeProgress}) => {
  


  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    // @ts-ignore
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      //@ts-ignore
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      audioRef.current.pause();
      //@ts-ignore
      cancelAnimationFrame(playAnimationRef.current);
    }
  }, [isPlaying, audioRef, repeat]);




  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    //@ts-ignore
  }, [isPlaying, audioRef, repeat]);
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);



  return (
    <div className="audio__top__wrapper">

        <button onClick={togglePlayPause} className="audio__top__wrapper__pause">
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>

        <div className="audio__top__wrapper__rigth">
          <div className="audio__top__wrapper__rigth__share">
            <img src={ShareImg} alt="" />
            <p>Share</p>
          </div>
        </div>


    </div>
  )
}
export default Controls