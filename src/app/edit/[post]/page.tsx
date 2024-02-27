import Navbar from "@/components/Navbar";
import EditForm from "./EditForm";
import { Post } from "@/lib/types";
import axios from "axios";

const Edit = async ({ params }: { params: { post: string } }) => {
  let post: Post | null = null;

  try {
    const { data } = await axios(
      `https://jsonplaceholder.typicode.com/posts/${params.post}`
    );
    post = data;
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="min-h-screen">
      <Navbar page={0} />

      <section className="w-4/5 mx-auto px-20">
        <h2 className="text-3xl font-bold text-center my-16 mt-12 text-amber-600">
          Update Post
        </h2>
        <EditForm post={post} />
      </section>
    </main>
  );
};

export default Edit;
