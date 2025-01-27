import React from "react";
import { Outlet } from "react-router-dom";
import Navber from "../Components/Navber";

const MainLayouts = () => {
  return (
    <>
      <div>
        <Navber></Navber>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
      <div>
        <div>footer</div>
      </div>
    </>
  );
};

export default MainLayouts;
