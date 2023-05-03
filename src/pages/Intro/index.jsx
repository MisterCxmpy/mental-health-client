import { useEffect, useRef } from "react";
import styles from "./index.module.css";

export default function Intro() {

  const message1Ref = useRef();
  const message2Ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      message1Ref.current.style.opacity = 1;
    }, 2000);

    setTimeout(() => {
      message2Ref.current.style.opacity = 1;
    }, 7000);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>
          Hello! Welcome to <span style={{ color: '#9A9FDD' }}>MHM!</span>
        </h1>
        <h3>Explain the goal of the app</h3>
      </div>
      <p ref={message1Ref} className={styles.message}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quasi
        necessitatibus labore sapiente minus debitis maxime libero id quo
        inventore, porro ipsa aspernatur unde modi quaerat laboriosam, deserunt
        molestiae. Explicabo?
      </p>
      <p ref={message2Ref} className={styles.message}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quasi
        necessitatibus labore sapiente minus debitis maxime libero id quo
        inventore, porro ipsa aspernatur unde modi quaerat laboriosam, deserunt
        molestiae. Explicabo?
      </p>
      <button className="btn">Continue</button>
    </div>
  );
}
