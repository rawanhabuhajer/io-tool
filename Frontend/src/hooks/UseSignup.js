import React, { useEffect, useState } from "react";
import  UseAuthContext  from "./UseAuthContext";
import { ToastContainer , toast } from "react-toastify";
const UseSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = UseAuthContext();

  const signup = async (username, email, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setIsLoading(false);
      setError("Passwords do NOT match.");
      toast(error);
    } else {
      try {
        const response = await fetch("https://montaser-backend-3fpi.vercel.app/api/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        const json = await response.json();

        if (!response.ok) {
          setIsLoading(true);
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
          toast(response.message);
        }
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
        toast(error);
      }
    }
  };

  return {
    signup,
    isLoading,
    error,
  };
};

export default UseSignup;
