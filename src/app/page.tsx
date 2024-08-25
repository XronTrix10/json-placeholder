import { BACKEND_URL } from "@/components/constants/backend";
import Navbar from "@/components/Navbar";
import PostGrid from "@/components/sections/PostGrid";
import { type Post } from "@/lib/types";
import axios from "axios";

export default async function Home() {
  let posts: Post[] = [];

  try {
    const data = await axios(`${BACKEND_URL}/posts`);
    posts = data.data;
  } catch (error) {
    console.error(error);
  }
  return (
    <main className="flex">
      <Navbar page={0} />
      <PostGrid posts={posts} />
    </main>
  );
}
