import React, { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaList } from "react-icons/fa";
import { MdOutlineRealEstateAgent, MdRateReview } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { ContextMain } from "../Context/ContextApi";
import { IoHomeOutline } from "react-icons/io5";

const Dashboard = () => {
  const { user } = useContext(ContextMain);
  return (
    <>
      <div className="flex">
        <div className="min-w-44 min-h-screen bg-gray-800 text-white">
          <div className="p-5">
            {user && (
              <>
                <Link
                  to={"/dashboard/userProfile"}
                  className="flex justify-center gap-2 items-center p-4 text-lg hover:bg-gray-700 "
                >
                  <CgProfile></CgProfile>
                  MyProfile
                </Link>
                <Link
                  to={"/dashboard/wishList"}
                  className="flex justify-center gap-2 items-center p-4 text-lg hover:bg-gray-700 "
                >
                  <FaList></FaList>
                  Wishlist
                </Link>
                <Link
                  to={"/dashboard/propertyBrougth"}
                  className="flex justify-center gap-2 items-center p-4 text-lg hover:bg-gray-700 "
                >
                  <BsCashCoin className="mr-2"></BsCashCoin>
                  Property Brougth
                </Link>
                <Link
                  to={"/dashboard/myReview"}
                  className="flex justify-center gap-2 items-center p-4 text-lg hover:bg-gray-700 "
                >
                  <MdRateReview></MdRateReview>
                  My Review
                </Link>
              </>
            )}
            <div className="divider border-dashed border-t-4">
              <div className="mt-4 text-xl">OR</div>
            </div>
            <div>
              <div className="lg:flex md:flex items-center gap-5 justify-center">
                <Link
                  to={"/"}
                  className="lg:text-lg text-xs flex md:text-md  items-center gap-2 py-1  lg:text-white "
                >
                  <IoHomeOutline className="text-md" />
                  Home
                </Link>
                <Link
                  to={"/allproperty"}
                  className="lg:text-lg text-xs md:text-md flex items-center gap-2 lg:text-white md:text-white "
                >
                  <MdOutlineRealEstateAgent />
                  All Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
