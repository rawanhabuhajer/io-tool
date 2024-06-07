/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import "./Users.css";
import SideBar from "../../Components/SideBar/SideBar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import deleteIcon from "../../Assets/Icon/deleteIcon.svg";
import edit from "../../Assets/Icon/edit.svg";
import userImg from "../../Assets/Img/userImg.svg";
import adduser from "../../Assets/Icon/adduser.svg";

// import quickState from '../../Assets/Icon/quickState.svg';
// import { Component } from "react";
// import Chart from "react-apexcharts";
// import ReactApexChart from 'react-apexcharts';

import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currenUser, setCurrentUser] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/user/")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data.users);
        console.log(data);
        const data1 = localStorage.getItem("user");
        const userdata = JSON.parse(data1);
        setCurrentUser(userdata.user);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="loader"></div>;
  }

  const deleteUser = (id) => {
    fetch(`http://localhost:8000/api/user/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedUserData = userData.filter((user) => user._id !== id);
          setUserData(updatedUserData);
        } else {
          console.error("Failed to delete user.");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <>
      <div>
        <div className="users__container">
          <div className="users__sidebar">
            <SideBar></SideBar>
          </div>
          <div className="users__top">
            <SearchBar></SearchBar>
          </div>
          <div className="users__main">
            <div className="schedule">
              <div>Users</div>
              <div
                className="add-new-wrapper"
                onClick={() => navigate("./add-user")}
              >
                <p>Add new</p>
                <img src={adduser} alt="" className="add_icon" />
              </div>
            </div>

            <div className="users__list">
              <div className="users__list__title">
                <div>User ID</div>
                <div>Username</div>
                <div>Email</div>
                <div>Role</div>
                <div>Control</div>
              </div>
              <div className="users__data__container">
                {userData.map((user) => (
                  <div className="users__data" key={user._id}>
                    <div>{user._id.substring(0, 10)}</div>
                    <div>{user.username}</div>
                    <div>{user.email}</div>
                    <div>{user.role}</div>
                    <div className="users__icon__container">
                      <div>
                        <img
                          src={edit}
                          alt=""
                          onClick={() =>
                            navigate("/edit-user", { state: user })
                          }
                        />
                      </div>
                      <div>
                        <img
                          src={deleteIcon}
                          alt=""
                          onClick={() => deleteUser(user._id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
