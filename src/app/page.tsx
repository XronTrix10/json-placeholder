import Navbar from "@/components/Navbar";
import PageLoader from "@/components/loader/PageLoader";
import PostGrid from "@/components/sections/PostGrid";
import { type Post } from "@/lib/types";
import axios from "axios";
import { Suspense } from "react";

export default async function Home() {
  let posts: Post[] = [];

  try {
    const data = await axios("https://jsonplaceholder.typicode.com/posts");
    posts = data.data;
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
  return (
    <main className="flex">
      <Navbar page={0} />

      {/* <Searchbar /> */}
      <Suspense fallback={<PageLoader />}>
        <PostGrid posts={posts} />
      </Suspense>
    </main>
    // <PageLoader />
  );
}
