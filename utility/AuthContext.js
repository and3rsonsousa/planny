import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { logUser, getTheUser } from "./graphql-data";

const AuthContext = createContext({
  user: {},
  doLogin: () => {},
  doLogout: () => {},
  isLoggedIn: () => false,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState({ email: "", password: "" });
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      if (window) {
        const email = localStorage.getItem("plannyUser");
        if (email) {
          getTheUser(email).then((data) => {
            const { theUser } = data;
            setUser(theUser);
            setLoggedIn(true);
          });
        } else {
          setLoggedIn(false);
          router.replace("/login");
        }
      }
    } catch (error) {
      return false;
    }
    return false;
  }, [isLoggedIn]);

  async function doLogin({ email, password }) {
    const { theUser } = await logUser(email);

    if (!theUser) {
      setMessage({ email: "Email não encontrado." });
      return false;
    }

    if (theUser.password !== password) {
      setMessage({ password: "Senha não corresponde ao e-mail digitado." });
      return false;
    }

    // console.log("theUser", theUser);

    setUser(theUser);
    setLoggedIn(true);
    localStorage.setItem("plannyUser", theUser.email);
    router.replace("/");
    return true;
  }

  function doLogout() {
    localStorage.removeItem("plannyUser");
    setUser({});
    setLoggedIn(false);
    router.replace("/");
    return false;
  }

  return (
    <AuthContext.Provider
      value={{ user, message, doLogin, doLogout, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
