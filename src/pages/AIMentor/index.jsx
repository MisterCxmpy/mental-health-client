/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css"
import { useAuth } from "../../contexts/authContext";

export default function AIMentor() {
  const { user } = useAuth()
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState();

  const messagesEndRef = useRef(null);

  const handleSendMessage = async e => {
    if (!input) return;
    e.preventDefault()
    handleSendUserMessage(e)
    let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: { content: input, role: 'system' }, mentor: user.mentor }) };
    let res = await fetch('http://localhost:3000/mentor/chat', options)

    let response = await res.json();
    let assistantMessage = { id: Math.floor(Math.random() * 7863), isYou: false, message: response.message, role: 'assistant' } // save to db
    setHistory(prev => [...prev, assistantMessage]);
  }

  const handleSendUserMessage = async e => {
    e.target.reset()

    let userMessage = { id: Math.floor(Math.random() * 7863), isYou: true, message: input, role: 'user' }; // save to db
    setHistory(prev => [...prev, userMessage]);
  }

  useEffect(() => { // fetch chat history from db
    console.log(history);
    messagesEndRef.current.scrollIntoView()
  }, [history])

  return (
    <div className="layout">
      <div className={styles["container"]}>
        <div className={styles["messages-container"]}>
          {history.map(m => <Message key={m.id} isYou={m.isYou} message={m.message} />)}
          <div ref={messagesEndRef} />
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

function Conversation({ history, messagesEndRef }) {
  return (
    <div className={styles["messages-container"]}>
      {history.map(m => <Message key={m.id} isYou={m.isYou} message={m.message} />)}
      <div ref={messagesEndRef} />
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