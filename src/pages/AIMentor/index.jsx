/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css"
import { useAuth } from "../../contexts/authContext";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "boring-avatars";
import { Loading, Loading2 } from "../../components";

export default function AIMentor() {
  const { user, updateMentor } = useAuth()
  const [history, setHistory] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changeHistory, setChangeHistory] = useState(false)
  const [input, setInput] = useState("");
  const textareaRef = useRef()

  const messagesEndRef = useRef(null);

  const handleSendMessage = async e => {
    if (!input) return;
    e.preventDefault()
    handleSendUserMessage(e)

    setLoading(true)
    let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: user.user_id, message: { content: input, role: 'user' }, mentor: user.mentor }) };
    let res = await fetch('https://mental-health-server-w9lq.onrender.com/mentor/chat', options)

    let response = await res.json();

    localStorage.setItem('mentorChat', JSON.stringify(response.history))
    setHistory(response.history);
    setLoading(false)
  }

  const handleSendUserMessage = async () => {
    setInput("")
    let userMessage = { id: Math.floor(Math.random() * 7863), content: input, role: 'user' }; // save to db

    setHistory(prev => {
      if(prev?.length) {
        return [...prev, userMessage]
      } else {
        return [userMessage]
      }
    });
  }

  useEffect(() => { // fetch chat history from db
    let cachedChat = localStorage.getItem('mentorChat');

    const getMentors = async () => {
      let response = await fetch('http://localhost:3000/mentor/info')
      let mentorData = await response.json();
      let historyData;

      if (cachedChat) {
        let data = JSON.parse(cachedChat);
        setHistory(data)
      } else {
        let response2 = await fetch('https://mental-health-server-w9lq.onrender.com/mentor/init', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: user.user_id, mentor: user.mentor }) })

        historyData = await response2.json()
      }


      if (response.ok) {
        setMentors(mentorData)
        if (historyData) {
          setHistory(historyData.history)
          localStorage.setItem('mentorChat', JSON.stringify(historyData.history))
        }
      } else {
        console.log(mentorData);
        console.log(historyData);
      }
    }



    getMentors()
  }, [])

  useEffect(() => { // fetch chat history from db
    messagesEndRef.current.scrollIntoView()
  }, [history])

  useEffect(() => { // fetch chat history from db
    if (loading) {
      setHistory(prev => {
        if(prev.length) {
          return [...prev, { message: 'Loading', loading: true }]
        }else {
          return [{ message: 'Loading', loading: true }]
        }
      })
    } else {
      setHistory(prev => prev.filter(p => !p.loading))
      textareaRef.current.focus();
    }

  }, [loading])

  const enterSubmit = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleChangeMentor = async (mentor) => {
    setChangeHistory(true)
    let history = await updateMentor(mentor);
    await delay(500);
    setHistory(history);
    setChangeHistory(false)
  }

  return (
    <div className="layout">
      <div className={styles["container"]}>

        <Conversation {...{ history, messagesEndRef, user, changeHistory }} />

        <div className={styles["input-box"]} onSubmit={handleSendMessage}>
          <div className={styles["options"]}>
            <div className={styles["menu"]}>
              <button className={styles["menu-button"]}><AiOutlineMenu /></button>
              <MentorSelect mentors={mentors} handleChangeMentor={handleChangeMentor} />
            </div>
          </div>

          <form className={styles["input-form"]}>
            <div className={styles["input"]}>
              <textarea
                ref={textareaRef}
                disabled={loading}
                className={styles["input-bar"]}
                value={input}
                type="text"
                placeholder="Enter your message here"
                required
                onChange={(e) => {
                  setInput(e.target.value)
                  e.target.style.height = "50px"
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={(e) => enterSubmit(e)}
              ></textarea>
              <button className={`${styles["submit"]} btn`}>Send Message</button>
            </div>
          </form>

        </div>
      </div>

    </div>
  )
}

function Conversation({ history = [], messagesEndRef, user, changeHistory }) {
  return (
    <>
      {!changeHistory ? <div className={styles["messages-container"]}>
      {history ? history.map((m, i) => <Message key={i} isYou={m.role == 'user'} message={m.content} loading={m.loading} user={user} />) : <Loading />}
      <div ref={messagesEndRef} />
    </div> : <div className={styles["loading-container"]}><Loading2 /></div>}
    </>
    
  )
}

function Message({ isYou, message, loading, user }) {
  return (
    <>
      {loading ? <div> <Loading />  </div> : <div className={`${styles[isYou ? "user-message" : "ai-message"]} ${styles["message"]}`}>
        <div className={styles["profile-picture"]}>
          {isYou ? <Avatar
            size={54}
            variant="marble"
            colors={["#9A9FDD", "#DEEFFE", "#E2FFFF"]}
          /> : <Avatar
            size={54}
            variant="pixel"
            colors={["#9A9FDD", "#DEEFFE", "#E2FFFF"]}
          />}
        </div>
        <p>{!isYou ? user.mentor + ":" : null} {message}</p>
      </div>}
    </>
  )
}

function MentorSelect({ mentors, handleChangeMentor }) {
  const { user } = useAuth()

  return (
    <ul className={styles["menu-list"]}>
      <li><p>Unlocked Mentors</p></li>
      {mentors.map((m) => (<li key={m} ><button className={user.mentor == m ? styles["active"] : null} onClick={() => handleChangeMentor(m)}>{m}</button></li>))}
    </ul>
  )
}
