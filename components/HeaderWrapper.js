import Link from "next/link";
import React from "react";
import UserDisplay from "../components/UserDisplay";

const HeaderWrapper = ({ children }) => {
  return (
    <div className="bg-brand-600">
      <div className="container mx-auto">
        <header className="p-4 flex justify-between">
          <div>
            <h3 className="text-white text-2xl font-medium">
              <Link href="/">
                <a>Planny</a>
              </Link>
            </h3>
          </div>

          <div className="flex gap-4">
            {children}
            <UserDisplay />
          </div>
        </header>
      </div>
    </div>
  );
};

export default HeaderWrapper;
