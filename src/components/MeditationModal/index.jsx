/* eslint-disable react/prop-types */
import styles from './styles.module.css'
import { useEffect, useRef, useState } from 'react'
import MeditationPlayer from '../MeditationPlayer';
import useSound from 'use-sound';

export default function MeditationModal({ src, type }) {
    const [isPlaying, setIsPlaying] = useState(false); // play button state
    const [time, setTime] = useState(null); // user desiered meditation time

    const [play, { pause, duration, sound }] = useSound(src); // song controls, duration and metadata

    const contentRef = useRef(null); // ref for content fadein animation

    useEffect(() => { // fade in for content
        let timeout = setTimeout(() => contentRef.current.style.opacity = 1, 500);
        return () => clearTimeout(timeout);
    }, [])

    const setPlaying = () => { // handle set play/pause
        isPlaying ? pause() : play();
        setIsPlaying(prev => !prev);
    }

    return (
        <>
            <div ref={contentRef} className={styles.content}>
                {
                    !time ?
                        <UserChooseTimes setDuration={setTime} />
                        :
                        <MeditationPlayer {...{ duration, isPlaying, setPlaying, sound, type, time }} />
                }
            </div>
        </>
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

// const [seconds, setSeconds] = useState(0); // song controls, duration and metadata
// const [currTime, setCurrTime] = useState({ min: "", sec: "" }); // song controls, duration and metadata

// useEffect(() => { // setting song metadata
//     const interval = setInterval(() => {
//         if (sound) {
//             setSeconds(sound.seek([])); // setting the seconds state with the current state
//             const min = Math.floor(sound.seek([]) / 60);
//             const sec = Math.floor(sound.seek([]) % 60);

//             setCurrTime({
//                 min,
//                 sec: sec < 10 ? "0" + sec : sec,
//             });
//         }
//     }, 1000);


//     return () => clearInterval(interval);
// }, [sound]);