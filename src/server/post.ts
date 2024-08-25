"use server";

import { BACKEND_URL } from "@/components/constants/backend";
import axios from "axios";

const CreatePost = async (post: { title: string; body: string }) => {
  const res = await axios.post(`${BACKEND_URL}/posts`, post);

  return res.data;
};

export const UpdatePost = async (
  post: { title: string; body: string },
  id: string | number
) => {
  const res = await axios.patch(`${BACKEND_URL}/posts/${id}`, post);

  return res.data;
};

export const DeletePost = async (id: string | number) => {
  const res = await axios.delete(`${BACKEND_URL}/posts/${id}`);

  return res.data;
};

export default CreatePost;
