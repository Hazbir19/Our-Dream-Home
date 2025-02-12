import React from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import "../App.css";

const Navber = () => {
  const NavItem = (
    <>
      <Link
        to={"/"}
        className="lg:text-lg text-xs flex md:text-md  items-center gap-2 text-white font-bold"
      >
        <IoHomeOutline className="text-md" />
        Home
      </Link>
      <Link
        to={"/allproperty"}
        className="lg:text-lg text-xs md:text-md flex items-center gap-2 text-white font-bold"
      >
        All Properties
      </Link>
      <Link
        to={"/dashboard"}
        className="lg:text-lg text-xs md:text-md  flex items-center gap-2 text-white font-bold"
      >
        <RxDashboard className="text-md" /> Dashboard
      </Link>
    </>
  );
  return (
    <>
      <div className="mt-[2rem] w-full flex items-center gap-5  justify-center absolute z-100 left-0 right-0 top-0 ">
        <div className="max-w-screen-xl mx-auto flex items-center justify-center w-full gap-[2rem]">
          {NavItem}
          <div>
            <div class="dropdown dropdown-end">
              <div
                tabindex="0"
                role="button"
                class="btn btn-ghost btn-circle avatar"
              >
                <div class="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabindex="0"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a class="justify-between">Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[url(https://i.ibb.co.com/rKYVxHpy/Back-ground.png)] bg-cover bg-center bg-no-repeat lg:min-h-[30rem] min-h-[12rem] md:min-h-[22rem] flex justify-center relative opacity-95"></div>
    </>
  );
};

export default Navber;
