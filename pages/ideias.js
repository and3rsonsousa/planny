import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import LoginWrapper from "../components/LoginWrapper";
import HeaderWrapper from "../components/HeaderWrapper";
import HeaderMenu from "../components/HeaderMenu";
import { AuthContext } from "../utility/AuthContext";
import { useApp } from "../utility/AppContext";
import { getClientsFromUser } from "../utility/graphql-data";
import Loader from "../components/Loader";
import Flyover from "../components/Flyover";
import NewIdeaPopup from "../components/NewIdeaPopup";

const Ideias = (props) => {
  const { user } = useContext(AuthContext);
  const { ideas, setIdeas, useVisible, deleteIdea } = useApp();
  const [clients, setClients] = useState(null);
  const [visible, setVisible] = useVisible;

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getClientsFromUser(user.email)
        .then((clients) => {
          let allIdeas = [];
          setClients(clients);
          clients.map((c) => {
            c.ideas.map((i) => {
              allIdeas.push(i);
            });
          });
          setIdeas(allIdeas);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  return (
    <LoginWrapper>
      <div>
        <Head>
          <title>Planny</title>
        </Head>
        <HeaderWrapper>
          <HeaderMenu />
        </HeaderWrapper>
      </div>
      {ideas && clients ? (
        <div className="p-4 container mx-auto grid sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          <div className="flex justify-center items-center">
            <button
              className="button button-primary flex items-center"
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
          {ideas.map((idea) => (
            <div
              className="flyover-parent rounded-lg p-4 border flex items-center gap-4"
              key={idea.id}
            >
              <div
                className="h-4 w-4 rounded-full bg-gray-100"
                style={{ backgroundColor: idea.client.bgColor }}
              ></div>
              <div className="prose">
                <div className="text-xx uppercase text-gray-300 tracking-widest -mb-1">
                  {idea.client.name}
                </div>
                <div>{idea.title}</div>
              </div>
              <Flyover id={idea.id} deleteAction={deleteIdea} />
            </div>
          ))}
          <NewIdeaPopup clients={clients} />
        </div>
      ) : (
        <Loader />
      )}
    </LoginWrapper>
  );
};

export default Ideias;
