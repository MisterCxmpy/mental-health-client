/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import styles from './styles.module.css';
import { forwardRef } from 'react';
import { HiPlay, HiStop } from 'react-icons/hi';

const MeditationTypes = {
    0: 'Vipassanna Meditation',
    1: 'Yoga Meditation',
    2: 'Gratitude Meditation',
    3: 'Compassion Meditation',
    4: 'Walking Meditation'
}


const MeditationPlayer = forwardRef(({ src = '/assets/booli.mp3', duration = 0, meditation_id, isPlaying, setPlaying, setDuration }, ref) => {

    return (
        <div>
            <h2>{MeditationTypes[meditation_id]}</h2>
            
            <audio ref={ref} src={src} onLoadedMetadata={e => setDuration(Math.floor(e.target.duration))}></audio>
            {duration}
            <PlayButton {...{ isPlaying, setPlaying }} />
        </div>
    )
});

function PlayButton({ isPlaying = false, setPlaying }) {
    return (
        <div className={styles.playButton}>
            {isPlaying ? <HiStop onClick={() => setPlaying(false)} /> : <HiPlay onClick={() => setPlaying(true)} />}
        </div>
    )
}

export default MeditationPlayer;