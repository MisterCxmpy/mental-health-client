/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { useAuth } from "../../contexts/authContext";

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
  const intro1Ref = useRef();
  const intro2Ref = useRef();
  const message1Ref = useRef();
  const message2Ref = useRef();
  const continueBtnRef = useRef();

  const [step, setStep] = useState(0);
  const [error, setError] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const { completeIntro, updateGoals } = useAuth();

  const setSelected = (id) => {
    let inside = selectedGoals.includes(id);
    inside
      ? setSelectedGoals((p) => p.filter((g) => g !== id))
      : setSelectedGoals((prev) => [...prev, id]);
  };

  const complete = async (goals) => {
    if (selectedGoals.length == 0) {
      setError("Please Select at Least 1 Goal!");
      return;
    }
    let goalsStr = goals.map((g) => g.text);
    await updateGoals(goalsStr);
    completeIntro(goals);
  };

  const mapSelected = () =>
    selectedGoals.map((id) => mentalHealthGoals.find((g2) => g2.id == id));

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
      setStep(1);
    }, 1000);

    setTimeout(() => {
      intro2Ref.current.style.opacity = 1;
    }, 2000);
  }

  return (
    <>
      {step == 0 ? (
        <div ref={intro1Ref} className={styles["container"]}>
          <IntroPart
            {...{ message1Ref, message2Ref, continueBtnRef, switchInfo }}
          />
        </div>
      ) : null}

      {step == 1 ? (
        <div ref={intro2Ref} className={styles["container"]}>
          <GoalSelect
            {...{
              mentalHealthGoals,
              setSelected,
              selectedGoals,
              error,
              submit: () => complete(mapSelected(selectedGoals)),
            }}
          />
        </div>
      ) : null}
    </>
  );
}

function IntroPart({ message1Ref, message2Ref, continueBtnRef, switchInfo }) {
  let title = "SerenityAI!".split("");
  const TitleBtn = ({ letter }) => (
    <button className={styles["bounce"]} style={{ color: "#9A9FDD" }}>
      {letter}
    </button>
  );

  return (
    <>
      <div className={styles["heading"]}>
        <h1>
          Hello! Welcome to &#8203;
          {title.map((l, i) => (
            <TitleBtn key={l + i} {...{ letter: l }} />
          ))}
        </h1>
        <h3>Explain the goal of the app</h3>
      </div>
      <p ref={message1Ref} className={styles["message"]}>
        Welcome to our mental health app, designed to help you achieve your
        goals and improve your well-being. Our home page generates tasks based
        on a five-year plan, while our meditation soundtracks and engaging
        activities provide a break from stress. Join our community and get
        personalized support from your own AI mentor.
      </p>
      <p ref={message2Ref} className={styles["message"]}>
        Our app includes a forum for users to discuss progress, a store for
        different themes and AI personas, and a point system to keep you
        engaged. With our app, you can take charge of your mental health and
        overcome obstacles with confidence. Start your journey
        to a happier, healthier you.
      </p>
      <div>
        <button
          ref={continueBtnRef}
          className={`${styles["continue-btn"]} btn`}
          onClick={switchInfo}
        >
          Start your journey
        </button>
      </div>
    </>
  );
}

function GoalSelect({
  mentalHealthGoals,
  setSelected,
  selectedGoals,
  submit,
  error,
}) {
  return (
    <>
      <div className={styles["heading"]}>
        <h1>What are you looking to achieve?</h1>
        <h3>Select up to 5 options</h3>
      </div>

      <div className={styles["selection-list"]}>
        {mentalHealthGoals.map(({ id, text }) => (
          <Selection
            key={id}
            id={id}
            message={text}
            select={setSelected}
            selected={selectedGoals.includes(id)}
          />
        ))}
      </div>

      <div>
        <button className={`btn`} onClick={() => submit()}>
          Continue
        </button>
      </div>

      {error ? <p style={{ color: "red" }}>{error}</p> : null}
    </>
  );
}

function Selection({ message, select, id, selected }) {
  return (
    <div
      className={
        selected
          ? `${styles["selection"]} ${styles["active"]}`
          : `${styles["selection"]}`
      }
      onClick={() => select(id)}
    >
      <h4>{message}</h4>
    </div>
  );
}
