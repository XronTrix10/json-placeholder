import axios from "axios";
import Link from "next/link";
import { type Post, type User, type Comment } from "@/lib/types";
import { MoveLeft } from "lucide-react";
import CommentSection from "@/components/sections/CommentSection";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { TOKEN_NAME, JWT_SECRET } from "@/components/constants/cookie";
import { BACKEND_URL } from "@/components/constants/backend";

const PostPage = async ({ params }: { params: { post: string } }) => {
  let post: Post | null = null;
  let author: User | null = null;
  let comments: Comment[] = [];

  let user: User | null = null;

  const cookieStore = cookies();
  const access_token = cookieStore.has(TOKEN_NAME);
  const token = cookieStore.get(TOKEN_NAME);

  try {
    const { data } = await axios(`${BACKEND_URL}/posts/${params.post}`);
    post = data;
    const res = await axios(`${BACKEND_URL}/comments?postId=${params.post}`);
    comments = res.data;

    if (access_token && token) {
      const { value } = token;

      const payload = verify(value, JWT_SECRET);
      if (typeof payload === "string") return;

      const res_2 = await axios(`${BACKEND_URL}/users/${payload.id}`);
      user = res_2.data;
    }
  } catch (error) {
    console.error(error);
  }

  if (post) {
    try {
      const { data } = await axios(`${BACKEND_URL}/users/${post.userId}`);
      author = data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen">
      <section className="w-4/5 mx-auto mt-12">
        <h2 className="my-4">{post?.title}</h2>
        <p className="mt-8 mb-2">
          By{" "}
          <Link
            className="text-accent font-bold"
            href={`/users/${author?.id}`}
          >
            {author?.name}
          </Link>
        </p>
        <img
          className="my-12 h-[500px] w-[800px]"
          src="https://picsum.photos/800/500"
          alt="Lorem Picsum"
        />
        <p className="w-3/4">{post?.body}</p>
        <div className="h-[1px] w-4/5 bg-dark dark:bg-light mt-12" />
      </section>

      <CommentSection comments={comments} user={user} postId={params.post} />

      <Link
        className="load-more p-2 px-4 rounded-full mx-auto flex w-fit mt-10 mb-24 font-bold"
        href={"/"}
      >
        {" "}
        <MoveLeft className="mr-2" />
        All Posts
      </Link>
    </main>
  );
};

export default PostPage;
