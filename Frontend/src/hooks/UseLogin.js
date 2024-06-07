import React, { useState } from "react";
import  UseAuthContext  from "./UseAuthContext";
import { ToastContainer , toast } from "react-toastify";
const UseLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = UseAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("https://montaser-backend-3fpi.vercel.app/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      toast.error(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({
        type: "LOGIN",
        payload: json,
      });
      setIsLoading(false);
      setError(null);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
};

export default UseLogin;
