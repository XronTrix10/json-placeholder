"use client";

import Navbar from "@/components/Navbar";
import { Loader2 } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import CreatePost from "@/server/post";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    const formdata = new FormData(event.currentTarget);
    const title = formdata.get("title");
    const content = formdata.get("content");

    if (typeof title !== "string" || typeof content !== "string") {
      return;
    }

    await CreatePost({
      title,
      body: content,
    });

    setLoading(false);

    router.push("/");
  };

  return (
    <main className="min-h-screen">
      <Navbar page={0} />

      <section className="w-4/5 mx-auto px-20">
        <h2 className="text-3xl font-bold text-center my-16 mt-12 text-amber-600">
          Create Post
        </h2>
        <form onSubmit={handleSubmit} className="px-32 mb-36">
          <div className="mx-auto w-full flex flex-col gap-6 my-10">
            <label htmlFor="title" className="text-xl font-bold">
              Enter Post Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter Post Title"
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
              placeholder="Enter Post Content"
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
            {loading ? "Creating..." : "+ Create Post"}
            {loading && <Loader2 className="ml-2 animate-spin" />}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Create;
