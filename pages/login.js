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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.email !== "" && user.password !== "") {
      doLogin(user);
    }
    return false;
  };

  return (
    <div className="bg-white h-screen flex items-center border-brand-600 border-t-4">
      <Head>
        <title>Planny</title>
      </Head>

      <div className="w-full mx-auto p-8 rounded-xl">
        <h3 className="mb-0 text-2xl font-medium text-brand-600">Planny</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 sm:w-80">
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
