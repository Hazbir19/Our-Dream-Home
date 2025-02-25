import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";
import UseSecureApi from "../Custom/UseSecureApi";

export const ContextMain = createContext();
const ContextApi = ({ children }) => {
  //User State
  const [user, SetUser] = useState(null);
  const SecureApi = UseSecureApi();
  const [loadding, setloadding] = useState(true);

  //login with Google start
  const HandleGoogleSignIn = () => {
    setloadding(true);
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };
  //login with Google Ends
  // Signin or Register by Email and password
  const handleEmailSignIn = (email, password) => {
    setloadding(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //Login User
  const HandleLogIn = (email, password) => {
    if (password) return signInWithEmailAndPassword(auth, email, password);
  };
  //Sign Out
  const EmailsignOut = () => {
    // setloadding(true);
    return signOut(auth);
  };

  //User Moninitoring in App

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Fetch the user role from the API
          const response = await SecureApi.get(`/users/${currentUser.email}`);
          const userData = response.data;
          console.log(userData);

          // Set the user with the role from the API
          SetUser({
            name: currentUser.displayName,
            photo: currentUser.photoURL,
            email: currentUser.email,
            role: userData.role, // Assign role from API
          });
        } catch (error) {
          console.error("Error fetching user role:", error);
        }

        console.log("Current state", currentUser?.email);

        if (currentUser?.email) {
          const user = { email: currentUser.email, role: currentUser.role };

          axios
            .post("http://localhost:5000/jwt", user, {
              withCredentials: true,
            })
            .then((res) => {
              console.log("login Token", res.data);
            });
        } else {
        }
        setloadding(false);
      } else {
        axios
          .post(
            "http://localhost:5000/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("Logout delete your token", res.data);
          });
        console.log("no user");
        SetUser(null);
        setloadding(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  //Data Pipeline
  const items = {
    user,
    handleEmailSignIn,
    EmailsignOut,
    HandleLogIn,
    HandleGoogleSignIn,
    loadding,
  };
  return <ContextMain.Provider value={items}>{children}</ContextMain.Provider>;
};

export default ContextApi;
