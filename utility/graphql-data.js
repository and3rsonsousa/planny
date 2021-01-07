import React from "react";
import { GraphQLClient } from "graphql-request";
const graphcms = new GraphQLClient(
  "https://api-us-east-1.graphcms.com/v2/ckj80c5b1qjor01xpclyienfi/master"
);
// import dayjs from "dayjs";

const execGraphQl = async (query, variable) => {
  const result = await graphcms.request(query, variable);
  return result;
};

const logUser = async (email) => {
  const { theUsers } = await graphcms.request(
    `
    query UserData($email: String!){
      theUsers(where: {email: $email}){
        email
        password
      }
    }`,
    {
      email,
    }
  );
  return { theUser: theUsers[0] };
};

const getTheUser = async (email) => {
  const { theUsers } = await graphcms.request(
    `query UserData($email: String!){
      theUsers(where:{email: $email}){
        id
        name
        email
      }
    }`,
    {
      email,
    }
  );
  return { theUser: theUsers[0] };
};

const getTheUserFull = async (email) => {
  /* 
  Mostrar apenas os posts do mês
  //
  (where: {date_gte:"${dayjs()
  .startOf("M")
  .format("YYYY-MM-DD")}", date_lte:"${dayjs()
.endOf("M")
.format("YYYY-MM-DD")}"}) */
  const { theUsers } = await graphcms.request(
    `query UserData($email: String!){
      theUsers(where:{email: $email}){
        id
        name
        email
        clients(orderBy:name_ASC){
          id
          name
          instagram
          posts{
            id
            title
            description
            action
            date
            done
            client{
              id
              bgColor
              fgColor
            }
          }
          ideas{
            id
            title
            client{
              id
              name
              bgColor
              fgColor
            }
          }
        }
      }
    }`,
    {
      email,
    }
  );
  return { theUserFull: theUsers[0] };
};

const getClient = async (instagram) => {
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
            done
            client{
              id
              bgColor
              fgColor
            }
        }
    }
    }`,
    {
      instagram: instagram,
    }
  );
  return clients[0];
};

const getClients = async () => {
  const { clients } = await graphcms.request(
    `
    query{
    clients{
        id
        name
        instagram
        posts (orderBy: date_DESC) {
            id
            title
            description
            date
            action
            done
            client{
              id
              bgColor
              fgColor
            }
        }
    }
    }`
  );
  return clients;
};

const getClientsFromUser = async (email) => {
  const { theUserFull } = await getTheUserFull(email);
  return theUserFull.clients;
};

const getPosts = async (clientID) => {
  const { posts } = await graphcms.request(
    `query getPosts($id: ID!){
        posts(where: {client: {id: $id}}, orderBy: date_DESC){
            id
            title
            description
            date
            action   
            done
        }
    }`,
    {
      id: clientID,
    }
  );
  return posts;
};

// const updateThePost = async ({
//   id,
//   title,
//   description,
//   action,
//   date,
//   done,
// }) => {
//   const result = await graphcms.request(
//     `mutation($id:ID, $title: String!, $description: String!, $action: Int!, $date: Date!, $done: Boolean!) {
//         updatePost(where: {id: $id}, data: {title: $title, description: $description, action: $action, date: $date, done: $done}){
//           id
//           title
//           description
//           action
//           date
//           done
//           client{
//             bgColor
//             fgColor
//           }
//         }
//       }`,
//     {
//       id,
//       title,
//       description,
//       action,
//       date,
//       done,
//     }
//   );
//   return result.updatePost;
// };

export {
  execGraphQl,
  getClients,
  getClient,
  getPosts,
  // updateThePost,
  graphcms,
  logUser,
  getTheUser,
  getClientsFromUser,
};
