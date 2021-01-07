import React, { useContext } from "react";
import { AuthContext } from "../utility/AuthContext";

export default function UserDisplay() {
  const { user, doLogout } = useContext(AuthContext);
  return user ? (
    <div className="text-right">
      <h4 className="font-medium text-gray-700">{user.name}</h4>
      <div className="text-xs text-gray-400">
        {user.email} (
        <a
          href="#"
          onClick={doLogout}
          className="text-xs tracking-widest font-medium text-gray-500"
        >
          SAIR
        </a>
        )
      </div>
    </div>
  ) : (
    "Não há dados do usuário"
  );
}
