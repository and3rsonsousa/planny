import React, { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useApp } from "../../utility/AppContext";
import { getClients, getClient, graphcms } from "../../utility/graphql-data";
import { useAuth } from "../../utility/AuthProvider";
import Link from "next/link";

dayjs.locale("pt-br");

export async function getServerSideProps({ params }) {
  // const client = await getClient(params.instagram);
  const clients = await getClients();
  const client = clients.filter((c) => c.instagram == params.instagram)[0];

  return {
    props: {
      client,
      clients,
    },
  };
}

const Plan = ({ client, clients }) => {
  const { user } = useAuth();

  const App = useApp();
  const { posts, setPosts } = App;

  useEffect(() => {
    if (!user.logged) {
      Router.push("/");
    }
    setPosts(client.posts);
  }, []);

  const [thisMonth, setThisMonth] = useState(dayjs());
  const [visible] = App.useVisible;
  const [loading] = App.useLoading;

  let startOfCalendar = thisMonth.startOf("month").startOf("week");
  let endOfCalendar = thisMonth.endOf("month").endOf("week");
  let weeksInCalendar = endOfCalendar.diff(startOfCalendar, "weeks") + 1;

  let weeks = [];
  let daysToCount = 0;
  for (let a = 0; a < weeksInCalendar; a++) {
    weeks[a] = [];
    for (let i = 0; i < 7; i++) {
      let currentDay = startOfCalendar.add(daysToCount, "day");
      weeks[a][i] = {};
      weeks[a][i].date = currentDay;
      weeks[a][i].posts = posts.filter(
        (item) =>
          dayjs(item.date).format("D/M/YYYY") === currentDay.format("D/M/YYYY")
      );
      daysToCount++;
    }
  }

  return (
    <div className="border-indigo-400 border-t-4">
      {user.logged && (
        <>
          <Header Clientes={clients} />
          <div className="grid grid-cols-2 lg:grid-cols-3">
            <section className="p-4 col-span-1 prose relative">
              {loading && (
                <div className="flex justify-end absolute top-0 right-0">
                  <Loader />
                </div>
              )}
              <HeaderInstagram Cliente={client} />
              <InstagramGrid Cliente={client} />
            </section>
            <section className="p-4 col-span-1 lg:col-span-2">
              <Calendar
                thisMonth={thisMonth}
                nextMonth={() => setThisMonth(thisMonth.add(1, "M"))}
                prevMonth={() => setThisMonth(thisMonth.subtract(1, "M"))}
                weeks={weeks}
              />
            </section>
          </div>
          {visible && <NovaAcao Cliente={client} />}
        </>
      )}
    </div>
  );
};

export default Plan;

const Header = ({ Clientes }) => {
  const Posts = useApp();
  const [visible, setVisible] = Posts.useVisible;
  return (
    <div>
      <Head>
        <title>Programação de Posts</title>
      </Head>

      <header className="p-4 flex justify-between">
        <div>
          <h3 className="text-indigo-700 text-2xl font-medium">Planny</h3>
        </div>
        <div className="flex items-center menu-links">
          <Link href="/">
            <a>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 mr-2 text-gray-300"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </span>
              <span>HOME</span>
            </a>
          </Link>
          {/* 
          {Clientes.map((c) => (
            <Link href="/plan/[instagram]" as={`/plan/${c.instagram}`}>
              <a>{c.name}</a>
            </Link>
          ))} */}

          <a
            className="button primary ml-4 flex items-center"
            href="#"
            onClick={() => setVisible(true)}
          >
            <span>NOVA AÇÃO</span>
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
          </a>
        </div>
      </header>
    </div>
  );
};

const Loader = () => <div className="loader loader-instagram"></div>;

const NovaAcao = ({ Cliente }) => {
  const App = useApp();
  const [visible, setVisible] = App.useVisible;
  const [loading, setLoading] = App.useLoading;
  const { posts, addPost, Actions } = App;

  const addNewPost = () => {
    setLoading(1);
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const action =
      document.querySelector("input[name=action]:checked").value * 1;
    const client = Cliente.id;
    const post = { title, description, action, date, client };

    addPost(post);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = dayjs().format("YYYY-MM-DD");
    document.querySelectorAll("input[name=action]")[0].checked = true;

    if (!document.getElementById("keep").checked) {
      setVisible(false);
    } else {
      document.getElementById("title").focus();
    }
  };

  return (
    <div className="p-8 fixed z-50 h-screen w-screen top-0 flex items-center bg-indigo-900 bg-opacity-20">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-2xl prose">
        <div className="text-xl font-semibold flex justify-between">
          <div>Insira nova ação</div>
          <div
            className="text-xs text-gray-400 tracking-widest cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="font-medium mb-2 mt-4">Título</div>
        <input type="text" id="title" className="border-2 p-2 mb-2 w-full" />
        <div className="font-medium mb-2 mt-4">Descrição</div>
        <input
          type="text"
          id="description"
          className="border-2 p-2 mb-2 w-full"
        />
        <div className="font-medium mb-2 mt-4">Data</div>
        <input
          type="date"
          id="date"
          className="border-2 p-2 mb-2 w-full"
          defaultValue={dayjs().format("YYYY-MM-DD")}
        />
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
          <input
            type="checkbox"
            id="keep"
            onChange={(e) => {
              console.log(e.target.checked);
              return !e.target.checked;
            }}
          />
          <div className="ml-2 text-gray-400">Continuar inserindo</div>
        </label>
        <div className="flex justify-end mt-8">
          <button className="button" onClick={() => setVisible(false)}>
            CANCELAR
          </button>
          <button className="ml-4 button primary" onClick={addNewPost}>
            INSERIR
          </button>
        </div>
      </div>
    </div>
  );
};

const HeaderInstagram = ({ Cliente }) => {
  return (
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
          <div className="text-sm -mt-1 text-gray-400">{Cliente.instagram}</div>
        </div>
      </div>
    </header>
  );
};

const InstagramGrid = () => {
  const App = useApp();
  const { posts } = App;
  return (
    <div className="grid grid-cols-3 gap-1">
      {posts
        .filter((i) => i.action == 1)
        .map((i, j) => (
          <Grid key={j} {...i} />
        ))}
    </div>
  );
};

const Calendar = ({ thisMonth, weeks, nextMonth, prevMonth }) => {
  const App = useApp();
  const { Actions } = App;
  return (
    <div className="calendar">
      {/* Legenda de cores */}
      <div className="mb-8 flex gap-x-4">
        {Actions.map((i, j) => {
          let bgColor1 = "bg-" + i.slug + "-light";
          let bgColor2 = "bg-" + i.slug + "-dark";

          return (
            <div
              className={`flex items-center py-1 px-2 rounded-full ${bgColor1}`}
              key={j}
            >
              <div className={`h-2 w-2 rounded-full mr-2 ${bgColor2}`}></div>
              <div className="text-xx font-semibold uppercase tracking-wider">
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
                  <Col {...item} key={z} />
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
      <Flyover id={id} />
    </div>
  );
};

const Flyover = ({ id }) => {
  const App = useApp();
  const [loading, setLoading] = App.useLoading;
  const { deletePost } = App;

  const DeletePost = (id) => {
    if (window.confirm("Deletar esse item?")) {
      setLoading(1);
      console.log("I'll delete post ", id);
      const deletedPost = deletePost(id);
    }
  };

  return (
    <div className="flyover top-0 right-0">
      <button
        onClick={() => DeletePost(id, setLoading, setCliente)}
        className="button dark button-small"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-3"
        >
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
      <button
        onClick={() => DeletePost(id)}
        className="button dark button-small"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-3"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

const Col = ({ id, title, description, action }) => {
  console.log(action);
  const classNames = (action) => {
    switch (action) {
      case 1:
        return "calendar-day-col flyover-parent prose bg-postagem-dark";
      case 2:
        return "calendar-day-col flyover-parent prose bg-stories-dark";
      case 3:
        return "calendar-day-col flyover-parent prose bg-evento-dark";
      case 4:
        return "calendar-day-col flyover-parent prose bg-meeting-dark";
      default:
        return "calendar-day-col flyover-parent prose bg-postagem-dark";
    }
  };

  return (
    <div className={classNames(action)}>
      <div className={`hidden lg:block text-xs font-medium leading-4`}>
        {title}
      </div>
      <Flyover id={id} />
    </div>
  );
};

// export async function getStaticPaths() {
//   const { clients } = await graphcms.request(`
//     {
//         clients{
//             id
//             instagram
//         }
//     }
//     `);
//   return {
//     paths: clients.map(({ instagram }) => ({
//       params: { instagram },
//     })),
//     fallback: false,
//   };
// }

// const InsertPost = async (
//   title,
//   description,
//   action,
//   date,
//   client,
//   setLoading,
//   setCliente,
//   instagram
// ) => {
//   setLoading(true);
//   const result = await graphcms.request(
//     `
//   mutation($title: String!, $description: String!, $action: Int!, $date: Date!, $client: ID!)
//     {
//         createPost(data: {title: $title, description: $description, action: $action, date: $date,  client: {connect: {id:$client }}}){
//         id
//     }
//   }`,
//     {
//       title,
//       description,
//       action,
//       date,
//       client,
//     }
//   );

//   const clientes = await getClients(instagram);
//   setCliente(clientes[0]);
//   setLoading(false);

//   return result;
// };

// async function DeletePost(id, setLoading, setCliente, instagram) {
//   setLoading(true);
//   const result = await graphcms.request(
//     `
//       mutation($id:ID!){
//           deletePost(where:{id:$id}) {
//               id
//           }
//       }
//       `,
//     {
//       id: id,
//     }
//   );

//   const clientes = await getClients(instagram);
//   setCliente(clientes[0]);
//   setLoading(false);

//   return result;
// }
