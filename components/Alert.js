import React from "react";

const Alert = ({ message, type }) => (
  <div className="py-1 px-4 bg-red-100 border border-red-200 text-red-500 rounded">
    {message}
  </div>
);

export default Alert;
