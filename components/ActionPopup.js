import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useApp } from "../utility/AppContext";
import Popup from "./Popup";

const ActionPopup = (props) => {
  const {
    posts,
    addNewPost,
    date,
    Actions,
    toUpdate,
    updatePost,
    useLoading,
  } = useApp();

  const emptyState = {
    title: "",
    description: "",
    date: date,
    action: 1,
    client: props.clients.length === 1 ? props.clients[0].id : false,
    done: false,
  };

  const [post, setPost] = useState(emptyState);
  const [loading, setLoading] = useLoading;

  useEffect(() => {
    if (toUpdate) {
      var postToUpdate = posts.filter((p) => p.id === toUpdate)[0];
      postToUpdate.client = postToUpdate.client.id;
      setPost(postToUpdate);
    } else {
      setPost(emptyState);
    }
  }, [toUpdate]);

  useEffect(() => {
    let postWithCurrentDate = { ...post };
    postWithCurrentDate.date = date;
    // console.log(date, postWithCurrentDate);
    setPost(postWithCurrentDate);
  }, [date]);

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
    <Popup title={toUpdate ? "Atualizar Ação" : "Nova Ação"} Submit={doSubmit}>
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

        {props.clients.length > 1 ? (
          <label>
            <h4>Cliente</h4>
            <select
              className="form-field"
              name="client"
              id="client"
              value={post.client}
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
                  className="border-gray-300"
                />

                <div className={`ml-2 uppercase text-xs tracking-wider`}>
                  {a.name}
                </div>
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

export default ActionPopup;
