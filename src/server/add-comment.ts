"use server";

import { BACKEND_URL } from "@/components/constants/backend";
import axios, { AxiosResponse } from "axios";

const AddComment = async (comment: {
  postId: number;
  name: string;
  email: string;
  body: string;
}) => {
  const res = await axios.post(`${BACKEND_URL}/comments`, comment);

  return res.data;
};

export default AddComment;
