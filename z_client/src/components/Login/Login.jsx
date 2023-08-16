import React from "react";
import "./Login.scss"
import { Link } from "react-router-dom";
const Login = () => {
    return (<div className="login">
        <div className="container">
            <img src="" alt="" className="logo" />
            <div className="login-form">
                <div className="login-form__title">Login</div>
                <div className="login-form__input">
                    <input type="email" placeholder="Email" />
                </div>
                <div className="login-form__input">
                    <input type="password" placeholder="Password" />
                </div>
                <div className="login-form__button">
                    <button>Login</button>
                </div>
            </div>
            New to the Platform? <Link to="/register">Register Here</Link>
        </div>
    </div>)
}

export default Login;