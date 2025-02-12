import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

export const ContextMain = createContext();
const ContextApi = ({ children }) => {
  //User State
  const [user, SetUser] = useState(null);
  const [loadding, setloadding] = useState(true);
  // PassWord Validate
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regex.test(password)) {
      return "Password must be at least 6 characters long, include one uppercase letter, and one lowercase letter.";
    }
    return null;
  };
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("Current user", currentUser);
        SetUser({
          name: currentUser.displayName,
          photo: currentUser.photoURL,
          email: currentUser.email,
        });
        console.log("Current state", currentUser?.email);

        if (currentUser?.email) {
          const user = { email: currentUser.email };
          axios
            .post("https://sever-silde.vercel.app/jwt", user, {
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
            "https://sever-silde.vercel.app/logout",
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
    validatePassword,
    HandleGoogleSignIn,
    loadding,
  };
  return <ContextMain.Provider value={items}>{children}</ContextMain.Provider>;
};

export default ContextApi;
