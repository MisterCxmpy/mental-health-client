import Loading2 from "../Loading2";
import styles from "./index.module.css";
import React, { useState, useEffect } from "react";

export default function BlotChart({ index }) {
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState("");
  const [textData, setTextData] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [nextPrompt, setNextPrompt] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [chatButton, setChatButton] = useState(false);
  useEffect(() => {
    const initiateGame = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/games/initiateGame");
      const image = await response.json();
      const imageURL = image.url;
      setImage(imageURL);
      setIsLoading(false);
    };
    initiateGame();
  }, []);
  const getImage = async (prompt) => {
    setIsLoading(true);
    const response = await fetch("http://localhost:3000/games/createImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });
    const image = await response.json();
    const imageURL = image.url;
    setImage(imageURL);
    setIsLoading(false);
  };
  const handleSubmit = async (event) => {
    if (!inputValue || inputValue.length == 0) return;
    event.preventDefault();
    setIsFormSubmitted(true);
    setIsLoading(true);
    const response = await fetch("http://localhost:3000/games/checkAnswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer: inputValue }),
    });

    const responseData = await response.json();
    setTextData(responseData.encourage);
    await getImage(responseData.dall_e_motivational);
    setNextPrompt(responseData.dall_e_ink);
    // if(responseData.sentiment < 0.4){
    //     setChatButton(true);

    // }
  };
  const handleContinueGame = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsFormSubmitted(false);
    await getImage(nextPrompt);
    setTextData("");
    setInputValue("");
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading2 />
      ) : (
        <div className={styles[`blotChart`]}>
          <h2>Expression Exercise</h2>
          <img className={styles["image"]} src={image} alt="Expression Exercise" />
          <p>{textData}</p>
          {!isFormSubmitted ? (
            <>
              <p>
                Share your best understanding of the image and what it means to
                you.
              </p>
              <div className={styles["input"]}>
                <form className={styles["input-form"]} onSubmit={handleSubmit}>
                  <div className={styles["input-field"]}>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                      className={styles["input-bar"]}
                      placeholder="What do you see?"
                    />
                  </div>
                    <input className={`${styles["submit-btn"]} btn`} type="submit" value="Submit" />
                </form>
              </div>
            </>
          ) : (
            <button onClick={handleContinueGame}>Continue</button>
          )}
        </div>
      )}
    </>
  );
}
