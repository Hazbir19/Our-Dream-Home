import React from "react";
import { useContext } from "react";
import { ContextMain } from "../Context/ContextApi";

const AdminProfile = () => {
  const { user } = useContext(ContextMain);
  return (
    <>
      <div className="bg-gray-100 p-16">
        <h1 className="text-blue-900 text-2xl font-bold text-center">
          Admin Profile
        </h1>
        <div className="max-w-lg mx-auto bg-white shadow-xs border-r-2 border-l-2 border-r-gray-200 border-l-gray-200 rounded-md p-6 mt-12">
          <div className="flex flex-col items-center">
            {/* User Image */}
            {user.photo && (
              <img
                src={user.photo}
                alt="Admin Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
              />
            )}

            {/* User Name */}
            <h2 className="text-2xl font-bold mt-4">{user.name || "Admin"}</h2>

            {/* User Role */}
            {user.role === "admin" && (
              <span className="mt-2 text-xl bg-gradient-to-bl to-sky-300 from-pink-300 text-white border-4 border-double border-white px-4 py-1 rounded-full font-bold ">
                Admin
              </span>
            )}
          </div>
          <div className="mt-6 space-y-3 text-gray-700">
            <p>
              <strong className="text-blue-900 mr-4 font-bold">Email:</strong>
              {user.email}
            </p>
            <p>
              <strong className="text-blue-900 mr-4 font-bold">
                Account Type:
              </strong>
              {user.role === "admin" ? "Administrator" : "Regular User"}
            </p>
            <p>
              <strong className="text-blue-900 mr-4 font-bold">
                Member Since:
              </strong>
              2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
