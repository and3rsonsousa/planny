import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import { getClientsFromUser } from "../utility/GraphQLData";
import { AuthContext } from "../utility/AuthContext";
import { useApp } from "../utility/AppContext";
import LayoutWrapper from "../components/LayoutWrapper";
import LoginWrapper from "../components/LoginWrapper";
import Calendar from "../components/Calendar";
import ProgressBar from "../components/ProgressBar";
import Idea from "../components/Idea";
import ClientAvatar from "../components/ClientAvatar";
import IdeaPopup from "../components/IdeaPopup";
import ActionPopup from "../components/ActionPopup";

import dayjs from "dayjs";

const Home = () => {
  const { user } = useContext(AuthContext);

  const [thisMonth, setThisMonth] = useState(dayjs());
  const { posts, ideas, setPosts, setIdeas, useVisible, usePopup } = useApp();
  const [clients, setClients] = useState(null);
  const [visible, setVisible] = useVisible;
  const [popup, setPopup] = usePopup;
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

  if (clients && clients.length === 1) {
    Router.push("/" + clients[0].instagram);
    return "";
  } else {
    return (
      <LoginWrapper>
        <LayoutWrapper>
          <div>
            <Head>
              <title>{user.name} / Planny</title>
            </Head>

            {clients ? (
              <div className="pb-8 container mx-auto">
                <div className="lg:flex justify-between items-center">
                  <div>
                    <ClientsBar clients={clients} />
                  </div>
                  <div className="px-4 pb-8 lg:pb-0 text-center">
                    <div className="button-group">
                      <button
                        className="button"
                        onClick={() => {
                          setPopup("idea");
                          setVisible(true);
                        }}
                      >
                        <span>NOVA IDEIA</span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 inline-block ml-1 -mt-1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                      <button
                        className="button button-primary"
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
                            className="h-5 inline-block ml-1 -mt-1"
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
                </div>
                <div className="grid lg:grid-cols-5 gap-8 px-4 ">
                  {/* Calendário */}
                  <div className="w-full lg:col-span-4">
                    <div className="mb-8">
                      <div className="prose">
                        <h3>Dashboard</h3>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 py-4 gap-4 sm:gap-8">
                        <div className="dashboard-card">
                          <div className="dashboard-card-title">
                            {clients.length}
                          </div>
                          <div className="dashboard-card-info">Clientes</div>
                        </div>

                        <div className="dashboard-card">
                          <div className="dashboard-card-title">
                            {ideas.length}
                          </div>
                          <div className="dashboard-card-info">IDEIAS</div>
                        </div>

                        <div className="dashboard-card col-span-2 sm:col-span-1">
                          <div className="dashboard-card-title">
                            {posts.length}
                          </div>
                          <div className="dashboard-card-info">AÇÕES</div>
                          <div className="w-full mt-4">
                            <ProgressBar
                              completed={completedActions}
                              actions={posts.length}
                            />
                          </div>
                          <div className="dashboard-card-info mt-2">
                            <span className="font-bold">
                              {completedActions}
                            </span>{" "}
                            AÇÕES FINALIZADAS
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

                  {/* ideias */}
                  <div>
                    <div className="prose mb-4">
                      <h3>Ideias</h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                      {ideas.slice(0, 12).map((idea, i) => (
                        <Idea idea={idea} truncate={true} key={i} />
                      ))}
                    </div>
                    <div className="py-4 text-right">
                      <Link href="/ideias">
                        <a className="button button-muted">Todas as ideias</a>
                      </Link>
                    </div>
                  </div>
                </div>
                {popup === "action" ? (
                  <ActionPopup clients={clients} />
                ) : (
                  <IdeaPopup clients={clients} />
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </LayoutWrapper>
      </LoginWrapper>
    );
  }
};

const ClientsBar = ({ clients }) => (
  <div className="ClientsBar py-8 w-full overflow-x-auto ">
    <div className="flex px-4 w-full sm:justify-center lg:justify-start">
      {clients.map((client, j) => (
        <div
          key={j}
          className="hover:cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 w-20 pr-4"
        >
          <Link href={`/${client.instagram}`} key={client.instagram}>
            <div className="flex flex-col items-center">
              <ClientAvatar client={client} />
              <a className="block w-full mt-2 text-gray-500 text-sm truncate text-center">
                {client.instagram}
              </a>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default Home;
