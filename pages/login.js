import React, { useContext, useState } from "react";
import Head from "next/head";
import { AuthContext } from "../utility/AuthContext";
import Alert from "../components/Alert";
import Logo from "../components/Logo";

function initialState() {
  return { email: "", password: "" };
}

const Login = (props) => {
  const [user, setUser] = useState(initialState);
  const { doLogin, message } = useContext(AuthContext);

  const onChange = (event) => {
    const { value, name } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.email !== "" && user.password !== "") {
      doLogin(user);
    }
    return false;
  };

  return (
    <div className="bg-brand-700 h-screen flex justify-center items-center">
      <Head>
        <title>Planny</title>
      </Head>

      <div className="p-8 bg-white rounded-lg w-full max-w-md">
        <Logo />
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label>
              <div>E-mail</div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
                className="form-field"
                value={user.email}
                onChange={onChange}
              />
            </label>
            {message.email && <Alert message={message.email} />}
            <label>
              <div>Password</div>
              <input
                type="password"
                id="password"
                name="password"
                className="form-field"
                value={user.password}
                onChange={onChange}
              />
            </label>
            {message.password && <Alert message={message.password} />}
            <div className="flex justify-end mt-4">
              <button className="button button-primary">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
