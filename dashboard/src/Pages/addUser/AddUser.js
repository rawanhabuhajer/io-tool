import React from "react";
import "./AddUser.css";
import SideBar from "../../Components/SideBar/SideBar";
import back from "../../Assets/Icon/back.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

const AddUser = () => {

  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const [email , setEmail] = useState('');
  const [role , setRole] = useState('');
  const [error, setError] = useState("");

  const createUser = async(e) =>{

    e.preventDefault();
       const res = await fetch("http://localhost:8000/api/user/signup", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           username,
           email,
           password,
        
         }),
       });
       const data = await res.json();
       console.log(data);
 
       setError(data.error);
 
       if (res.ok) {
 
          console.log('object');
         
        setError(null);
       } else if (!res.ok) {
         setError(data.error);
       }
     }
    
 

  return (

    <>
      <div className="user__container">
        <div className="user__sidebar">
          <SideBar></SideBar>
        </div>
        <div className="user__main">
          <div className="userProfile">Add user</div>
          <Link to={"/"} className="link">
            <div className="back">
              <img src={back} alt="" />
              {/* <div>Back</div> */}
            </div>
          </Link>

          <div className="user_booking_list_container">
            <form onSubmit={createUser}>
              <h4>user information</h4>
              <section>
                <div className="form-row">
                  <label htmlFor="" className="label">
                    username :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="" className="label">
                    Email :
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="" className="label">
                    Password :
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="" className="label">
                    Role :
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Role"
                 value={role}
                 onChange={(e)=> setRole(e.target.value)}
                 disabled
                  />
                   {error && <div className="error-message">{error}</div>}
                </div>
                <div className="form-row">
                  <button className="form-btn">Submit</button>
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
