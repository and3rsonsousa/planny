import React, { useEffect, useState } from "react";
import { useApp } from "../utility/AppContext";
import Popup from "./Popup";

const IdeaPopup = (props) => {
  const { ideas, addNewIdea, toUpdate, updateIdea, useLoading } = useApp();
  const emptyState = {
    title: "",
    client: props.clients.length === 1 ? props.clients[0] : {},
    clientID: props.clients.length === 1 ? props.clients[0].id : "",
  };
  const [idea, setIdea] = useState(emptyState);
  const [loading, setLoading] = useLoading;

  useEffect(() => {
    if (toUpdate) {
      let ideaToUpdate = ideas.filter((i) => i.id === toUpdate)[0];
      ideaToUpdate.clientID = ideaToUpdate.client.id;
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

    if (idea.clientID === "") {
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
      title={toUpdate ? "Atualizar Ideia" : "Nova Ideia"}
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
        {props.clients.length > 1 ? (
          <label>
            <h4>Cliente</h4>
            <select
              className="form-field"
              name="clientID"
              id="clientID"
              value={idea.clientID}
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
        ) : (
          ""
        )}
      </form>
    </Popup>
  );
};

export default IdeaPopup;
