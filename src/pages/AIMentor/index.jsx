/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./index.module.css"

export default function AIMentor() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState();

  const handleSendMessage = async e => {
    if (!input) return;
    e.preventDefault()
    handleUserMessageState(e)
    let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: { content: input, role: 'user' } }) };
    let res = await fetch('http://localhost:3000/mentor/chat', options)

    let response = await res.json();
    if (res.ok) {
      let assistantMessage = { id: Math.floor(Math.random() * 7863), isYou: false, content: response.message, role: 'assistant' } // save to db
      setHistory(prev => [...prev, assistantMessage]);
    } else {
      console.log(response);
      setHistory(prev => [...prev, { id: Math.floor(Math.random() * 7863), isYou: false, content: `Error`, role: 'system' }]);
    }

  }

  const handleUserMessageState = async e => {
    e.target.reset()

    let userMessage = { id: Math.floor(Math.random() * 7863), isYou: true, content: input, role: 'user' }; // save to db
    setHistory(prev => [...prev, userMessage]);
  }

  useEffect(() => { // fetch chat history from db
    console.log(history);
  }, [history])

  return (
    <div className="layout">
      <div className={styles["container"]}>
        <div className={styles["messages-container"]}>
          {history.map(m => <Message key={m.id} isYou={m.isYou} message={m.content} />)}
        </div>
        <div className={styles["input-box"]} onSubmit={handleSendMessage}>
          <div className={styles["options"]}></div>
          <form className={styles["input-form"]}>
            <div className={styles["input"]}>
              <input
                className={styles["input-bar"]}
                type="text"
                placeholder="Enter your message here"
                required
                onChange={(e) => setInput(e.target.value)}
              />
              <button className={`${styles["submit"]} btn`}>Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function Message({ isYou, message }) {
  return (
    <div className={`${styles[isYou ? "user-message" : "ai-message"]} ${styles["message"]}`}>
      <div className={styles["profile-picture"]}></div>
      <p>{message}</p>
    </div>
  )
}