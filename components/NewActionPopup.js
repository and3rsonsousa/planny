import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useApp } from "../utility/AppContext";
import Popup from "./Popup";

const NewActionPopup = (props) => {
  const emptyState = {
    title: "",
    description: "",
    date: dayjs().format("YYYY-MM-DD"),
    action: 1,
    client: props.clients[0].id,
    done: false,
  };
  const {
    posts,
    addNewPost,
    Actions,
    toUpdate,
    updatePost,
    useLoading,
  } = useApp();
  const [post, setPost] = useState(emptyState);
  const [loading, setLoading] = useLoading;
  useEffect(() => {
    if (toUpdate) {
      const postToUpdate = posts.filter((p) => p.id === toUpdate)[0];
      setPost(postToUpdate);
    } else {
      setPost(emptyState);
    }
  }, [toUpdate]);

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

    setLoading(true);
    if (toUpdate) {
      updatePost(post);
    } else {
      addNewPost(post);
    }

    setPost(emptyState);
    return true;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: name === "action" ? parseInt(value) : value });
  };

  return post ? (
    <Popup title="Nova Ação" Submit={doSubmit}>
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
  ) : (
    ""
  );
};

export default NewActionPopup;
