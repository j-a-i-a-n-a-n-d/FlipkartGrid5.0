import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";

const Home = () => {
    const [inputData, setInputData] = useState('');

    const handleKeyPress = (event) => {
        if (event.key === "Enter") handleGoClick();
    };

    const handleChange = (e) => setInputData(e.target.value);

    const handleGoClick = () => {
        console.log("GO button clicked with input:", inputData);
        console.log(inputData.length)
        if (inputData.length !== 0) {
            axios
                .post("http://127.0.0.1:8000/text2image/", { text: inputData })
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err));
        }
    };
    useEffect(() => {

    });
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        axios
            .post("http://127.0.0.1:8000/userhistory/")
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
    };

    return (
        <div className="home">
            <div className="top-chat-container"></div>
            <div className="bottom-chat-box">
                <input
                    name="search"
                    type="text"
                    value={inputData}
                    onChange={handleChange}
                    onKeyUp={handleKeyPress}
                    placeholder="type here to prompt fashion gpt..."
                />
                <button id="go-button" onClick={handleGoClick}>GO</button>
            </div>
        </div>
    );
}

export default Home;

