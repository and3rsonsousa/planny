import { GraphQLClient } from "graphql-request";
const graphcms = new GraphQLClient(
  "https://api-us-east-1.graphcms.com/v2/ckj80c5b1qjor01xpclyienfi/master"
);

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
        }
    }
    }`
  );
  return clients;
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
        }
    }`,
    {
      instagram: instagram,
    }
  );
  return posts;
};

const createPost = async ({ title, description, action, date, client }) => {
  const result = await graphcms.request(
    `
      mutation($title: String!, $description: String!, $action: Int!, $date: Date!, $client: ID!) { 
        createPost(data: {title: $title, description: $description, action: $action, date: $date,  client: {connect: {id:$client }}}){
          id
          title
          description
          action
          date
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
  return result.createPost;
};

const removePost = async (id) => {
  const result = await graphcms.request(
    `
    mutation($id: ID!){
      deletePost(where: {id: $id}){
        id
      }
    }
    `,
    {
      id,
    }
  );

  return result.deletePost;
};

export { getClients, getClient, getPosts, createPost, removePost, graphcms };
