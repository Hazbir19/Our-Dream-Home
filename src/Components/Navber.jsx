import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import "../App.css";
import { MdOutlineRealEstateAgent } from "react-icons/md";

const Navber = () => {
  const location = useLocation();
  const NavItem = (
    <>
      <div className="lg:flex md:flex items-center gap-8 justify-between hidden">
        <Link
          to={"/"}
          className="lg:text-lg text-xs flex md:text-md  items-center gap-2 lg:text-white md:text-white  font-bold"
        >
          <IoHomeOutline className="text-md" />
          Home
        </Link>
        <Link
          to={"/allproperty"}
          className="lg:text-lg text-xs md:text-md flex items-center gap-2 lg:text-white md:text-white font-bold"
        >
          <MdOutlineRealEstateAgent />
          All Properties
        </Link>
        <Link
          to={"/dashboard"}
          className="lg:text-lg text-xs md:text-md  flex items-center gap-2 lg:text-white md:text-white font-bold"
        >
          <RxDashboard className="text-md" /> Dashboard
        </Link>
      </div>
    </>
  );
  return (
    <>
      {location.pathname === "/" ? (
        <>
          <div className="mt-[2rem] lg:w-full flex items-center justify-center absolute z-100 left-0 right-0 top-0 ">
            <div className="max-w-screen-xl mx-auto w-full">
              <div className="items-center flex justify-between lg:justify-center md:justify-center lg:gap-[3rem] md:gap-[2rem] mx-[1rem]">
                {NavItem} {/* hamburger section */}
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost lg:hidden md:hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <div className="lg:flex md:flex items-center gap-5 justify-center">
                      <Link
                        to={"/"}
                        className="lg:text-lg text-xs flex md:text-md  items-center gap-2 py-1  lg:text-white font-bold"
                      >
                        <IoHomeOutline className="text-md" />
                        Home
                      </Link>
                      <Link
                        to={"/allproperty"}
                        className="lg:text-lg text-xs md:text-md flex items-center gap-2 py-1 lg:text-white font-bold"
                      >
                        <MdOutlineRealEstateAgent />
                        All Properties
                      </Link>
                      <Link
                        to={"/dashboard"}
                        className="lg:text-lg text-xs md:text-md  flex items-center gap-2 py-1 lg:text-white font-bold"
                      >
                        <RxDashboard className="text-md" /> Dashboard
                      </Link>
                    </div>
                  </ul>
                </div>
                {/* Profile user Photo */}
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
        </>
      ) : (
        <>
          <div
            className={`${
              location.pathname === "/"
                ? "lg:w-full flex items-center text-black justify-center absolute z-100 left-0 right-0 top-0"
                : " bg-gradient-to-bl to-red-400 from-yellow-300  p-12" //navbar color
            } `}
          >
            <div className="max-w-screen-xl mx-auto w-full">
              <div className="items-center flex justify-between lg:justify-center md:justify-center lg:gap-[3rem] md:gap-[2rem] mx-[1rem]">
                {NavItem} {/* hamburger section */}
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost lg:hidden md:hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <div className="lg:flex md:flex items-center gap-5 justify-center">
                      <Link
                        to={"/"}
                        className="lg:text-lg text-xs flex md:text-md  items-center gap-2 py-1  lg:text-black font-bold"
                      >
                        <IoHomeOutline className="text-md" />
                        Home
                      </Link>
                      <Link
                        to={"/allproperty"}
                        className="lg:text-lg text-xs md:text-md flex items-center gap-2 py-1 lg:text-black font-bold"
                      >
                        <MdOutlineRealEstateAgent />
                        All Properties
                      </Link>
                      <Link
                        to={"/dashboard"}
                        className="lg:text-lg text-xs md:text-md  flex items-center gap-2 py-1 lg:text-black font-bold"
                      >
                        <RxDashboard className="text-md" /> Dashboard
                      </Link>
                    </div>
                  </ul>
                </div>
                {/* Profile user Photo */}
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
                    class="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <Link
                      to={"/"}
                      className="lg:text-lg text-xs flex md:text-md  items-center gap-2  font-bold"
                    >
                      <IoHomeOutline className="text-md" />
                      Profile
                    </Link>
                    <Link
                      to={"/allproperty"}
                      className="lg:text-lg text-xs md:text-md flex items-center gap-2 font-bold"
                    >
                      <MdOutlineRealEstateAgent />
                      Settings
                    </Link>
                    <Link
                      to={"/dashboard"}
                      className="lg:text-lg text-xs md:text-md  flex items-center gap-2 font-bold"
                    >
                      <RxDashboard className="text-md" />
                      Logout
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {location.pathname === "/" && (
        <>
          <div
            className={`${
              location.pathname === "/"
                ? "relative bg-[url(https://i.ibb.co.com/rKYVxHpy/Back-ground.png)] bg-cover bg-center bg-no-repeat lg:min-h-[30rem] overflow-x-hidden min-h-[8rem] md:min-h-[22rem] flex justify-center opacity-95 "
                : ""
            }`}
          ></div>
        </>
      )}
    </>
  );
};

export default Navber;
