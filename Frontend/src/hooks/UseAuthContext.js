import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const UseAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error(
      "Use Authentication Context must be used inside authentication context provider"
    );
  }
  return context;
};

export default UseAuthContext;
