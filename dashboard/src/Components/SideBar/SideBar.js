import React, { useState } from "react";
import "./SideBar.css";
import logo from "../../Assets/Img/logo.svg";
import logo2 from "../../Assets/Img/logo2.svg";
import Scedule from "../../Assets/Icon/Scedule.svg";
import experts from "../../Assets/Icon/experts.svg";
import home from "../../Assets/Icon/home.svg";
import users from "../../Assets/Icon/users.svg";
import users2 from "../../Assets/Icon/users2.svg";
import logout from "../../Assets/Icon/logout.svg";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const [selectedIcon, setSelectedIcon] = useState(true);
  const handleLogout = async () => {
    navigate("/login");
    setTimeout(() => {
      localStorage.removeItem("user");
    }, 3000);
  };

  return (
    <>
      <div className="side__bar position-fixed">
        <div className="top__icons__container">
          <img src={logo2} alt="logo" className="logo" />
          <div
            className={`icons__container ${selectedIcon ? "active" : ""}`}
            onClick={() => setSelectedIcon(true)}
          >
            <Link to="/">
              {selectedIcon ? (
                <img src={users2} alt="" />
              ) : (
                <img src={users} alt="" />
              )}
            </Link>
          </div>
        </div>

        <div className="logout" onClick={handleLogout}>
          <img src={logout} alt="" />
        </div>
      </div>
    </>
  );
};

export default SideBar;
