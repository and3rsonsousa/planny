import React, { useState } from "react";
import { useApp } from "../utility/AppContext";
import Popup from "./Popup";

const NewIdeaPopup = (props) => {
  const { addNewIdea } = useApp();
  function initialState() {
    return {
      title: "",
      client: "",
    };
  }
  const [idea, setIdea] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    doSubmit();
  };

  const doSubmit = () => {
    if (idea.title === "") {
      alert("O campo 'Título' não pode ficar vazio.");
      return false;
    }

    if (idea.client === "") {
      alert("O campo 'Cliente' não pode ficar vazio.");
      return false;
    }

    addNewIdea(idea);
    setIdea(initialState);
    return true;
    //insere
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIdea({ ...idea, [name]: value });
  };

  return (
    <Popup title="Nova Ideia" addNew={doSubmit}>
      <form onSubmit={handleSubmit}>
        <label>
          <h4>Título</h4>
          <input
            type="text"
            name="title"
            id="title"
            className="form-field"
            value={idea.title}
            onChange={handleChange}
          />
        </label>
        <label>
          <h4>Cliente</h4>
          <select
            className="form-field"
            name="client"
            value={idea.client}
            onChange={handleChange}
          >
            <option value=""></option>
            {props.clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </form>
    </Popup>
  );
};

export default NewIdeaPopup;
