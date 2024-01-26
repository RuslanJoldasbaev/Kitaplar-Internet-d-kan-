import React from "react";
import MusicImg from "../../assets/icon/audio.png"
import PlayMusic from "../../assets/icon/play_audio.png"
import PauseMusic from "../../assets/icon/pausa.png"

import "./audioPlayList.scss"

interface IPlayList {
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}
const AudioPlayList: React.FC<IPlayList> = ({ setIsPlaying, isPlaying }) => {
    const buy = true
    const hendelChange = () => {
        if (isPlaying) {
            setIsPlaying(false)
        }
        if (!isPlaying) {
            setIsPlaying(true)
        }
    }
    return (
        <div className="audioPlay">

            <div className="audioPlayList">
                <div className="audioPlayList__left">
                    <div className="audioPlayList__left__img">
                        <img src={MusicImg} alt="" />
                    </div>
                    <div className="audioPlayList__left__name">
                        <h3>1. Audiobook</h3>
                    </div>
                </div>

                <div className="audioPlayList__rigth">
                    <div className="audioPlayList__rigth__audiotrue">
                        {isPlaying ?
                            <div className="audioPlayList__rigth__audiotrue__anime">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div> : ""
                        }
                    </div>
                    <div className="audioPlayList__rigth__play">
                        <img src={isPlaying ? PauseMusic : PlayMusic} alt="" onClick={() => hendelChange()} />
                    </div>
                </div>
            </div>

            {buy ?
                <h2>Kitap satip alsaniz kiyingi bolimler ashiladi</h2> :
                <>
                    <div className="audioPlayList">
                        <div className="audioPlayList__left">
                            <div className="audioPlayList__left__img">
                                <img src={MusicImg} alt="" />
                            </div>
                            <div className="audioPlayList__left__name">
                                <h3>2. Audiobook</h3>
                            </div>
                        </div>

                        <div className="audioPlayList__rigth">
                            <div className="audioPlayList__rigth__audiotrue">

                            </div>
                            <div className="audioPlayList__rigth__play">
                                <img src={PlayMusic} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="audioPlayList">
                        <div className="audioPlayList__left">
                            <div className="audioPlayList__left__img">
                                <img src={MusicImg} alt="" />
                            </div>
                            <div className="audioPlayList__left__name">
                                <h3>3. Audiobook</h3>
                            </div>
                        </div>

                        <div className="audioPlayList__rigth">
                            <div className="audioPlayList__rigth__audiotrue">

                            </div>
                            <div className="audioPlayList__rigth__play">
                                <img src={PlayMusic} alt="" />
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
export default AudioPlayList