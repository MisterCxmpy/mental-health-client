/* eslint-disable react/prop-types */
import styles from './styles.module.css'
import { useEffect, useRef, useState } from 'react'
import MeditationPlayer from '../MeditationPlayer';
import useSound from 'use-sound';

export default function MeditationModal({ src, type }) {
    const [isPlaying, setIsPlaying] = useState(false); // play button state
    const [time, setTime] = useState(null); // user desiered meditation time
    const [seconds, setSeconds] = useState(0);

    const [play, { pause, duration, sound }] = useSound(src); // song controls, duration and metadata

    const contentRef = useRef(null); // ref for content fadein animation

    useEffect(() => { // setting song metadata
        const interval = setInterval(() => {
            if (sound) setSeconds(sound.seek([])); // setting the seconds state with the songs current playing time
        }, 1000);

        return () => clearInterval(interval);
    }, [sound]);

    useEffect(() => { // fade in for content
        let timeout = setTimeout(() => contentRef.current.style.opacity = 1, 500);
        return () => clearTimeout(timeout);
    }, [])

    const setPlaying = () => { // handle set play/pause
        isPlaying ? pause() : play();
        setIsPlaying(prev => !prev);
    }

    return (
        <div ref={contentRef} className={styles.content}>
            {!time ? <UserChooseTimes setDuration={setTime} /> : <MeditationPlayer {...{ duration, isPlaying, setPlaying, sound, type, time, seconds }} />}
        </div>
    )
}

function UserChooseTimes({ setDuration }) {
    return (
        <>
            <h1>How long would you like to meditate?</h1>
            <div className={styles.times}>
                <button className="btn" onClick={() => setDuration(5)}>5 mins</button>
                <button className="btn" onClick={() => setDuration(10)}>10 mins</button>
                <button className="btn" onClick={() => setDuration(15)}>15 mins</button>
            </div>
        </>
    )
}