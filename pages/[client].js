import React, { useEffect, useState } from "react";
import Head from "next/head";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useApp } from "../utility/AppContext";
import { getClient } from "../utility/GraphQLData";
import LoginWrapper from "../components/LoginWrapper";
import Calendar from "../components/Calendar";
import Flyover from "../components/Flyover";
import Loader from "../components/Loader";
import Popup from "../components/Popup";
import ActionPopup from "../components/ActionPopup";
import ClientAvatar from "../components/ClientAvatar";
import Idea from "../components/Idea";
import IdeaPopup from "../components/IdeaPopup";
import LayoutWrapper from "../components/LayoutWrapper";

dayjs.locale("pt-br");

export async function getServerSideProps({ params }) {
  const client = await getClient(params.client);
  return {
    props: {
      client,
    },
  };
}

const Client = (props) => {
  //
  const App = useApp();
  const [thisMonth, setThisMonth] = useState(dayjs());
  const [expand, setExpand] = useState(false);
  const [visible, setVisible] = App.useVisible;
  const [loading] = App.useLoading;
  const [popup, setPopup] = App.usePopup;
  const { setPosts, ideas, setIdeas } = App;
  const client = props.client;

  useEffect(() => {
    setPosts(client.posts);
    setIdeas(client.ideas);
  }, []);

  return (
    <LoginWrapper>
      <LayoutWrapper>
        <Head>
          <title>{client.name} / Planny</title>
        </Head>
        <div className="container mx-auto">
          <div className="md:grid grid-cols-2 lg:grid-cols-3">
            {!expand ? (
              <section className="p-4 col-span-1 prose relative">
                {/* {loading && (
                <div className="flex justify-end absolute top-0 right-0">
                  <Loader />
                </div>
              )} */}

                <div className="prose mb-4">
                  <h3>Instagram Grid</h3>
                </div>

                <HeaderInstagram Cliente={client} />
                <InstagramGrid />
              </section>
            ) : null}
            <section
              className={`p-4 col-span-1 lg:col-span-2 ${
                expand ? "col-span-full lg:col-span-full" : ""
              }`}
            >
              <div className="flex justify-between mb-8">
                <div className="flex items-center">
                  <div className="prose">
                    <h3>Calendário</h3>
                  </div>
                  <div className="ml-2">
                    {expand ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-brand-600 hover:text-brand-800 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={() => {
                          setExpand(false);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-300 hover:text-gray-400 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={() => {
                          setExpand(true);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    className="button button-small button-primary"
                    onClick={() => {
                      setPopup("action");
                      setVisible(true);
                    }}
                  >
                    <span>NOVA AÇÃO</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <Calendar
                thisMonth={thisMonth}
                legenda={true}
                nextMonth={() => setThisMonth(thisMonth.add(1, "M"))}
                prevMonth={() => setThisMonth(thisMonth.subtract(1, "M"))}
              />
              <div className="flex justify-between my-8">
                <div className="prose">
                  <h3>Ideias</h3>
                </div>
                <div>
                  <button
                    className="button button-small button-primary"
                    onClick={() => {
                      setPopup("ideia");
                      setVisible(true);
                    }}
                  >
                    <span>NOVA IDEIA</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-2">
                {/* {client.ideas.map((idea, i) => (
                  <Idea idea={idea} truncate={true} key={i} />
                ))} */}

                {ideas.map((idea, i) => (
                  <Idea idea={idea} truncate={true} key={i} />
                ))}
              </div>
            </section>
          </div>
          {popup === "action" ? (
            <ActionPopup clients={[client]} />
          ) : (
            <IdeaPopup clients={[client]} />
          )}
        </div>
      </LayoutWrapper>
    </LoginWrapper>
  );
};

export default Client;

const NovaAcao = ({ Cliente }) => {
  const App = useApp();
  const [visible, setVisible] = App.useVisible;
  const [loading, setLoading] = App.useLoading;
  const { posts, addPost, Actions } = App;

  const addNewPost = () => {
    setLoading(true);
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const action =
      document.querySelector("input[name=action]:checked").value * 1;
    const client = Cliente.id;
    const post = { title, description, action, date, client };

    addPost(post);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = dayjs().format("YYYY-MM-DD");
    document.querySelectorAll("input[name=action]")[0].checked = true;

    if (!document.getElementById("keep").checked) {
      setVisible(false);
    } else {
      document.getElementById("title").focus();
    }
  };

  return (
    <Popup title="Nova Ação">
      <div className="font-medium mb-2 mt-4">Título</div>
      <input type="text" id="title" className="border-2 p-2 mb-2 w-full" />
      <div className="font-medium mb-2 mt-4">Descrição</div>
      <input
        type="text"
        id="description"
        className="border-2 p-2 mb-2 w-full"
      />
      <div className="font-medium mb-2 mt-4">Data</div>
      <input
        type="date"
        id="date"
        className="border-2 p-2 mb-2 w-full"
        defaultValue={dayjs().format("YYYY-MM-DD")}
      />
      <div className="font-medium mb-2 mt-4">Ação</div>
      <div className="flex">
        {Actions.map((a, b) => (
          <label className="flex items-center mr-4" key={b}>
            {b === 0 ? (
              <input
                type="radio"
                name="action"
                value={b + 1}
                defaultChecked="1"
              />
            ) : (
              <input type="radio" name="action" value={b + 1} />
            )}
            <div className="ml-2">{a.name}</div>
          </label>
        ))}
      </div>
    </Popup>
  );
};

const HeaderInstagram = ({ Cliente }) => {
  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex items-center ">
        <ClientAvatar client={Cliente} size="medium" />
        <div className="ml-4">
          <div className="text-xl font-medium">{Cliente.name}</div>
          <div className="text-sm -mt-1 text-gray-400">{Cliente.instagram}</div>
        </div>
      </div>
    </header>
  );
};

const InstagramGrid = () => {
  const App = useApp();
  const { posts } = App;
  const postsToDisplay = posts.filter((i) => i.action == 1);
  return (
    <div className="grid grid-cols-3 shadow-sm bg-white rounded-lg">
      {postsToDisplay.map((i, j) => (
        <Grid
          key={j}
          post={i}
          classNames={
            ((j + 1) % 3 !== 0 ? " border-r" : "") +
            (j < postsToDisplay.length - (postsToDisplay.length % 3)
              ? " border-b"
              : "")
          }
        />
      ))}
    </div>
  );
};

const Grid = ({ post, classNames }) => {
  const { useLoading, updatePost, deletePost } = useApp();
  const [loading, setLoading] = useLoading;
  const { id, title, description, date, done } = post;

  const triggerDone = () => {
    setLoading(true);
    const updatedPost = {
      ...post,
      done: !post.done,
      clientID: post.client.id,
    };

    updatePost(updatedPost);
  };

  return (
    <div className={`instagram-grid flyover-parent ${classNames}`}>
      <div className="absolute w-full h-full p-4 overflow-hidden text-center">
        <h6 className="text-xx tracking-widest text-gray-400 my-1">
          {dayjs(date).format("D/M/YYYY")}
        </h6>
        <h6 className="font-semibold leading-4 mb-2 ">{title}</h6>
        <div className="text-sm leading-tight  text-gray-400 line-clamp-4">
          {description}
        </div>
        <div className="absolute bottom-0 right-0 p-1 cursor-pointer">
          {done ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 text-green-400"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            ""
          )}
        </div>
      </div>
      <Flyover
        item={post}
        popupType="action"
        triggerDelete={deletePost}
        triggerUpdate={updatePost}
        triggerDone={triggerDone}
      />
    </div>
  );
};
