import { useState } from "react";

const PostForm = ({ onAddPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return;
    setLoading(true);

    const newPost = {
      title,
      body,
      userId: 1,
    };

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      const result = await response.json();
      onAddPost(result);
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setLoading(false);
      setTitle("");
      setBody("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Post Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
