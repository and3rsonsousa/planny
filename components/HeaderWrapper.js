import Link from "next/link";
import React from "react";
import UserDisplay from "../components/UserDisplay";
import Logo from "./Logotype";

const HeaderWrapper = ({ children }) => {
  return (
    <div className="w-full border-t-4 border-brand-600 bg-white">
      <div className="border-b">
        <div className="container mx-auto">
          <header className="p-4 flex justify-between items-center">
            <div>
              <Link href="/">
                <a>
                  <Logo />
                </a>
              </Link>
            </div>

            <div className="flex gap-4">
              {children}
              <UserDisplay />
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default HeaderWrapper;
