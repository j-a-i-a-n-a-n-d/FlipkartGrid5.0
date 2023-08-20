import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import Cookies from "js-cookie";
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
            console.log(Cookies.get('jwt'));
            axios
                .post("http://localhost:8000/api/text2image/",
                    { text: inputData },
                    {
                        headers: {
                            'Authorization': Cookies.get('jwt'),
                        }
                    })
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
            .get("http://localhost:8000/api/userhistory/", {
                headers: {
                    'Authorization': Cookies.get('jwt'),
                }
            })
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
                    placeholder="Type here to Prompt Fashion GPT..."
                />
                <button id="go-button" onClick={handleGoClick}> &gt;&gt;</button>
            </div>
        </div>
    );
}

export default Home;

