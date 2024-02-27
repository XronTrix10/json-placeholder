import Navbar from "@/components/Navbar";
import { Post, User } from "@/lib/types";
import { truncateText } from "@/lib/utils";
import axios from "axios";
import { MoveRight, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { TOKEN_NAME, JWT_SECRET } from "@/components/constants/cookie";
import { DeletePost } from "@/server/post";

const page = async ({ params }: { params: { user: string } }) => {
  let user: User | null = null;
  let posts: Post[] = [];
  let authorIsUser = false;

  const cookieStore = cookies();
  const access_token = cookieStore.has(TOKEN_NAME);
  const token = cookieStore.get(TOKEN_NAME);

  if (access_token && token) {
    const { value } = token;
    try {
      const payload = verify(value, JWT_SECRET);
      if (typeof payload === "string") return;
      if (payload.id == params.user) {
        authorIsUser = true;
      }
    } catch (e) {
      console.error(e);
    }
  }

  try {
    const { data } = await axios(
      `https://jsonplaceholder.typicode.com/users/${params.user}`
    );
    const res = await axios(
      `https://jsonplaceholder.typicode.com/posts?userId=${params.user}`
    );
    user = data;
    posts = res.data;
  } catch (error) {
    console.error(error);
  }

  const handleDelete = async (id: string | number) => {
    await DeletePost(id);
  };

  return (
    <main>
      <Navbar page={2} />
      <section className="w-1/2 mx-auto mt-12 px-12">
        <div className="flex items-center justify-between">
          <img
            width={300}
            className="mr-3 rounded-full"
            src={"/user.png"}
            alt="person"
          />
          <div>
            <h4 className="text-2xl font-bold text-amber-500"> {user?.name}</h4>
            <span> {user?.username}</span>

            <ul className="mt-6">
              <li>
                <b className="font-bold">Email: </b> {user?.email}
              </li>
              <li>
                <b className="font-bold">Phone: </b> {user?.phone}
              </li>
              <li>
                <b className="font-bold">Webaite: </b> {user?.website}
              </li>
              <li>
                <b className="font-bold">Company Name: </b> {user?.company.name}
              </li>
            </ul>
            <div className="mt-4">
              <b className="font-bold">Address: </b>
              {user?.address.city}
              {user?.address.suite}
              <br></br>
              {user?.address.street}
              {user?.address.zipcode}
            </div>
          </div>
        </div>
      </section>

      <section className="w-4/5 mx-auto mt-24 mb-36">
        <h2 className="text-3xl font-bold text-center mb-20 mt-12 text-amber-600">
          All Posts By {user?.name}
        </h2>
        <div className="grid grid-cols-3 place-content-center gap-x-10 gap-y-14 place-items-center">
          {posts.map((post, index) => (
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
                {authorIsUser && (
                  <div className="flex space-x-2">
                    <Link
                      className="text-blue-500 font-bold flex items-center gap-2"
                      href={`/edit/${post.id}`}
                    >
                      <Pencil size={15} className="ml-2" />
                      Edit
                    </Link>
                    <button
                      // onClick={() => handleDelete(post.id)}
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
      </section>
    </main>
  );
};

export default page;
