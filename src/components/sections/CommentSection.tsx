"use client";

import { Comment, User } from "@/lib/types";
import AddComment from "@/server/add-comment";
import { Loader2, Lock, User as UserLogo } from "lucide-react";
import { FormEvent, useState } from "react";

const CommentSection = (props: {
  comments: Comment[];
  user: User | null;
  postId: string;
}) => {
  const [loading, setLoading] = useState(false);

  let all_comments = props.comments;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    const formdata = new FormData(event.currentTarget);
    const comment = formdata.get("comment");
    if (typeof comment !== "string" || !props.user) {
      return;
    }

    const new_comment = await AddComment({
      postId: parseInt(props.postId),
      name: props.user?.name,
      email: props.user?.email,
      body: comment,
    });

    console.log(new_comment);

    all_comments.push(new_comment);
    all_comments.reverse();

    setLoading(false);
  };

  return (
    <section className="w-4/5 mx-auto mt-12">
      <h3 className="text-2xl font-bold my-4">Comments</h3>

      <div className="mt-6 mb-10">
        {props.user ? (
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Enter Comment"
              required={true}
              className="p-2 px-4 focus:outline-none bg-lime-200 text-black mr-4 rounded-full w-1/4"
            />
            <button
              disabled={loading}
              type="submit"
              className="flex items-center p-2 px-4 bg-amber-400 rounded-full text-black hover:text-white font-bold hover:font-normal hover:bg-amber-500"
            >
              {loading ? "Working..." : "Add Comment"}
              {loading && <Loader2 className="ml-2 animate-spin" />}
            </button>
          </form>
        ) : (
          <p className="text-amber-600 text-xl font-bold flex items-center">
            Log In to Add Comments
            <Lock className="ml-2" />
          </p>
        )}
      </div>

      {all_comments.map((comment) => (
        <div key={comment.id} className="my-8">
          <div className="flex flex-row gap-4 items-center">
            <div className="h-10 w-10 rounded-full bg-amber-300 grid place-content-center">
              <UserLogo size={30} strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-bold">{comment.name}</p>
              <p className="text-sm mt-1 text-gray-600">{comment.email}</p>
            </div>
          </div>
          <p className="w-3/4 mt-4 ml-6">{comment.body}</p>
        </div>
      ))}
    </section>
  );
};

export default CommentSection;
