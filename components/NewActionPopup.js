import dayjs from "dayjs";
import React, { useState } from "react";
import { useApp } from "../utility/AppContext";
import Popup from "./Popup";

const NewActionPopup = (props) => {
  const { addNewPost, Actions } = useApp();
  function initialState() {
    return {
      title: "",
      description: "",
      date: dayjs().format("YYYY-MM-DD"),
      action: 1,
      client: props.clients[0].id,
    };
  }
  const [post, setPost] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    doSubmit();
  };

  const doSubmit = () => {
    if (post.title === "") {
      alert("O campo 'Título' não pode ficar vazio.");
      return false;
    }

    if (post.date === "") {
      alert("O campo 'Data' não pode ficar vazio.");
      return false;
    }
    if (post.action === 0) {
      alert("Você precisa escolher uma das ações disponíveis.");
      return false;
    }

    console.log(post);

    addNewPost(post);
    setPost(initialState);
    return true;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: name === "action" ? parseInt(value) : value });
  };

  return (
    <Popup title="Nova Ação" addNew={doSubmit}>
      <form onSubmit={handleSubmit}>
        <label>
          <h4>Título</h4>
          <input
            type="text"
            name="title"
            id="title"
            className="form-field"
            value={post.title}
            onChange={handleChange}
          />
        </label>
        <label>
          <h4>Descrição</h4>
          <input
            type="text"
            name="description"
            id="description"
            className="form-field"
            value={post.description}
            onChange={handleChange}
          />
        </label>
        <label>
          <h4>Data</h4>
          <input
            type="date"
            name="date"
            id="date"
            className="form-field"
            value={post.date}
            onChange={handleChange}
          />
        </label>

        <label>
          <h4>Ação</h4>
          <div className="flex gap-2">
            {Actions.map((a, b) => (
              <label className="flex items-center mr-4" key={b}>
                <input
                  type="radio"
                  name="action"
                  value={b + 1}
                  checked={post.action == b + 1}
                  onChange={handleChange}
                />

                <div className="ml-2">{a.name}</div>
              </label>
            ))}
          </div>
        </label>
      </form>
    </Popup>
  );
};

export default NewActionPopup;
