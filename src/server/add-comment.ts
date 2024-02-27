"use server";

import axios, { AxiosResponse } from "axios";

const AddComment = async (comment: {
  postId: number;
  name: string;
  email: string;
  body: string;
}) => {
  const res = await axios.post(
    "https://jsonplaceholder.typicode.com/comments",
    comment
  );

  return res.data;
};

export default AddComment;
