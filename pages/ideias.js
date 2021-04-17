import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import LoginWrapper from "../components/LoginWrapper";
import { AuthContext } from "../utility/AuthContext";
import { useApp } from "../utility/AppContext";
import { getClientsFromUser } from "../utility/GraphQLData";
import Loader from "../components/Loader";
import IdeaPopup from "../components/IdeaPopup";
import LayoutWrapper from "../components/LayoutWrapper";
import Idea from "../components/Idea";

const Ideias = (props) => {
  const { user } = useContext(AuthContext);
  const { ideas, setIdeas, useVisible } = useApp();
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
      <LayoutWrapper>
        <div>
          <Head>
            <title>Planny</title>
          </Head>
        </div>
        <div className="container mx-auto pt-8 px-4  flex justify-between items-center">
          <div className="prose gray-800">
            <h3>Ideias</h3>
          </div>
          <div>
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
        </div>
        {ideas && clients ? (
          clients.map((client) => (
            <div className="container mx-auto py-8 px-4">
              <div className="mb-4">
                <h4 className="text-base uppercase tracking-wider font-semibold text-gray-500">
                  {client.name}
                </h4>
              </div>
              {client.ideas.length ? (
                <div className="grid sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
                  {client.ideas.map((idea, i) => (
                    <Idea idea={idea} key={i} />
                  ))}
                  <IdeaPopup clients={clients} />
                </div>
              ) : (
                <div className="bg-gray-200 py-1 px-3 inline-block rounded-lg text-gray-500 text-sm tracking-wide">
                  Nenhuma ideia a ser exibida.
                </div>
              )}
            </div>
          ))
        ) : (
          <Loader />
        )}
        {/* {ideas && clients ? (
          <div className="py-8 px-4 container mx-auto grid sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
            {ideas.map((idea, i) => (
              <Idea idea={idea} key={i} />
            ))}
            <IdeaPopup clients={clients} />
          </div>
        ) : (
          <Loader />
        )} */}
      </LayoutWrapper>
    </LoginWrapper>
  );
};

export default Ideias;
