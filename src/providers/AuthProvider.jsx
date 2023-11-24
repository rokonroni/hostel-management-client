import { createContext, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { auth } from "../firebase/firebase.config";
import axios from "axios";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext(null);
const GoogleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // google login
  const googleLogin = () => {
    setLoading(true); 
    return signInWithPopup(auth, GoogleProvider);
  };
  // github login
  const githubLogin = () => {
    setLoading (true);
    return signInWithPopup (auth, githubProvider);
  }
  // Sign up with email and password
  const signUp = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in with email and password
  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Sign out
  const logOut = () => {
    setLoading(true)
    return signOut(auth);
  };

  // Setup observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {

      // const userEmail = currentUser?.email || user?.email;
      // const loggedUser = {email: userEmail}
      setUser(currentUser);
      console.log(currentUser);
      setLoading(false);
      // if (currentUser) {
      //   axios.post("https://job-finder-server-tau.vercel.app/jwt",loggedUser,{withCredentials:true})
      //   .then(res => {
      //     console.log(res.data);
      //   })
      // }
      // else{
      //   axios.post("https://job-finder-server-tau.vercel.app/logout",loggedUser,{withCredentials:true})
      //   .then(res => {
      //     console.log(res.data);
      //   })
      // }
    });
    return () => {
      unSubscribe();
    };
  }, [user?.email]);

  // value of AuthContext
  const AuthInfo = {
    user,
    loading,
    googleLogin,
    githubLogin,
    signUp,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
