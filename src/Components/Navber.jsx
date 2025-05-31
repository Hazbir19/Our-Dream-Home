import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Shield, LogOut, CircleUser } from "lucide-react";
import { ContextMain } from "../Context/ContextApi";

const Navber = () => {
  const { user, EmailsignOut } = useContext(ContextMain);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <>
      <nav className="bg-primary">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="text-xl font-bold">
              <img
                src="https://i.ibb.co/MySp5gTs/Logo-removebg-preview.png"
                alt="Logo"
                className="w-[5rem] h-[4rem] rounded-full"
              />
            </Link>
          </div>

          <ul
            className={`md:flex gap-6 items-center text-gray-800 text-lg font-medium ${
              menuOpen
                ? "block absolute top-[4.5rem] left-0 w-full  z-1 p-4 border-t"
                : "hidden"
            } md:static md:w-auto`}
          >
            <Link to="/" className="lg:text-xl text-lg block py-2">
              Home
            </Link>
            <Link
              to="/allproperty"
              className="lg:text-xl text-lg block py-2 text-gray"
            >
              All Propertise
            </Link>
            {user && (
              <>
                <Link to="/dashboard" className="lg:text-xl text-lg block py-2">
                  Dashboard
                </Link>
              </>
            )}
          </ul>

          <div className="relative">
            {user ? (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img
                  src={user?.photo || "https://i.ibb.co/4ZpHQbz/user.png"}
                  alt="User"
                  className="w-[3.5rem] h-[3.5rem] rounded-full border"
                />
              </div>
            ) : (
              <>
                <div className="flex justify-evenly items-center gap-5">
                  <CircleUser size={35} strokeWidth={1} />
                  <Link to="/login" className="text-lg font-medium">
                    Login
                  </Link>
                </div>
              </>
            )}

            {profileOpen && user && (
              <div className="absolute right-0 mt-2 bg-background shadow-lg border rounded-xl w-48 p-4 space-y-2 z-1">
                <div className="text-center">
                  <p className="font-semibold text-gray-700">
                    {user?.displayName}
                  </p>
                </div>
                <hr />
                <Link
                  to="/dashboard/profile"
                  className="flex items-center gap-2 text-gray-700 hover:bg-primary px-2 py-1 rounded"
                >
                  <User size={18} /> Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 text-gray-700 hover:bg-primary px-2 py-1 rounded"
                >
                  <Shield size={18} /> Privacy Settings
                </Link>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-gray-700 hover:bg-primary px-2 py-1 rounded"
                >
                  <LogOut size={28} strokeWidth={1} />
                  <button
                    onClick={EmailsignOut}
                    className="flex items-center gap-2"
                  >
                    sign Out
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navber;
