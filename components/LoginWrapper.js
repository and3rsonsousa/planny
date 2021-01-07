import React, { useContext } from "react";
import { AuthContext } from "../utility/AuthContext";
import Loader from "./Loader";

const LoginWrapper = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? (
    props.children
  ) : (
    <div className="p-8">
      <Loader />
    </div>
  );
};

export default LoginWrapper;
