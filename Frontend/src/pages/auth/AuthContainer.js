import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import "./auth.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authImg from "../../assets/authBg.jpg";
const AuthContainer = () => {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  return (
    <div className="Auth_warpper">
      <ToastContainer />
      {/* <div id="Authcontainer">
        <Signup />
     
          
            <div className="">
              <h1>Welcome Back!</h1>
              <br></br>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <br></br>
              <div style={{ color: "red" }}>
                or make account here{" "}
                <button
                  className=""
                  id="signUp"
                  onClick={() => handleOnClick("signUp")}
                >
                  Sign Up
                </button>
              </div>
            </div>
 
            <div className="">
              <h1>Hello, Friend!</h1>
              <br></br>
              <p>Enter your personal details and start journey with us</p>
              <br></br>
              already have an account ? sign in here{" "}
              <button
                className=""
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
       
        </div> */}

      <div className="Authcontainer">
        {/* <h1>Welcome Back!</h1>
        <br></br>
        <p>To keep connected with us please login with your personal info</p> */}
        {type === "signIn" ? (
          <div className="form-container">
            <Signin />
            <div
              className="sign-up-link"
              onClick={() => handleOnClick("signUp")}
            >
              <p>Dont have an account ? </p>
              <span>create an account</span>
            </div>
          </div>
        ) : (
          <div className="form-container">
            <Signup />
            <div
              className="sign-up-link"
              onClick={() => handleOnClick("signIn")}
            >
              <p>Already have an account ? </p>
              <span>Login here </span>
            </div>
          </div>
        )}
{/* 
        <div className="img-container">
          <img src={authImg} />
        </div> */}
      </div>
    </div>
  );
};

export default AuthContainer;
