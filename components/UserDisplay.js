import React, { useContext } from "react";
import { AuthContext } from "../utility/AuthContext";

export default function UserDisplay() {
  const { user, doLogout } = useContext(AuthContext);
  return user ? (
    <div className="text-right">
      <h4 className="font-semibold text-gray-700">
        {user.name} (
        <a
          href="#"
          onClick={doLogout}
          className="text-xs tracking-widest font-medium text-brand-600"
        >
          SAIR
        </a>
        )
      </h4>
      <div className="text-xs text-gray-400">{user.email}</div>
    </div>
  ) : (
    "Não há dados do usuário"
  );
}
