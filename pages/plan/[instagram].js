import React, { useState, useEffect } from "react";
import { GraphQLClient } from "graphql-request";
import Head from "next/head";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
dayjs.locale("pt-br");

const graphcms = new GraphQLClient(
  "https://api-us-east-1.graphcms.com/v2/ckj80c5b1qjor01xpclyienfi/master"
);

const ClientContext = React.createContext();

export async function getStaticProps({ params }) {
  const clients = await getClients(params.instagram);

  return {
    props: {
      client: clients[0],
    },
  };
}

async function getClients(instagram) {
  const { clients } = await graphcms.request(
    `
          query ClientData($instagram: String!){
            clients(where: {instagram: $instagram}){
              id
              name
              instagram
              posts (orderBy: date_DESC) {
                  id
                  title
                  description
                  date
                  action
              }
            }
          }`,
    {
      instagram: instagram,
    }
  );
  return clients;
}

export async function getStaticPaths() {
  const { clients } = await graphcms.request(`
    {
        clients{
            id
            instagram
        }
    }
    `);
  return {
    paths: clients.map(({ instagram }) => ({
      params: { instagram },
    })),
    fallback: false,
  };
}

async function InsertPost(
  title,
  description,
  action,
  date,
  client,
  setCliente,
  setLoading
) {
  setLoading(true);
  const result = await graphcms.request(
    `
  mutation($title: String!, $description: String!, $action: Int!, $date: Date!, $client: ID!) 
    { 
        createPost(data: {title: $title, description: $description, action: $action, date: $date,  client: {connect: {id:$client }}}){
        id
    }
  }`,
    {
      title,
      description,
      action,
      date,
      client,
    }
  );

  const clientes = await getClients(instagram);
  setCliente(clientes[0]);
  setLoading(false);

  return result;
}

async function DeletePost(id, setLoading, setCliente) {
  setLoading(true);
  const result = await graphcms.request(
    `
      mutation($id:ID!){
          deletePost(where:{id:$id}) {
              id
          }
      }
      `,
    {
      id: id,
    }
  );

  const clientes = await getClients(instagram);
  setCliente(clientes[0]);
  setLoading(false);

  return result;
}

const Plan = ({ client }) => {
  const [thisMonth, setThisMonth] = useState(dayjs());
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Cliente, setCliente] = useState(client);
  const Actions = getActions();
  let startOfCalendar = thisMonth.startOf("month").startOf("week");
  let endOfCalendar = thisMonth.endOf("month").endOf("week");
  let weeksInCalendar = endOfCalendar.diff(startOfCalendar, "weeks") + 1;
  //   let daysInCalendar = weeksInCalendar * 7;
  let weeks = [];
  let daysToCount = 0;
  for (let a = 0; a < weeksInCalendar; a++) {
    weeks[a] = [];
    for (let i = 0; i < 7; i++) {
      let currentDay = startOfCalendar.add(daysToCount, "day");
      weeks[a][i] = {};
      weeks[a][i].date = currentDay;
      weeks[a][i].posts = Cliente.posts.filter(
        (item) =>
          dayjs(item.date).format("D/M/YYYY") === currentDay.format("D/M/YYYY")
      );
      daysToCount++;
    }
  }

  return (
    <div className="border-indigo-400 border-t-4">
      <Head>
        <title>Programação de Posts</title>
      </Head>

      <header className="p-4 flex justify-between">
        <div>
          <h3 className="text-indigo-700 text-2xl font-medium">Planny</h3>
        </div>
        <div>
          <a
            className="button primary"
            href="#"
            onClick={() => setVisible(true)}
          >
            NOVA AÇÃO
          </a>
        </div>
      </header>
      <div className="grid grid-cols-3">
        <section className="p-4 col-span-1 prose relative">
          {loading && (
            <div className="flex justify-end absolute top-0 right-0">
              <div className="loader loader-instagram"></div>
            </div>
          )}
          <HeaderIG Cliente={Cliente} />
          <Instagram
            Cliente={Cliente}
            setLoading={setLoading}
            setCliente={setCliente}
          />
        </section>
        <section className="p-4 col-span-2">
          <Calendar
            thisMonth={thisMonth}
            nextMonth={() => setThisMonth(thisMonth.add(1, "M"))}
            prevMonth={() => setThisMonth(thisMonth.subtract(1, "M"))}
            setCliente={setCliente}
            setLoading={setLoading}
            weeks={weeks}
          />
        </section>
      </div>
      {visible && (
        <div className="p-8 fixed z-50 h-screen w-screen top-0 flex items-center bg-gray-200 bg-opacity-60">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-2xl prose">
            <div className="text-xl font-semibold flex justify-between">
              <div>Insira nova ação</div>
              <div
                className="text-xs text-gray-400 tracking-widest cursor-pointer"
                onClick={() => setVisible(false)}
              >
                FECHAR
              </div>
            </div>
            <div className="font-medium mb-2 mt-4">Título</div>
            <input
              type="text"
              id="title"
              className="border-2 p-2 mb-2 w-full"
            />
            <div className="font-medium mb-2 mt-4">Descrição</div>
            <input
              type="text"
              id="description"
              className="border-2 p-2 mb-2 w-full"
            />
            <div className="font-medium mb-2 mt-4">Data</div>
            <input type="date" id="date" className="border-2 p-2 mb-2 w-full" />
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
            <hr />
            <label className="flex items-center">
              <input type="checkbox" id="keep" />
              <div className="ml-2 text-gray-400">Continuar inserindo</div>
            </label>
            <div className="flex justify-end mt-8">
              <button className="button" onClick={() => setVisible(false)}>
                CANCELAR
              </button>
              <button
                className="ml-4 button primary"
                onClick={() => {
                  const title = document.getElementById("title").value;
                  const description = document.getElementById("description")
                    .value;
                  const date = document.getElementById("date").value;
                  const action =
                    document.querySelector("input[name=action]:checked").value *
                    1;
                  const client = Cliente.id;

                  InsertPost(
                    title,
                    description,
                    action,
                    date,
                    client,
                    setCliente,
                    setLoading
                  );

                  document.getElementById("title").value = "";
                  document.getElementById("description").value = "";
                  document.getElementById("date").value = null;
                  document.querySelectorAll(
                    "input[name=action]"
                  )[0].checked = true;

                  if (document.getElementById("keep").value != true) {
                    setVisible(false);
                  }
                }}
              >
                INSERIR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plan;

const HeaderIG = ({ Cliente }) => (
  <header className="flex items-center justify-between mb-4">
    <div className="flex items-center ">
      <div
        className="w-12 h-12 bg-cover rounded-full shadow-inner"
        style={{
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhOaaBAY_yOcJXbL4jW0I_Y5sePbzagqN2aA&usqp=CAU)",
        }}
      ></div>
      <div className="ml-4">
        <div className="text-xl font-medium">{Cliente.name}</div>
        <div className="text-sm -mt-1">{Cliente.instagram}</div>
      </div>
    </div>
  </header>
);

const Instagram = ({ Cliente, setLoading, setCliente }) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {Cliente.posts
        .filter((i) => i.action == 1)
        .map((i, j) => (
          <Grid
            key={j}
            {...i}
            setLoading={setLoading}
            setCliente={setCliente}
          />
        ))}
    </div>
  );
};

const Calendar = ({
  thisMonth,
  weeks,
  nextMonth,
  prevMonth,
  setCliente,
  setLoading,
}) => {
  let Actions = getActions();
  return (
    <div className="calendar">
      {/* Legenda de cores */}
      <div className="mb-8 flex gap-x-4">
        {Actions.map((i, j) => {
          let bgColor = "bg-" + i.color1;
          let textColor = "text-" + i.color2;

          return (
            <div
              className={`flex items-center ${bgColor} py-1 px-2 rounded-full`}
              key={j}
            >
              <div className={`h-2 w-2 rounded-full ${bgColor} mr-2`}></div>
              <div
                className={`text-xx font-semibold uppercase tracking-wider ${textColor}`}
              >
                {i.name}
              </div>
            </div>
          );
        })}
      </div>
      <div className="calendar-grid">
        {/* Controles dos Meses */}
        <div className="col-span-7 flex w-full justify-center items-end p-4">
          <div className="calendar-month-button" onClick={prevMonth}>
            {thisMonth.subtract(1, "M").format("MMMM")}
          </div>
          <div className="font-medium text-gray-700 px-4">
            {thisMonth.format("MMMM")}
          </div>
          <div className="calendar-month-button" onClick={nextMonth}>
            {thisMonth.add(1, "M").format("MMMM")}
          </div>
        </div>
        {/* Dias da Semana */}
        {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"].map((a, b) => (
          <div className="calendar-day calendar-week" key={a}>
            {a}
          </div>
        ))}
        {/* Calendário */}
        {weeks.map((w, a) =>
          w.map((i, j) => (
            <div
              key={(a + 1) * (j + 1)}
              className={`calendar-day${
                i.date.month() != thisMonth.month() ? " out-of-month" : ""
              }`}
            >
              <div className="calendar-day-date">{dayjs(i.date).date()}</div>
              <div className="calendar-day-content">
                {i.posts.map((item, z) => (
                  <Col
                    {...item}
                    key={z}
                    Actions={Actions}
                    setCliente={setCliente}
                    setLoading={setLoading}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Grid = ({ id, title, description, date, setCliente, setLoading }) => {
  return (
    <div className="border p-4 flyover-parent">
      <h6 className="text-xs tracking-widest text-gray-400">
        {dayjs(date).format("D/M/YYYY")}
      </h6>
      <h4>{title}</h4>
      <div className="text-sm">{description}</div>
      <Flyover id={id} setLoading={setLoading} setCliente={setCliente} />
    </div>
  );
};

const Flyover = ({ id, setLoading, setCliente }) => {
  return (
    <div className="flyover top-0 right-0">
      <button
        onClick={() => DeletePost(id, setLoading, setCliente)}
        className="button dark button-small"
      >
        EDITAR
      </button>
      <button
        onClick={() => DeletePost(id, setLoading, setCliente)}
        className="button dark button-circle"
      >
        &times;
      </button>
    </div>
  );
};

const Col = ({
  id,
  title,
  description,
  action,
  Actions,
  setCliente,
  setLoading,
}) => {
  let bgColor = "bg-" + Actions[action - 1].color1;
  let textColor = "text-" + Actions[action - 1].color2;
  return (
    <div className={`calendar-day-col flyover-parent prose ${bgColor}`}>
      <div className={`text-sm font-medium leading-5 ${textColor}`}>
        {title}
      </div>
      {/* <div className={`text-sm text-${Actions[action - 1].color3}`}>
        {description}
      </div> */}

      <Flyover id={id} setCliente={setCliente} setLoading={setLoading} />
    </div>
  );
};

const getActions = () => [
  {
    name: "Postagem",
    slug: "postagem",
    color1: "purple-100",
    color2: "purple-600",
    color3: "purple-900",
    color4: "white",
  },
  {
    name: "Stories",
    slug: "stories",
    color1: "pink-100",
    color2: "pink-500",
    color3: "pink-700",
    color4: "white",
  },
  {
    name: "Evento",
    slug: "evento",
    color1: "yellow-100",
    color2: "yellow-500",
    color3: "yellow-700",
    color4: "white",
  },
  {
    name: "Meeting",
    slug: "meeting",
    color1: "green-100",
    color2: "green-500",
    color3: "green-700",
    color4: "white",
  },
];
