import styles from './styles.module.css'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { MeditationPlayer } from '../../components';


export default function Meditations() {
    const { id } = useParams();
    let [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const contentRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        if(playerRef?.current) isPlaying ? playerRef.current.play() : playerRef.current.pause()
    }, [isPlaying])
        
    useEffect(() => {
        let timeout = setTimeout(() => contentRef.current.style.opacity = 1, 500);
        return () => clearTimeout(timeout);
    }, [])

    const setPlaying = () => {
        setIsPlaying(prev => !prev);
    }


    return (
        <div className="layout">
            <div ref={contentRef} className={styles.content}>
                {
                    !duration ?
                        <UserChooseTimes setDuration={setDuration} />
                        :
                        <MeditationPlayer {...{ duration, isPlaying, ref: playerRef, meditation_id: id, setPlaying, setDuration }} />
                }
            </div>
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