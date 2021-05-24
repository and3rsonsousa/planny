import React, { useState } from "react";
import { useApp } from "../utility/AppContext";
import dayjs from "dayjs";

const Popup = (props) => {
  const { useVisible, setToUpdate, toUpdate, setDate } = useApp();
  const [visible, setVisible] = useVisible;
  const [keep, setKeep] = useState(false);

  const handleClose = () => {
    setVisible(false);
    setDate(dayjs().format("YYYY-MM-DD"));
    if (toUpdate) {
      setToUpdate(null);
    }
  };

  return visible ? (
    <div className="popup">
      <div className="popup-content">
        <div className="text-xl font-semibold flex justify-between">
          <div>{props.title || "Popup"}</div>
          <div
            className="text-xs text-gray-400 tracking-widest cursor-pointer"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {props.children}
        <hr />
        <div className="flex gap-8 items-center justify-between w-full">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                id="keep"
                value={keep}
                checked={keep}
                onChange={(e) => {
                  setKeep(() => !keep);
                }}
                className="border-gray-300 rounded-md w-5 h-5 text-brand-500 focus:ring-brand-300"
              />
              <div className="text-xx tracking-wider uppercase text-gray-400 ml-2">
                Continuar inserindo
              </div>
            </label>
          </div>
          <div className="flex">
            <button className="button button-muted" onClick={handleClose}>
              CANCELAR
            </button>
            <button
              className="ml-4 button button-primary"
              onClick={() => {
                props.Submit();
                setDate(dayjs().format("YYYY-MM-DD"));
                if (toUpdate) {
                  setToUpdate(null);
                }

                if (!keep) {
                  setVisible(false);
                } else {
                  if (document.getElementById("title")) {
                    document.getElementById("title").focus();
                  }
                  if (document.getElementById("name")) {
                    document.getElementById("name").focus();
                  }
                }
              }}
            >
              {toUpdate ? "ATUALIZAR" : "INSERIR"}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
