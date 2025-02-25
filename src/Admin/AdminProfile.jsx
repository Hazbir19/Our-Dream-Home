import React from "react";
import { useContext } from "react";
import { ContextMain } from "../Context/ContextApi";

const AdminProfile = () => {
  const { user } = useContext(ContextMain);
  return (
    <>
      <div>
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
          <div className="flex flex-col items-center">
            {/* User Image */}
            {user.photo && (
              <img
                src={user.photo}
                alt="Admin Profile"
                className="w-24 h-24 rounded-full border-4 border-gray-300"
              />
            )}

            {/* User Name */}
            <h2 className="text-2xl font-bold mt-4">{user.name || "Admin"}</h2>

            {/* User Role */}
            {user.role !== "user" && (
              <span className="mt-2 text-lg bg-gradient-to-bl to-sky-300 from-pink-300 text-white px-4 py-1 rounded-full">
                {user.role}
              </span>
            )}
          </div>
          <div className="mt-6 space-y-3 text-gray-700">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Account Type:</strong>
              {user.role === "admin" ? "Administrator" : "Regular User"}
            </p>
            <p>
              <strong>Member Since:</strong> 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
