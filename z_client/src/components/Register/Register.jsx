import React from "react";
import "./Register.scss"
import { Link } from "react-router-dom";
const Register = () => {
    return (<div className="register">
        <div className="container">
            <img src="" alt="" className="logo" />
            <div className="register-form">
                <div className="register-form__title">Register</div>
                <div className="register-form__input">
                    <input type="text" placeholder="Username" />
                </div>
                <div className="register-form__input">
                    <input type="email" placeholder="Email" />
                </div>
                <div className="register-form__input">
                    <input type="password" placeholder="Password" />
                </div>
                <div className="register-form__button">
                    <button>Register</button>
                </div>
            </div>
            Already have an account? <Link to="/login">Login Here</Link>
        </div>
    </div>)
}

export default Register;