import React, { useContext } from "react";
import { ContextMain } from "../Context/ContextApi";
import { Navigate } from "react-router-dom";

const RoleBasedProfile = () => {
  const { user } = useContext(ContextMain);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/dashboard/admin-profile" replace />;
  } else if (user.role === "agent") {
    return <Navigate to="/dashboard/agent-profile" replace />;
  } else {
    return <Navigate to="/dashboard/my-profile" replace />;
  }
};

export default RoleBasedProfile;
