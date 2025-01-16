import { useEffect, useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        setPosts(data.slice(0, 10)); // Limit to 10 posts
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="app">
      <h1>Post Management App</h1>
      <PostForm onAddPost={handleAddPost} />
      <PostList posts={posts} />
    </div>
  );
};

export default App;
