import React from "react";
const Loader = ({ text }) => (
  <div className="flex justify-center gap-4 items-center">
    <div className="prose">{text}</div>
    <div className="loader loader-instagram"></div>
  </div>
);

export default Loader;
