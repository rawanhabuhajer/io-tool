import "./App.css";
import "./Components/SearchBar/SearchBar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./Pages/Users/Users";
import UserProfile from "./Pages/UserProfile/UserProfile";
import SignIn from "./Pages/signIn/SignIn";
import AddUser from "./Pages/addUser/AddUser";
import Profile from "./Pages/profile/Profile";
import { Navigate } from "react-router-dom";


function App() {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         
          <Route path="/login"   element={ <SignIn /> }></Route>

          

          <Route
            path="/"
            element={user ? <Users /> : <Navigate to="/" />}
          ></Route>
        
          <Route
            path="/user-profile"
            element={ <UserProfile /> }
          ></Route>
        
          <Route
            path="/add-user"
            element={user ? <AddUser /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/edit-user"
            element={<Profile /> }
          ></Route>
       
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
