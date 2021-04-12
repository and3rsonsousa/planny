import Link from "next/link";
import React from "react";
import UserDisplay from "../components/UserDisplay";

const HeaderWrapper = ({ children }) => {
  return (
    <div className="w-full border-t-4 border-brand-600">
      <div className="container mx-auto">
        <header className="p-4 flex justify-between">
          <div>
            <h3 className="text-2xl font-bold tracking-tighter">
              <Link href="/">
                <a>
                  <span className="text-brand-600">PLAN</span>
                  <span className="text-pink-500">NY</span>
                </a>
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
