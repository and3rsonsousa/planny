import React, { useEffect } from "react";
import Link from "next/link";
import { GraphQLClient } from "graphql-request";
import Head from "next/head";
import { useAuth } from "./utility/AuthProvider";

export async function getStaticProps() {
  const graphcms = new GraphQLClient(
    "https://api-us-east-1.graphcms.com/v2/ckj80c5b1qjor01xpclyienfi/master"
  );

  const { clients } = await graphcms.request(
    `
    {
      clients(orderBy: name_ASC){
        id
        name
        instagram
      }
    }`
  );

  return {
    props: {
      clients,
    },
  };
}

const Home = (props) => {
  const { user, login, msg } = useAuth();

  return (
    <div className="bg-gray-100 p-12 h-screen flex items-center">
      <Head>
        <title>Planny</title>
      </Head>

      <div className="mx-auto bg-white p-8 rounded-lg shadow-2xl">
        <h3 className="mb-0 text-2xl font-medium text-indigo-700">Planny</h3>

        {user.logged ? (
          <>
            <div className="prose mb-8">
              Escolha um dos clientes para gerenciar
            </div>
            <div className="grid grid-cols-3 gap-4">
              {props.clients.map((i, j) => (
                <div key={j}>
                  <Link href={`/plan/${i.instagram}`} key={i.instagram}>
                    <a className="button primary block text-center">{i.name}</a>
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="prose mt-4 w-80">
            <input
              type="email"
              id="mail"
              placeholder="E-mail"
              className="border-2 p-2 mb-2 w-full rounded-lg"
            />
            {msg != "" && (
              <div className="prose text-sm p-2 text-red-600 mb-4 rounded-lg bg-red-100">
                {msg}
              </div>
            )}
            <button
              className="button primary"
              onClick={() => {
                login(document.getElementById("mail").value);
              }}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
