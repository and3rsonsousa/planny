import React from "react";
import Link from "next/link";
import { GraphQLClient } from "graphql-request";

export async function getStaticProps() {
  const graphcms = new GraphQLClient(
    "https://api-us-east-1.graphcms.com/v2/ckj80c5b1qjor01xpclyienfi/master"
  );

  const { clients } = await graphcms.request(
    `
    {
      clients{
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
  return (
    <div className="max-w-md mx-auto bg-indigo-100 p-8 mt-12 rounded-lg">
      <h3 className="mb-4 text-2xl font-medium text-indigo-700">Planny</h3>
      <div className="grid grid-cols-2 gap-4">
        {props.clients.map((i, j) => (
          <div>
            <Link href={`plan/${i.instagram}`} key={i.instagram}>
              <a className="bg-indigo-600 p-4 rounded text-indigo-200 block no-underline hover:bg-indigo-700">
                {i.name}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
