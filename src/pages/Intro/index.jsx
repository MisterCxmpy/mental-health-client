import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

const mentalHealthGoals = [
  { id: 1, text: "Practice mindfulness for 10 minutes each day." },
  { id: 2, text: "Attend one therapy session per month." },
  { id: 3, text: "Develop a daily self-care routine." },
  { id: 4, text: "Join a support group." },
  { id: 5, text: "Set boundaries with toxic people." },
  { id: 6, text: "Create a gratitude list each week." },
  { id: 7, text: "Take a mental health day once per month." },
  { id: 8, text: "Learn a relaxation technique." },
  { id: 9, text: "Identify and challenge negative thoughts." },
  { id: 10, text: "Celebrate small victories and progress." },
];

export default function Intro() {

  const intro1Ref = useRef()
  const intro2Ref = useRef()
  const message1Ref = useRef();
  const message2Ref = useRef();
  const continueBtnRef = useRef();

  const mentalHealthGoals = [
    "Practice mindfulness for 10 minutes each day.",
    "Attend one therapy session per month.",
    "Develop a daily self-care routine.",
    "Join a support group.",
    "Set boundaries with toxic people.",
    "Create a gratitude list each week.",
    "Take a mental health day once per month.",
    "Learn a relaxation technique.",
    "Identify and challenge negative thoughts.",
    "Celebrate small victories and progress."
  ];

  useEffect(() => {
    setTimeout(() => {
      intro1Ref.current.style.opacity = 1;
    }, 500);

    setTimeout(() => {
      message1Ref.current.style.opacity = 1;
    }, 2000);

    setTimeout(() => {
      message2Ref.current.style.opacity = 1;
    }, 5000);

    setTimeout(() => {
      continueBtnRef.current.style.opacity = 1;
    }, 7000);
  }, []);

  function switchInfo() {
    intro1Ref.current.style.opacity = 0;
    setTimeout(() => {
      intro1Ref.current.remove()
    }, 1000);

    setTimeout(() => {
      intro2Ref.current.style.opacity = 1;
    }, 2000);
  }

  return (
    <>
      <div ref={intro1Ref} className={styles["container"]}>
        <div className={styles["heading"]}>
          <h1>
            Hello! Welcome to &#8203;
            <button className={styles["bounce"]} style={{ color: '#9A9FDD' }}>M</button>
            <button className={styles["bounce"]} style={{ color: '#9A9FDD' }}>H</button>
            <button className={styles["bounce"]} style={{ color: '#9A9FDD' }}>M</button>
            <button className={styles["bounce"]} style={{ color: '#9A9FDD' }}>!</button>
          </h1>
          <h3>Explain the goal of the app</h3>
        </div>
        <p ref={message1Ref} className={styles["message"]}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quasi
          necessitatibus labore sapiente minus debitis maxime libero id quo
          inventore, porro ipsa aspernatur unde modi quaerat laboriosam, deserunt
          molestiae. Explicabo?
        </p>
        <p ref={message2Ref} className={styles["message"]}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quasi
          necessitatibus labore sapiente minus debitis maxime libero id quo
          inventore, porro ipsa aspernatur unde modi quaerat laboriosam, deserunt
          molestiae. Explicabo?
        </p>
        <button ref={continueBtnRef} className={`${styles["continue-btn"]} btn`} onClick={switchInfo}>Continue</button>
      </div>
      <div ref={intro2Ref} className={styles["container"]}>
        <div className={styles["heading"]}>
          <h1>
            What are you looking to achieve?
          </h1>
          <h3>Select up to 5 options</h3>
        </div>
        <div className={styles["selection-list"]}>
          {mentalHealthGoals.map((goal, i) => {
            return(
              <Selection count={i} message={goal}/>
            )
          })}
        </div>
      </div>
    </>
  )
}

function Selection({count, message}) {
  return (
    <div className={selected ? `${styles["selection"]} ${styles["active"]}` : `${styles["selection"]}`} onClick={() => select(id)}>
      <h4>{message}</h4>
    </div>
  );
}
