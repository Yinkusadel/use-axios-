"use client"

import { useState } from "react";
import useAxios from "../hooks/useAxios";

function App() {
  const { response, error, loading, fetchData } = useAxios();
  const [postId, setPostId] = useState("");

  const fetchPosts = () => {
    fetchData({
      url: "/posts",
      method: "GET"
    })
  }

  const createPosts = () => {
    fetchData({
      url: "/posts",
      method: "POST",
      data: {
        title: "AOT",
        body: "levi",
        userId: 1,
      }
    })
  }

  const updatePost = () => {
    fetchData({
      url: `/posts/${postId}`,
      method: "PUT",
      data: {
        id: postId,
        title: "updated title",
        body: "updated body",
        userId: 1,
      }
    })
  }

  const deletePost = () => {
    fetchData({
      url: `/posts/${postId}`,
      method: "DELETE",
    })
  }


  return (
    <main className="">

      <h1 className="text-center">json placeholder with hook</h1>
      <div className="flex items-start mt-8 justify-between px-4">
        {error && <p>Error: {error}</p>}
        <button onClick={fetchPosts} className="bg-green-400 border rounded p-2 ">
          fetch Posts
        </button>
        <button onClick={createPosts} className="bg-blue-400 border rounded p-2 ">
          create Posts
        </button>

        <button onClick={updatePost} disabled={!postId} className="bg-red-400 border rounded p-2 ">
          update post
        </button>
        <button onClick={deletePost} disabled={!postId} className="bg-yellow-400 border rounded p-2 ">
          delete post
        </button>
      </div>


      <input className="my-8 h-10 border w-full px-4"
        type="text"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
        placeholder="post id for update or delete"
      />

      <div>
        {response && (
          <pre style={{ textAlign: "left" }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        )}
      </div>
      {loading && <p>loading...</p>}
    </main>
  );
}

export default App;