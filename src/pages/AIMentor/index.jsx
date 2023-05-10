/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { useAuth } from "../../contexts/authContext";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "boring-avatars";
import { Loading, Loading2 } from "../../components";
import useMarketplaceCategories from "../../hooks/useMarketplaceCategories";

export default function AIMentor({ loadChatOnly = false }) {
  const { user, updateMentor } = useAuth();
  const [history, setHistory] = useState([]);
  const [thumbnail, setThumbnail] = useState("")
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changeHistory, setChangeHistory] = useState(false);
  const [input, setInput] = useState("");
  const textareaRef = useRef();

  const messagesEndRef = useRef(null);

  const handleSendMessage = async (e) => {
    if (!input) return;
    e.preventDefault();
    appendUserMessage(e);

    setLoading(true);
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.user_id,
        message: { content: input, role: "user" },
        mentor: user.mentor,
      }),
    };
    let res = await fetch("https://mental-health-server-w9lq.onrender.com/mentor/chat", options);

    let response = await res.json();

    if (res.ok) {
      localStorage.setItem("mentorChat", JSON.stringify(response.history));
      setHistory(response.history);
    } else {
      let assistantMessage = {
        id: Math.floor(Math.random() * 7863),
        content: response.error,
        role: "assistant",
        error: true,
      }; // save to db
      setHistory((prev) => [...prev, assistantMessage]);
    }

    setLoading(false);
  };

  const appendUserMessage = () => {
    setInput("");
    let userMessage = {
      id: Math.floor(Math.random() * 7863),
      content: input,
      role: "user",
    }; // save to db

    setHistory((prev) => {
      if (prev?.length) {
        return [...prev, userMessage];
      } else {
        return [userMessage];
      }
    });
  };

  const handleClearChat = async () => {
    setInput("");

    let response = await fetch("https://mental-health-server-w9lq.onrender.com/mentor/chat/clear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.user_id, mentor: user.mentor }),
    });

    let data = await response.json();

    if (response.ok) {
      setHistory(data);
    }
    console.log(data);

    localStorage.removeItem("mentorChat");
  };

  useEffect(() => {
    // fetch chat history from db
    let cachedChat = localStorage.getItem("mentorChat");
    setMentors([...user.owned_mentors]);

    const getMentors = async () => {
      let historyData;
      let response = await fetch("https://mental-health-server-w9lq.onrender.com/mentor/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.user_id, mentor: user.mentor }),
      });

      if (response.ok) {
        historyData = await response.json();
      } else {
        historyData = [];
      }

      if (response.ok) {
        setHistory(historyData.history);

        if (historyData) {
          localStorage.setItem(
            "mentorChat",
            JSON.stringify(historyData.history)
          );
        }
      }
    };
    if (cachedChat !== "undefined") {
      let data = JSON.parse(cachedChat);
      setHistory(data);
    } else {
      getMentors();
    }
  }, []);

  useEffect(() => {
    // fetch chat history from db
    messagesEndRef.current.scrollIntoView();
  }, [history]);

  useEffect(() => {
    // fetch chat history from db
    if (loading) {
      setHistory((prev) => {
        if (prev.length) {
          return [...prev, { message: "Loading", loading: true }];
        } else {
          return [{ message: "Loading", loading: true }];
        }
      });
    } else {
      setHistory((prev) => prev?.filter((p) => !p.loading));
      if (!loadChatOnly) textareaRef.current.focus();
    }
  }, [loading, loadChatOnly]);

  const enterSubmit = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleChangeMentor = async (mentor) => {
    setChangeHistory(true);
    let {history, mentor_details} = await updateMentor(mentor);
    await delay(500);
    setThumbnail(mentor_details)
    setHistory(history);
    setChangeHistory(false);
  };

  useEffect(() => {
    async function getProfilePicture() {
      let { mentor_details } = await updateMentor(user.mentor);
      setThumbnail(mentor_details)
    }

    getProfilePicture()
  }, [])

  return (
    <>
      {loadChatOnly ? (
        <Conversation {...{ history, messagesEndRef, user, changeHistory }} />
      ) : (
        <div className="layout">
          <div className={styles["container"]}>
            <Conversation
              {...{
                history,
                messagesEndRef,
                user,
                changeHistory,
                thumbnail
              }}
            />

            <div className={styles["input-box"]} onSubmit={handleSendMessage}>
              <div className={styles["options"]}>
                <div className={styles["menu"]}>
                  <button className={styles["menu-button"]}>
                    <AiOutlineMenu />
                  </button>
                  <MentorSelect
                    categories={<Categories user={user} handleChangeMentor={handleChangeMentor} history={history}/>}
                  />
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
                      setInput(e.target.value);
                      e.target.style.height = "50px";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    onKeyDown={(e) => enterSubmit(e)}
                  ></textarea>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1em",
                    }}
                  >
                    <button className={`${styles["submit"]} btn`}>
                      Send Message
                    </button>
                    <button
                      style={{ height: "65px" }}
                      type="button"
                      className="btn"
                      onClick={() => handleClearChat()}
                    >
                      Clear Chat
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Conversation({ history = [], messagesEndRef, user, changeHistory, thumbnail }) {

  return (
    <>
      {!changeHistory ? (
        <div className={styles["messages-container"]}>
          {history.length ? (
            history.map((m, i) => (
              <Message
                key={i}
                isYou={m.role == "user"}
                message={m.content}
                loading={m.loading}
                user={user}
                error={m.error}
                thumbnail={thumbnail}
              />
            ))
          ) : (
            <Message
              isYou={true}
              message={`Start chatting to ${user.mentor} now! Just send a message.`}
              user={user}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className={styles["loading-container"]}>
          <Loading2 />
        </div>
      )}
    </>
  );
}

function Message({ isYou, message, loading, user, error = false, thumbnail }) {
  return (
    <>
      {loading ? (
        <div>
          {" "}
          <Loading />{" "}
        </div>
      ) : (
        <div
          className={`${styles[isYou ? "user-message" : "ai-message"]} ${
            styles["message"]
          }`}
        >
          <div className={styles["profile-picture"]}>
            {isYou ? (
              <Avatar
                size={54}
                variant="marble"
                colors={["#9A9FDD", "#DEEFFE", "#E2FFFF"]}
              />
            ) : (
              <img src={thumbnail} alt="" />
            )}
          </div>
          <p style={error ? {color: "red"} : {color: "#202020"}}>
            {!isYou ? user.mentor + ":" : null} {message}
          </p>
        </div>
      )}
    </>
  );
}

function MentorSelect({ categories }) {
  return (
    <ul className={styles["menu-list"]}>
      <p>Unlocked Mentors</p>
      {categories}
    </ul>
  );
}

function Categories({ user, handleChangeMentor }) {

  const { categories } = useMarketplaceCategories()

  return (
    <>
      <li style={{borderBottom: "1px solid #8183b9"}} onClick={() => handleChangeMentor("Morgan")}>Morgan</li>
      {categories.map((c, i) => {
        const isLastCategory = i === categories.length - 1
        return (
          <li key={i} className={styles["category"]}>
            {c} ({user.owned_mentors.filter((m) => m.category == c).length})
            <ul key={i} className={styles["sub-category"]} style={isLastCategory ? {transform: "translateY(-80%)"} : null}>
              {user.owned_mentors.map((m, i) => {
                return (
                    m.category == c ? <li key={i} onClick={() => handleChangeMentor(m.name)}>{m.name}</li> : null
                )
              })}     
            </ul>
          </li>
        )
      })}
    </>

    
  )
}