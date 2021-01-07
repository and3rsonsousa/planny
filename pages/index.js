import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { getClientsFromUser } from "../utility/graphql-data";
import { AuthContext } from "../utility/AuthContext";
import { useApp } from "../utility/AppContext";
import LoginWrapper from "../components/LoginWrapper";
import HeaderWrapper from "../components/HeaderWrapper";
import Calendar from "../components/Calendar";
import ProgressBar from "../components/ProgressBar";
import HeaderMenu from "../components/HeaderMenu";
import NewIdeaPopup from "../components/NewIdeaPopup";

import dayjs from "dayjs";

const Home = (props) => {
  const { user } = useContext(AuthContext);
  const [thisMonth, setThisMonth] = useState(dayjs());
  const { posts, ideas, setPosts, setIdeas, useVisible } = useApp();
  const [clients, setClients] = useState(null);
  const [visible, setVisible] = useVisible;
  let completedActions = 0;

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getClientsFromUser(user.email)
        .then((clients) => {
          setClients(clients);

          let allPosts = [];
          let allIdeas = [];

          clients.map((c) => {
            c.posts.map((p) => {
              allPosts.push(p);
            });
            c.ideas.map((i) => {
              allIdeas.push(i);
            });
          });
          setPosts(allPosts);
          setIdeas(allIdeas);
        })
        .catch((error) => console.log(error));
    }
  }, [thisMonth, user]);

  completedActions = posts.filter((p) => p.done).length;
  return (
    <LoginWrapper>
      <div>
        <Head>
          <title>{user.name} / Planny</title>
        </Head>
        <HeaderWrapper>
          <HeaderMenu />
        </HeaderWrapper>
        {clients ? (
          <div className="p-4 container mx-auto">
            <div className="grid grid-cols-5 gap-8">
              <SideBar clients={clients} />
              <div className="grid col-span-3">
                <div>
                  <div className="prose">
                    <h3>Dashboard</h3>
                  </div>
                  <div className="grid grid-cols-3 py-12 gap-8">
                    <div className="dashboard-card">
                      <div className="text-8xl">{clients.length}</div>
                      <div className="uppercase font-medium tracking-widest text-gray-400 text-xs">
                        Clientes
                      </div>
                    </div>
                    <div className="dashboard-card">
                      <div className="text-8xl">{posts.length}</div>
                      <div className="uppercase font-medium tracking-widest text-gray-400 text-xs">
                        AÇÕES
                      </div>
                      <div className="mt-4">
                        <ProgressBar completed={completedActions} />
                      </div>
                      <div className="text-xs mt-2 font-medium tracking-widest ">
                        <span className="font-bold">{completedActions}</span>{" "}
                        AÇÕES FINALIZADAS
                      </div>
                    </div>
                    <div className="dashboard-card">
                      <div className="text-8xl">{ideas.length}</div>
                      <div className="uppercase font-medium tracking-widest text-gray-400 text-xs">
                        IDEIAS
                      </div>
                    </div>
                  </div>
                </div>
                <Calendar
                  thisMonth={thisMonth}
                  nextMonth={() => setThisMonth(thisMonth.add(1, "M"))}
                  prevMonth={() => setThisMonth(thisMonth.subtract(1, "M"))}
                />
              </div>
              <div className="prose">
                <h3>Ideias</h3>
                <div className="mb-4">
                  <button
                    className="button w-full justify-center button-small button-primary flex items-center"
                    onClick={() => setVisible(true)}
                  >
                    <span>NOVA IDEIA</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className=" h-6 inline-block ml-2"
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
                <div className="divide-y">
                  {ideas.map((idea, i) => (
                    <div
                      className="py-2 prose text-sm flex items-center"
                      key={idea.id}
                    >
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: idea.client.bgColor }}
                      ></div>
                      <div className="ml-2">{idea.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <NewIdeaPopup clients={clients} />
          </div>
        ) : (
          ""
        )}
      </div>
    </LoginWrapper>
  );
};

const SideBar = ({ clients }) => (
  <div className="sidebar">
    <div className="prose">
      <h3>Gerenciar</h3>
    </div>
    <div className="divide-solid divide-y">
      {clients.map((i, j) => (
        <div key={j}>
          <Link href={`/plan/${i.instagram}`} key={i.instagram}>
            <a className="block py-2 text-gray-500">{i.name}</a>
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default Home;
