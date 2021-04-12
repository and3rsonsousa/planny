import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import LoginWrapper from "../components/LoginWrapper";
import HeaderWrapper from "../components/HeaderWrapper";
import HeaderMenu from "../components/HeaderMenu";
import { AuthContext } from "../utility/AuthContext";
import { useApp } from "../utility/AppContext";
import { getClientsFromUser } from "../utility/GraphQLData";
import Loader from "../components/Loader";
import Flyover from "../components/Flyover";
import NewIdeaPopup from "../components/NewIdeaPopup";
import ClientAvatar from "../components/ClientAvatar";
import Layout from "../components/Layout";

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
      <Layout>
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
          <div className="py-8 px-4 container mx-auto grid sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
            {ideas.map((idea) => (
              <div
                className="flyover-parent rounded-lg p-4 border flex items-center gap-4"
                key={idea.id}
              >
                <ClientAvatar client={idea.client} size="medium" />
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
      </Layout>
    </LoginWrapper>
  );
};

export default Ideias;
