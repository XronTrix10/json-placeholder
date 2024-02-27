"use client";

import { Loader2 } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { UpdatePost } from "@/server/post";
import { Post } from "@/lib/types";

const EditForm = (props: { post: Post | null }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!props.post) {
      return;
    }

    setLoading(true);
    const formdata = new FormData(event.currentTarget);
    const title = formdata.get("title");
    const content = formdata.get("content");

    if (typeof title !== "string" || typeof content !== "string") {
      return;
    }

    await UpdatePost(
      {
        title: title,
        body: content,
      },
      props.post?.id
    );

    setLoading(false);

    router.push("/");
  };
  return (
    <form onSubmit={handleSubmit} className="px-32 mb-36">
      <div className="mx-auto w-full flex flex-col gap-6 my-10">
        <label htmlFor="title" className="text-xl font-bold">
          Enter Post Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder={props.post?.title}
          required={true}
          className="p-2 px-4 focus:outline-none bg-lime-200 text-black mr-4 rounded-full w-full"
        />
      </div>

      <div className="mx-auto w-full flex flex-col gap-6 my-10">
        <label htmlFor="content" className="text-xl font-bold">
          Enter Post Content
        </label>
        <textarea
          name="content"
          id="content"
          placeholder={props.post?.body}
          className="p-2 px-4 focus:outline-none bg-lime-200 text-black mr-4 rounded-3xl w-full"
          cols={30}
          rows={10}
          required={true}
        ></textarea>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="flex items-center p-2 px-4 bg-amber-400 w-fit mx-auto rounded-full text-black hover:text-white font-bold hover:font-normal hover:bg-amber-500"
      >
        {loading ? "Updating..." : "Update Post"}
        {loading && <Loader2 className="ml-2 animate-spin" />}
      </button>
    </form>
  );
};

export default EditForm;
