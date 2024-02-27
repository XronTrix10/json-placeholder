"use server";

import axios from "axios";

const CreatePost = async (post: { title: string; body: string }) => {
  const res = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    post
  );

  return res.data;
};

export const UpdatePost = async (post: { title: string; body: string }, id: string | number) => {
  const res = await axios.patch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    post
  );

  return res.data;
}

export const DeletePost = async (id: string | number) => {
  const res = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  return res.data;
}

export default CreatePost;
