/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import styles from './styles.module.css';
import { HiPlay, HiStop } from 'react-icons/hi';


function MeditationPlayer({ duration = 0, isPlaying, setPlaying, currTime, seconds, sound, type = '' }) {
    return (
        <div className={styles.player}>
            <h2>{type} Meditation</h2>
            <input
                type="range"
                min="0"
                max={duration / 1000}
                default="0"
                value={seconds}
                className="timeline"
                onChange={(e) => {
                    sound.seek([e.target.value]);
                }}
            />
            <p>{currTime.min} : {currTime.sec}</p>
            <PlayButton {...{ isPlaying, setPlaying }} />
        </div>
    )
}

function PlayButton({ isPlaying, setPlaying }) {
    return (
        <div className={styles.playButton}>
            {isPlaying ? <HiStop onClick={() => setPlaying(false)} /> : <HiPlay onClick={() => setPlaying(true)} />}
        </div>
    )
}

export default MeditationPlayer;