import React, { useState } from "react";
import UseLogin from "../../hooks/UseLogin";
import "./auth.css";
import EyeIcon from "../../assets/eye.svg";
import OffEyeIcon from "../../assets/offEye.svg"; 

const Signin = () => {
  const { login, isLoading, error } = UseLogin();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { email, password } = state;
    await login(email, password);
    setState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="form-container sign-in-container">
      <div className="text-wrapper">
        <div className="login_title">Login to your account</div>
        <p>To keep connected with us please login with your personal info</p>
      </div>
      <form onSubmit={handleOnSubmit} className="signUp-form">
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
