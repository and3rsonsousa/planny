import { createContext, useState, useContext } from "react";
import { GraphQLClient } from "graphql-request";
import dayjs from "dayjs";
const graphcms = new GraphQLClient(
  "https://api-us-east-1.graphcms.com/v2/ckj80c5b1qjor01xpclyienfi/master"
);
import { getPosts, createPost, removePost } from "./graphql-data";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
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

  const refreshPosts = async (client) => {
    try {
      const latestsPosts = await getPosts(client);
      setPosts(latestsPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const addPost = async (post) => {
    try {
      const newPost = await createPost(post);
      setPosts((prevPosts) => {
        let postsArray = [newPost, ...prevPosts];
        postsArray = postsArray.sort((a, b) => {
          return dayjs(b.date).subtract(dayjs(a.date));
        });
        const [loading, setLoading] = useLoading;
        setLoading(false);
        return postsArray;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (post) => {};

  const deletePost = async (id) => {
    try {
      const result = await removePost(id);

      setPosts((allPosts) => {
        let postsArray = allPosts.filter((i) => i.id != id);
        console.log(postsArray);
        const [loading, setLoading] = useLoading;
        setLoading(false);
        return postsArray;
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
        refreshPosts,
        addPost,
        deletePost,
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
