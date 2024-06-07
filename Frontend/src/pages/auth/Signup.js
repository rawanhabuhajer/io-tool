import React, { useState } from "react";
import UseSignup from "../../hooks/UseSignup";
import { ToastContainer, toast } from "react-toastify";
import EyeIcon from "../../assets/eye.svg";
import OffEyeIcon from "../../assets/offEye.svg";

import "./auth.css";
const Signup = () => {
  const { signup, isLoading, error } = UseSignup();
  const [state, setState] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { username, email, password, confirmPassword } = state;

    await signup(username, email, password, confirmPassword);
    console.log(username);
    for (const key in state) {
      setState({
        ...state,
      });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <div className="text-wrapper">
        <div className="login_title">Create new account</div>
        <p>Enter your personal details and start journey with us</p>
      </div>
      <form onSubmit={handleOnSubmit} className="signUp-form">
        <br />
        <input
          type="text"
          name="username"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          className="signUp-input"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          className="signUp-input"
        />
        <div className="form-contro">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
            className="signUp-input"
          />
          <img
            src={showPassword ? OffEyeIcon : EyeIcon}
            onClick={() => setShowPassword(!showPassword)}
            alt="Toggle Password Visibility"
          />
        </div>
        <div className="form-contro">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
            className="signUp-input"
          />
          <img
            src={showConfirmPassword ? OffEyeIcon : EyeIcon}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            alt="Toggle Password Visibility"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
