import React, { createContext, useState, useContext } from "react";
import { GraphQLClient } from "graphql-request";
import dayjs from "dayjs";
const graphcms = new GraphQLClient(
  "https://api-us-east-1.graphcms.com/v2/ckj80c5b1qjor01xpclyienfi/master"
);
import { execGraphQl } from "./graphql-data";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [toUpdate, setToUpdate] = useState(null);
  const useVisible = useState(false);
  const useLoading = useState(false);
  const Actions = [
    {
      name: "Postagem",
      slug: "postagem",
    },
    {
      name: "Stories",
      slug: "stories",
    },
    {
      name: "Evento",
      slug: "evento",
    },
    {
      name: "Meeting",
      slug: "meeting",
    },
  ];

  const addNewPost = async (post) => {
    console.log(post);
    const query = `
    mutation($title: String!, $description: String!, $action: Int!, $date: Date!, $client: ID!) { 
      createPost(data: {title: $title, description: $description, action: $action, date: $date,  client: {connect: {id:$client }}}){
        id
        title
        description
        action
        date
        done
      }
    }`;
    const variables = post;

    try {
      const result = await execGraphQl(query, variables);
      const createdPost = result.createPost;
      setPosts(() => {
        const updatedPosts = [...posts, createdPost];
        const sortedPosts = updatedPosts.sort(
          (a, b) => dayjs(b.date) - dayjs(a.date)
        );
        const [loading, setLoading] = useLoading;
        setLoading(false);
        return sortedPosts;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (post) => {
    const query = `mutation($id:ID, $title: String!, $description: String!, $action: Int!, $date: Date!, $done: Boolean!) {
      updatePost(where: {id: $id}, data: {title: $title, description: $description, action: $action, date: $date, done: $done}){
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
    }`;

    const variables = post;

    try {
      const result = await execGraphQl(query, variables);
      setPosts((prevPosts) => {
        const index = prevPosts.findIndex((p) => p.id === result.updatePost.id);
        prevPosts[index] = result.updatePost;
        const [loading, setLoading] = useLoading;
        setLoading(false);
        return prevPosts;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    const query = `mutation($id: ID!){
      deletePost(where: {id: $id}){
        id
      }
    }`;
    const variables = { id };

    try {
      const result = await execGraphQl(query, variables);
      setPosts(() => {
        const postsArray = posts.filter((i) => i.id != id);
        const [loading, setLoading] = useLoading;
        setLoading(false);
        return postsArray;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addNewIdea = async (idea) => {
    const query = `
    mutation($title: String!, $client: ID!){
      createIdea(data:{title: $title, client: {connect:  {id: $client}}}){
        id
        title
        client{
          id
          fgColor
          bgColor
        }
      }
    }`;
    const variables = idea;

    try {
      const result = await execGraphQl(query, variables);
      const createdIdea = result.createIdea;
      setIdeas(() => {
        const updatedIdeas = [...ideas, createdIdea];
        const [loading, setLoading] = useLoading;
        setLoading(false);
        return updatedIdeas;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateIdea = async (idea) => {
    const query = `mutation($id:ID, $title: String!, $client: ID!) {
      updateIdea(where: {id: $id}, data: {title: $title, client: {connect: {id:$client}}}){
        id
        title
        client{
          id
          name
          bgColor
          fgColor
        }
      }
    }`;

    const variables = idea;

    try {
      const result = await execGraphQl(query, variables);
      setIdeas((prevIdeas) => {
        const index = prevIdeas.findIndex((p) => p.id === result.updateIdea.id);
        prevIdeas[index] = result.updateIdea;
        const [loading, setLoading] = useLoading;
        setLoading(false);
        return prevIdeas;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIdea = async (id) => {
    const query = `
    mutation($id: ID!){
      deleteIdea(where: {id: $id}){
        id
      }
    }`;
    const variables = { id };
    try {
      const result = await execGraphQl(query, variables);
      setIdeas(() => {
        const ideasArray = ideas.filter((i) => i.id != id);
        const [loading, setLoading] = useLoading;
        setLoading(false);
        return ideasArray;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        posts,
        setPosts,
        addNewPost,
        updatePost,
        deletePost,

        ideas,
        setIdeas,
        addNewIdea,
        updateIdea,
        deleteIdea,

        toUpdate,
        setToUpdate,

        useVisible,
        useLoading,
        Actions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  return useContext(AppContext);
};

export { AppProvider, useApp };
