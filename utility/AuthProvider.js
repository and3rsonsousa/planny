import React, { useContext, createContext, useState } from "react";
import ls from "local-storage";

const AuthContext = createContext();
const Users = [
  {
    name: "Anderson Sousa",
    permission: 10,
    mail: "and3rsonsousa@outlook.com",
  },
];

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    logged: false,
    mail: null,
    name: null,
    permission: 0,
  });

  const [msg, setMsg] = useState("");

  const login = (mail) => {
    const user = Users.filter((u) => u.mail === mail);
    if (user.length) {
      setUser({
        ...user[0],
        logged: true,
      });
      ls.set("localUser", mail);
      setMsg("Login realizado com sucesso!");
    } else {
      setMsg(
        "Seu e-mail não foi encontrado na base de dados. Verifique se está digitado corretamente."
      );
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, msg }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

const doLogin = (mail) => {
  const { user, login } = useAuth();
  login(mail);
};

export { AuthProvider, useAuth, doLogin };
