/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import "./Profile.css";
import SideBar from "../../Components/SideBar/SideBar";
// import SearchBar from "../../Components/SearchBar/SearchBar";
import { useLocation } from "react-router-dom";
import back from "../../Assets/Icon/back.svg";
import { Link } from "react-router-dom";
const Profile = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const location = useLocation();


  useEffect(() => {
    console.log(location);
    setUsername(location.state.username);
    setPassword(location.state.password);
    setEmail(location.state.email);
    setRole(location.state.role);
  }, []);

  const updateInfo = (e) => {
    e.preventDefault();

    const updatedUser = {
      username,
      email,
      password,
    };

    const userId = location.state._id; 

    fetch(`http://localhost:8000/api/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          setEmail("")
          setPassword("")
          setUsername("")
          setAlertType("success");
          setAlertMessage("User information updated successfully");
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
          <div className="userProfile">Edit user</div>
          <Link to={"/"} className="link">
            <div className="back">
              <img src={back} alt="" />
              {/* <div>Back</div> */}
            </div>
          </Link>
          {alertMessage && (
        <div className={`alert alert-${alertType}`}>
          {alertMessage}
        </div>
      )}
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
                  <button className="form-btn">Submit</button>
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
