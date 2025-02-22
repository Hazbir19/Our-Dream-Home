import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ContextMain } from "../Context/ContextApi";

const PrivateRouter = ({ children }) => {
  const { user, loadding } = useContext(ContextMain);
  if (loadding) {
    return <span className="loading loading-dots loading-lg"></span>;
  }
  if (user) {
    return children;
  }

  return <Navigate to="/" replace></Navigate>;
};

export default PrivateRouter;
