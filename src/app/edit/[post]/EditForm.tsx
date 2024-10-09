"use client";

import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UpdatePost } from "@/server/post";
import { type Post } from "@/lib/types";

const EditForm = (props: { post: Post | null }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [postTitle, setPostTitle] = useState<string>(props.post?.title ?? "");
  const [postContent, setPostContent] = useState<string>(
    props.post?.body ?? ""
  );
  const router = useRouter();

  const handleSubmit = async () => {
    if (!props.post || !postTitle || !postContent) return;

    setLoading(true);

    await UpdatePost(
      {
        title: postTitle,
        body: postContent,
      },
      props.post?.id
    );

    setLoading(false);

    router.push(`/posts/${props.post?.id}`);
  };
  return (
    <div className="px-32 mb-36">
      <div className="mx-auto w-full flex flex-col gap-6 my-10">
        <label htmlFor="title" className="text-xl font-bold">
          Enter Post Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required={true}
          className="p-2 px-4 focus:outline-none bg-light text-black mr-4 rounded-full w-full"
        />
      </div>

      <div className="mx-auto w-full flex flex-col gap-6 my-10">
        <label htmlFor="content" className="text-xl font-bold">
          Enter Post Content
        </label>
        <textarea
          name="content"
          id="content"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="p-2 px-4 focus:outline-none bg-light text-black mr-4 rounded-3xl w-full"
          cols={30}
          rows={10}
          required={true}
        ></textarea>
      </div>

      <button
        disabled={loading}
        type="submit"
        onClick={handleSubmit}
        className="flex items-center p-2 load-more px-4 w-fit mx-auto rounded-full font-bold hover:font-normal"
      >
        {loading ? "Updating..." : "Update Post"}
        {loading && <Loader2 className="ml-2 animate-spin" />}
      </button>
    </div>
  );
};

export default EditForm;
