import React, { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";
import Link from "next/link";
import Head from "next/head";
import dayjs from "dayjs";
import HeaderWrapper from "../components/HeaderWrapper";
import Calendar from "../components/Calendar";
import { useApp } from "../utility/AppContext";

export async function getStaticProps({ params }) {
  const graphcms = new GraphQLClient(
    "https://api-us-east-1.graphcms.com/v2/ckj80c5b1qjor01xpclyienfi/master"
  );
  let req = null;

  if (params.client === "master") {
    req = await graphcms.request(
      `query{
        clients(orderBy: name_ASC){
          id
          name
          instagram
        }
        posts (orderBy: date_DESC) {
          id
          title
          description
          date
          action
          done
        }
      }`
    );
  } else {
    req = await graphcms.request(
      `query ClientData($instagram: String!){
        clients(orderBy: name_ASC, where:{instagram: $instagram}){
          id
          name
          instagram
        }
      }`,
      {
        instagram: params.client,
      }
    );
  }

  const { clients, posts } = req;

  return {
    props: {
      clients,
      posts,
      master: params.client === "master",
    },
  };
}

export async function getStaticPaths() {
  const graphcms = new GraphQLClient(
    "https://api-us-east-1.graphcms.com/v2/ckj80c5b1qjor01xpclyienfi/master"
  );

  const { clients } = await graphcms.request(
    `{
        clients(orderBy: name_ASC){
          id
          name
          instagram
        }
      }`
  );

  const paths = clients.map((c) => {
    return {
      params: {
        client: c.instagram,
      },
    };
  });

  paths.push({ params: { client: "master" } });

  return {
    paths,
    fallback: false,
  };
}

const Dashboard = (props) => {
  const [thisMonth, setThisMonth] = useState(dayjs());

  const { setPosts } = useApp();
  useEffect(() => {
    setPosts(props.posts);
  }, []);

  return (
    <div>
      <Head>
        <title>
          {" "}
          {props.master ? "Master" : props.clients[0].name} / Planny
        </title>
      </Head>
      <HeaderWrapper />
      <div className="p-4">
        <div className="grid grid-cols-5 gap-8">
          <div className="divide-solid divide-y">
            {props.clients.map((i, j) => (
              <div key={j}>
                <Link href={`/plan/${i.instagram}`} key={i.instagram}>
                  <a className="block py-2 text-gray-500">{i.name}</a>
                </Link>
              </div>
            ))}
          </div>
          <div className="grid col-span-3">
            <Calendar
              thisMonth={thisMonth}
              nextMonth={() => setThisMonth(thisMonth.add(1, "M"))}
              prevMonth={() => setThisMonth(thisMonth.subtract(1, "M"))}
            />
          </div>
          <div className="grid gap-4 col-span-1 prose">
            <h3>Ideias</h3>
            <div>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur, dolore non, expedita blanditiis nesciunt illum
              repellendus libero est aut aperiam atque velit obcaecati doloribus
              culpa asperiores? Consectetur culpa dolores iusto.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
