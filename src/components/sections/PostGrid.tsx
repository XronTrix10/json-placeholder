"use client";

import Link from "next/link";
import { useState } from "react";
import { type Post } from "@/lib/types";
import { MoveRight } from "lucide-react";
import { truncateText } from "@/lib/utils";

const PostGrid = (props: { posts: Post[] }) => {
  const allPosts = props.posts;
  const last3Posts: Post[] = allPosts.slice(-3);
  const [displayedPosts, setDisplayedPosts] = useState<number>(9);

  return (
    <section className="w-4/5 mx-auto">
      <div className="my-8">
        <h2 className="text-3xl font-bold text-center my-10 mt-16 text-amber-600">
          Latest Posts
        </h2>

        <div className="flex flex-row gap-10 justify-evenly">
          {last3Posts.map((post, index) => (
            <div key={index} className="flex flex-col justify-between w-72">
              <h2 className="font-semibold text-xl mb-6 text-center">
                {truncateText(post.title, 4)}
              </h2>
              <p className="text-md">{truncateText(post.body, 10)}...</p>
              <div className="mt-4 flex justify-between items-center">
                <Link
                  href={`/posts/${post.id}`}
                  className="text-amber-500 font-bold flex"
                >
                  Read More
                  <MoveRight className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[1px] w-4/5 bg-black my-16 mx-auto"></div>

      <div className="mx-auto">
        <h2 className="text-3xl font-bold text-center my-16 mt-12 text-amber-600">
          Trending Posts
        </h2>

        <div className="grid grid-cols-3 place-content-center gap-x-10 gap-y-14 place-items-center">
          {allPosts.slice(0, displayedPosts).map((post, index) => (
            <div key={index} className="max-w-72 flex flex-col justify-between">
              <h2 className="font-semibold text-xl mb-6 text-center">
                {truncateText(post.title, 4)}
              </h2>
              <p className="text-md">{truncateText(post.body, 10)}...</p>
              <div className="mt-4 flex justify-between items-center">
                <Link
                  href={`/posts/${post.id}`}
                  className="text-amber-500 font-bold flex"
                >
                  Read More
                  <MoveRight className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-fit mx-auto mt-12 mb-44">
        <button
          onClick={() => {
            setDisplayedPosts(displayedPosts + 3);
          }}
          className="p-2 px-4 bg-amber-400 rounded-full mx-auto hover:text-white font-bold hover:font-normal hover:bg-amber-500"
        >
          Load More
        </button>
      </div>
    </section>
  );
};

export default PostGrid;
