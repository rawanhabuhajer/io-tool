import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
const SignIn = () => {
  const Navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");


  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    
    const data = await res.json();

    if (res.ok) {
    localStorage.setItem('user',JSON.stringify(data))
    localStorage.getItem("user");

 
      Navigate('/')

     
    } else {
      setError(data.error);
    }
  };


  const emailHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <>

      <div className="signin__container">
        <form onSubmit={submitHandler}>
          <div className="signin">Sign in</div>
          <label>Email</label>
          <input className="signin_input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={emailHandler}
          />

          <label>Password</label>
          <input className="signin_input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={passwordHandler}
          />
            { error && <div className="signup__error__div">{error}</div>}
          <button>sign in</button>
        </form>
          <p className="signiup_transform" style={{fontSize:"12px" , marginLeft:"10px"}}> If you don’t have an account register<br></br>
            You can  <span style={{color:"#4481EB"}}><Link style={{color:"#4481EB", textDecoration: "none"}} to={"/"}> Register here !</Link></span></p>
      </div>

    </>
  );
};

export default SignIn;
