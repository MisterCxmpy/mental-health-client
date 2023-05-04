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
            const response = await fetch(
                "http://localhost:3000/games/initiateGame"
            );
            const image = await response.json();
            const imageURL = image.url;
            setImage(imageURL);
            setIsLoading(false);
        };
        initiateGame();
    }, []);
    const getImage = async (prompt) => {
        setIsLoading(true);
        const response = await fetch(
            "http://localhost:3000/games/createImage",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({ prompt: prompt }),
            }
        );
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
        const response = await fetch(
            "http://localhost:3000/games/checkAnswer",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({answer: inputValue}),
            }
        );

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
                <img
                    src="https://giphy.com/embed/RgzryV9nRCMHPVVXPV"
                    alt="loading"
                />
            ) : (
                <div className={`blotchart`}>
                    <h2>Expression Exercise</h2>
                    <img src={image} alt="Expression Exercise" />
                    <p>{textData}</p>
                    {!isFormSubmitted ? (
                        <>
                            <p>
                                Share your best understanding of the image and
                                what it means to you.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(event) =>
                                        setInputValue(event.target.value)
                                    }
                                />
                                <input type="submit" value="Submit" />
                            </form>
                        </>
                    ) : (
                        <button onClick={handleContinueGame}>Continue</button>
                    )}
                </div>
            )}
        </>
    );
}
