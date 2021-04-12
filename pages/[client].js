import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useApp } from "../utility/AppContext";
import { getClient } from "../utility/GraphQLData";
import LoginWrapper from "../components/LoginWrapper";
import Calendar from "../components/Calendar";
import Flyover from "../components/Flyover";
import Loader from "../components/Loader";
import HeaderWrapper from "../components/HeaderWrapper";
import Popup from "../components/Popup";
import HeaderMenu from "../components/HeaderMenu";
import ActionPopup from "../components/ActionPopup";
import ClientAvatar from "../components/ClientAvatar";
import Idea from "../components/Idea";

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
  const [visible, setVisible] = App.useVisible;
  const [loading] = App.useLoading;
  const [popup, setPopup] = App.usePopup;
  const { setPosts } = App;
  const client = props.client;
  useEffect(() => {
    setPosts(client.posts);
  }, []);

  return (
    <LoginWrapper>
      <HeaderWrapper>
        <Head>
          <title>Programação de Posts</title>
        </Head>

        <HeaderMenu />
      </HeaderWrapper>
      <div className="container mx-auto">
        <div className="md:grid grid-cols-2 lg:grid-cols-3">
          <section className="p-4 col-span-1 prose relative">
            {loading && (
              <div className="flex justify-end absolute top-0 right-0">
                <Loader />
              </div>
            )}
            <div className="prose mb-4">
              <h3>Instagram Grid</h3>
            </div>
            <HeaderInstagram Cliente={client} />
            <InstagramGrid />
          </section>
          <section className="p-4 col-span-1 lg:col-span-2">
            <div className="flex justify-between mb-8">
              <div className="prose">
                <h3>Calendário</h3>
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
              showActions={true}
              legenda={true}
              nextMonth={() => setThisMonth(thisMonth.add(1, "M"))}
              prevMonth={() => setThisMonth(thisMonth.subtract(1, "M"))}
            />
            <div className="flex justify-between mb-8">
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
              {client.ideas.map((idea, i) => (
                <Idea idea={idea} truncate={true} key={i} />
              ))}
            </div>
          </section>
        </div>
        <ActionPopup clients={[client]} />
      </div>
    </LoginWrapper>
  );
};

export default Client;

// const Header = () => {
//   const App = useApp();
//   const [visible, setVisible] = App.useVisible;
//   return (
//     <HeaderWrapper>
//       <Head>
//         <title>Programação de Posts</title>
//       </Head>

//       <HeaderMenu></HeaderMenu>
//     </HeaderWrapper>
//   );
// };

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
  return (
    <div className="grid grid-cols-3 gap-1">
      {posts
        .filter((i) => i.action == 1)
        .map((i, j) => (
          <Grid key={j} {...i} />
        ))}
    </div>
  );
};

const Grid = (post) => {
  const { useLoading, updatePost, deletePost } = useApp();
  const [loading, setLoading] = useLoading;
  const { id, title, description, date, done } = post;

  const doneAction = () => {
    setLoading(true);
    const updatedPost = { ...post, done: !post.done };
    updatePost(updatedPost);
  };

  return (
    <div className="instagram-grid border flyover-parent">
      <div className="absolute w-full h-full p-2 overflow-hidden text-center">
        <h6 className="text-xx tracking-widest text-gray-400 my-2">
          {dayjs(date).format("D/M/YYYY")}
        </h6>
        <h6 className="font-semibold text-sm leading-4 mb-1 ">{title}</h6>
        <div className="text-xs text-gray-400 ">{description}</div>
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
      <Flyover item={post} deleteAction={deletePost} doneAction={doneAction} />
    </div>
  );
};
