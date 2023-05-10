import { useState } from "react";
import styles from "./index.module.css";
import { useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AIMentor from "../../pages/AIMentor";
import Loading2 from "../Loading2";
export default function CreateForum({ setOpen, setForums }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [depressedMessage, setDepressedMessage] = useState(false);
    const [encourage, setEncourage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    async function handleDepressingMessage() {
        if (!title) return;
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: user.user_id,
                message: { content: title + "\n" + body, role: "user" },
                mentor: user.mentor,
            }),
        };
        let res = await fetch("http://localhost:3000/mentor/chat", options);

        let response = await res.json();
        setDepressedMessage(true);
        localStorage.setItem("mentorChat", JSON.stringify(response.history));
        setIsLoading(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const moderation = await fetch("http://localhost:3000/games/moderate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                prompt: title + `\n` + body || "",
            }),
        });
        const moderationResponse = await moderation.json();

        if (
            moderationResponse.approved == false ||
            moderationResponse.rating < 0.4
        ) {
            toast.success(`${user.mentor} has sent you a message!`);
            setEncourage(moderationResponse.ai_starter);
            handleDepressingMessage();
            return;
        }
        const response = await fetch("http://localhost:3000/forums", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                user_id: user.user_id,
                title: title,
                content: body || "",
            }),
        });

        const data = await response.json();
        setForums((prev) => [...prev, data]);
        setOpen(false);
        setIsLoading(false);
    }

    return (
            <>  
            {isLoading ? (<Loading2/>): (
                <>
            {depressedMessage ? (
                <div className="chatOnly">
                    <AIMentor loadChatOnly={true} />
                    <Link className={styles["link"]} to={"/my-ai-mentor"}>
                        <button className="btn">Have a chat</button>
                    </Link>
                </div>
            ) : (
                <div className={styles["forum"]}>
                    <form
                        className={styles["forum-form"]}
                        onSubmit={handleSubmit}
                    >
                        <div className={styles["input"]}>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                required
                                role="titleInput"
                            />
                        </div>
                        <div
                            className={`${styles["input"]} ${styles["textarea"]}`}
                        >
                            <textarea
                                type="text"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Body (Optional)"
                                role="bodyTextarea"
                            />
                        </div>
                        <div className={styles["input"]}>
                            <button
                                className={`${styles["submit-btn"]} btn`}
                                type="submit"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            
            )}
            </>
            )}
        </>
    );
}
