/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import SideBar from "../../Components/SideBar/SideBar";
// import SearchBar from "../../Components/SearchBar/SearchBar";
import { useLocation} from "react-router-dom";
import back from "../../Assets/Icon/back.svg";import { Link } from "react-router-dom";
const UserProfile = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const location = useLocation();

  useEffect(() => {
  
    setUsername(location.state.username);
    setPassword(location.state.password);
    setEmail(location.state.email);
    setRole(location.state.role);
    setId(location.state.id);
  
    console.log(id);
  }, []);

  const updateInfo = (e) => {
    e.preventDefault();
  
    const updatedUser = {
      username,
      email,
      password,
      
    };
  
    const userId = id; 
  console.log(userId);
    fetch(`http://localhost:8000/api/users/updateMe/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User information updated successfully");

       alert("User information updated successfully")
        } else {
          console.error("Failed to update user.");
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };
  
  return (
    <div>
      <div className="user__container">
        <div className="user__sidebar">
          <SideBar></SideBar>
        </div>
        <div className="user__main">
          <div className="userProfile">Edit profile</div>
          <Link to={"/"} className="link">
            <div className="back">
              <img src={back} alt="" />
              {/* <div>Back</div> */}
            </div>
          </Link>
          <div className="user_booking_list_container">
            <form onSubmit={updateInfo}>
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
                    onChange={(e) => setUsername(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
                    disabled
                  />
                </div>
                <div className="form-row">
                  <button className="form-btn" type="submit" >
                    Submit
                  </button>
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
