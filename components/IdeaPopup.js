import React, { useEffect, useState } from "react";
import { useApp } from "../utility/AppContext";
import Popup from "./Popup";

const IdeaPopup = (props) => {
  const emptyState = {
    title: "",
    client: "",
  };
  const { ideas, addNewIdea, toUpdate, updateIdea, useLoading } = useApp();
  const [idea, setIdea] = useState(emptyState);
  const [loading, setLoading] = useLoading;

  useEffect(() => {
    if (toUpdate) {
      let ideaToUpdate = ideas.filter((i) => i.id === toUpdate)[0];
      ideaToUpdate.client = ideaToUpdate.client.id;
      setIdea(ideaToUpdate);
    } else {
      setIdea(emptyState);
    }
  }, [toUpdate]);

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

    setLoading(true);
    if (toUpdate) {
      updateIdea(idea);
    } else {
      addNewIdea(idea);
    }
    setIdea(emptyState);
    return true;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIdea({ ...idea, [name]: value });
  };

  return (
    <Popup
      title={idea.title ? "Atualizar Ideia" : "Nova Ideia"}
      Submit={doSubmit}
    >
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
            id="client"
            value={idea.client}
            onChange={handleChange}
          >
            {!toUpdate ? <option value=""></option> : ""}
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

export default IdeaPopup;
