import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { getClientsFromUser } from "../utility/GraphQLData";
import { AuthContext } from "../utility/AuthContext";
import { useApp } from "../utility/AppContext";
import Layout from "../components/layout";
import LoginWrapper from "../components/LoginWrapper";
import Calendar from "../components/Calendar";
import ProgressBar from "../components/ProgressBar";
import ClientAvatar from "../components/ClientAvatar";

import NewIdeaPopup from "../components/NewIdeaPopup";
import NewActionPopup from "../components/NewActionPopup";

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
  return (
    <LoginWrapper>
      <Layout>
        <div>
          <Head>
            <title>{user.name} / Planny</title>
          </Head>

          {clients ? (
            <div className="py-8 container mx-auto">
              <ClientsBar clients={clients} />
              <div className="grid grid-cols-4 gap-8">
                {/* Calendário */}
                <div className="grid col-span-3">
                  <div>
                    {/* <div className="prose">
                      <h3>Dashboard</h3>
                    </div> */}
                    <div className="grid grid-cols-3 py-12 gap-8">
                      <div className="bg-gray-50 rounded-xl p-8 flex flex-col items-center">
                        <div className="text-8xl text-brand-600">
                          {clients.length}
                        </div>
                        <div className="uppercase font-medium tracking-widest text-gray-400 text-xs">
                          Clientes
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-8 flex flex-col items-center">
                        <div className="text-8xl text-brand-600">
                          {posts.length}
                        </div>
                        <div className="uppercase font-medium tracking-widest text-gray-400 text-xs">
                          AÇÕES
                        </div>
                        <div className="mt-4">
                          <ProgressBar
                            completed={completedActions}
                            actions={posts.length}
                          />
                        </div>
                        <div className="text-xs mt-2 font-medium tracking-widest text-gray-400 ">
                          <span className="font-bold">{completedActions}</span>{" "}
                          AÇÕES FINALIZADAS
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-8 flex flex-col items-center">
                        <div className="text-8xl text-brand-600">
                          {ideas.length}
                        </div>
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

                {/* ideias */}
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
                        className="py-2 text-gray-500 text-sm flex "
                        key={idea.id}
                      >
                        <ClientAvatar client={idea.client} size="small" />
                        <div className="ml-4">{idea.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {popup === "action" ? (
                <NewActionPopup clients={clients} />
              ) : (
                <NewIdeaPopup clients={clients} />
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </Layout>
    </LoginWrapper>
  );
};

const ClientsBar = ({ clients }) => (
  <div className="ClientsBar mb-8">
    <div className="space-x-4 flex">
      {clients.map((client, j) => (
        <div
          key={j}
          className="hover:cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 w-20"
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
