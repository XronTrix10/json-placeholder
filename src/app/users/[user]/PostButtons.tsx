"use client";

import Link from "next/link";
import { MoveRight, Pencil, Trash2 } from "lucide-react";
import { DeletePost } from "@/server/post";
import { truncateText } from "@/lib/utils";
import { Post } from "@/lib/types";
import { useState } from "react";

const PostButtons = (props: { posts: Post[]; authorIsUser: boolean }) => {
  const [allPosts, setAllPosts] = useState<Post[]>(props.posts);

  const handleDelete = async (id: string | number) => {
    await DeletePost(id);
    const all_posts = allPosts.filter((post) => post.id !== id);
    setAllPosts(all_posts);
    console.log("deleted", id);
  };

  return (
    <div className="grid grid-cols-3 place-content-center gap-x-10 gap-y-14 place-items-center">
      {allPosts.map((post, index) => (
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
              Read
              <MoveRight className="ml-2" />
            </Link>
            {props.authorIsUser && (
              <div className="flex space-x-2">
                <Link
                  className="text-blue-500 font-bold flex items-center gap-2"
                  href={`/edit/${post.id}`}
                >
                  <Pencil size={15} className="ml-2" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-500 font-bold flex items-center gap-2"
                >
                  <Trash2 size={15} className="ml-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostButtons;
