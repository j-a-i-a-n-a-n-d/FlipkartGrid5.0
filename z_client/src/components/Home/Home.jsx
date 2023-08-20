import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import Cookies from "js-cookie";
import userIcon from "../../assets/user.png"
import F from '../../assets/f.png';
import QuestionMark from "../../assets/question.png";
import logo from "../../assets/2.svg";
import { useNavigate } from "react-router-dom"
const Home = () => {
    const [inputData, setInputData] = useState('');
    const handleKeyPress = (event) => {
        if (event.key === "Enter") handleGoClick();
    };
    const [userHistory, setUserHistory] = useState([]);
    const handleChange = (e) => setInputData(e.target.value);
    let navigate = useNavigate();
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
                .then((res) => { console.log(res.data); fetchData(); setInputData(''); })
                .catch((err) => console.log(err));
        }
    };

    const handleLogout = () => {
        axios
            .post("http://localhost:8000/api/logout/")
            .then((res) => {
                Cookies.remove('jwt');
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 1000);
            })
            .catch((res) => console.log(res));
    }

    const handleResetContext = () => {
        axios
            .post("http://localhost:8000/api/deletecontext/",
                { text: inputData },
                {
                    headers: {
                        'Authorization': Cookies.get('jwt'),
                    }
                })
            .then(res => console.log(res))
            .catch(res => console.log(res))
    }
    const fetchData = () => {
        axios
            .get("http://localhost:8000/api/userhistory/", {
                headers: {
                    'Authorization': Cookies.get('jwt'),
                }
            })
            .then((res) => { console.log(res.data); setUserHistory(res.data) })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="home">
            <div className="top-chat-container">
                {userHistory.map((data) => {
                    return <div className="wrapping-item">
                        <div className="item">
                            <div className="desc">
                                <span>{data.description}</span>
                                <img src={userIcon} alt="user icon" />
                            </div>
                            <div className="image-wrap">
                                <span><img src={F} /></span>
                                <img src={data.blob_url} loading="lazy" alt="result" />
                            </div>
                        </div>
                    </div>
                })}
            </div>
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
            <div className="logout-button"><button onClick={handleLogout}>Logout</button></div>
            <div className="question-mark"><img src={QuestionMark} /></div>
            <div className="how-to-use">Instructions to Use</div>
            <object className="logo" type="image/svg+xml" data={logo} width="150" height="150">Your browser does not support SVG.</object>
            <div className="profile-info"><img src={userIcon} width="40" height="40" /></div>
            <div className="resetContext" onClick={handleResetContext}><button>Reset Context</button></div>
        </div>
    );
}

export default Home;

