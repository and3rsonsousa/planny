import React, { useContext, useState } from "react";
import Head from "next/head";
import { AuthContext } from "../utility/AuthContext";
import Alert from "../components/Alert";

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

  const handleSubimt = (event) => {
    event.preventDefault();
    if (user.email !== "" && user.password !== "") {
      doLogin(user);
    }
    return false;
  };

  return (
    <div className="bg-gray-100 p-12 h-screen flex items-center">
      <Head>
        <title>Planny</title>
      </Head>

      <div className="mx-auto bg-white p-8 rounded-lg shadow-2xl">
        <h3 className="mb-0 text-2xl font-medium text-indigo-700">Planny</h3>
        <form onSubmit={handleSubimt}>
          <div className="prose mt-4 w-80">
            <label>
              <div>E-mail</div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
                className="border-2 p-2 mb-2 w-full rounded-lg"
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
                className="border-2 p-2 mb-2 w-full rounded-lg"
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
