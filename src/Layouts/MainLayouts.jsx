import React from "react";
import { Outlet } from "react-router-dom";
import Navber from "../Components/Navber";
import Footer from "../Pages/Footer";

const MainLayouts = () => {
  return (
    <>
      <div className="max-w-screen mx-auto overflow-x-hidden">
        <div>
          <Navber></Navber>
        </div>
        <div className="">
          <Outlet></Outlet>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default MainLayouts;
