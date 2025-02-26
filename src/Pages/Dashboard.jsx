import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaList } from "react-icons/fa";
import { MdOutlineRealEstateAgent, MdRateReview } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { ContextMain } from "../Context/ContextApi";

const Dashboard = () => {
  const { user } = useContext(ContextMain);
  const isAdmin = user.role === "admin";
  const isAgent = user.role === "agent";

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="min-w-44 min-h-screen bg-gray-800 text-white">
        <div className="p-5">
          {/* Admin Links */}
          {isAdmin && (
            <>
              <Link
                to="/dashboard/admin-profile"
                className="flex justify-center gap-2 items-center p-4 lg:text-lg md:text-base text-sm hover:bg-gray-700"
              >
                <CgProfile className="lg:text-lg md:text-base text-sm" />
                Admin Profile
              </Link>
              <Link
                to="/dashboard/manageProperty"
                className="flex justify-center gap-2 items-center p-4 lg:text-lg md:text-base text-sm hover:bg-gray-700"
              >
                <FaList className="lg:text-lg md:text-base text-sm" />
                Manage Property
              </Link>
              <Link
                to="/dashboard/manageUser"
                className="flex justify-center gap-2 items-center p-4 lg:text-lg md:text-base text-sm hover:bg-gray-700"
              >
                <BsCashCoin className="mr-2" />
                Manage Users
              </Link>
              <Link
                to="/dashboard/myReview"
                className="flex justify-center gap-2 items-center p-4 lg:text-lg md:text-base text-sm hover:bg-gray-700"
              >
                <MdRateReview className="lg:text-lg md:text-base text-sm" />
                Manage Review
              </Link>
            </>
          )}

          {/* Agent Links */}
          {isAgent && !isAdmin && (
            <>
              <Link
                to="/dashboard"
                className="flex justify-center gap-2 items-center p-4 lg:text-lg md:text-base text-sm hover:bg-gray-700"
              >
                <CgProfile />
                Agent Profile
              </Link>
              <Link
                to="/dashboard/addProperty"
                className="flex justify-center gap-2 items-center p-4 lg:text-lg md:text-base text-sm hover:bg-gray-700"
              >
                <FaList />
                Add property
              </Link>
              <Link
                to="/dashboard/myAddPropertise"
                className="flex justify-center gap-2 items-center p-4 lg:text-lg md:text-base text-sm hover:bg-gray-700"
              >
                <BsCashCoin className="mr-2" />
                Add Manage Property
              </Link>
              <Link
                to="/dashboard/mySoldProperty"
                className="flex justify-center gap-2 items-center p-4 lg:text-lg md:text-base text-sm hover:bg-gray-700"
              >
                <MdRateReview />
                My Sold Property
              </Link>
              <Link
                to="/dashboard/reqested-property"
                className="flex justify-center gap-2 items-center p-4 lg:text-lg md:text-base text-sm hover:bg-gray-700"
              >
                <MdRateReview />
                Requested property
              </Link>
            </>
          )}

          {/* Regular User Links */}
          {!isAdmin && !isAgent && (
            <>
              <Link
                to="/dashboard/my-profile"
                className="flex justify-center gap-2 items-center p-4 lg:text-lg md:text-base text-sm hover:bg-gray-700"
              >
                <CgProfile />
                My Profile
              </Link>
              <Link
                to="/dashboard/wishList"
                className="flex justify-center gap-2 items-center p-4 lg:text-lg md:text-base text-sm hover:bg-gray-700"
              >
                <FaList />
                Wishlist
              </Link>
              <Link
                to="/dashboard/propertyBrougth"
                className="flex justify-center gap-2 items-center p-4 lg:text-lg md:text-base text-sm hover:bg-gray-700"
              >
                <BsCashCoin className="mr-2" />
                Property Bought
              </Link>
              <Link
                to="/dashboard/myReview"
                className="flex justify-center gap-2 items-center p-4 lg:text-lg md:text-base text-sm hover:bg-gray-700"
              >
                <MdRateReview />
                My Review
              </Link>
            </>
          )}

          {/* Divider */}
          <div className="border-t-4 border-dashed mt-4 text-center text-xl py-2">
            OR
          </div>

          {/* Navigation Links */}
          <div className="lg:flex md:flex items-center gap-5 justify-center">
            <Link
              to="/"
              className="lg:text-lg text-xs md:text-md flex items-center gap-2 text-white"
            >
              <IoHomeOutline className="text-md" />
              Home
            </Link>
            <Link
              to="/allproperty"
              className="lg:text-lg text-xs md:text-md flex items-center gap-2 text-white"
            >
              <MdOutlineRealEstateAgent />
              All Properties
            </Link>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
