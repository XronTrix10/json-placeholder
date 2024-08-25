import Navbar from "@/components/Navbar";
import { type Todo } from "@/lib/types";
import { Lock } from "lucide-react";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { TOKEN_NAME, JWT_SECRET } from "@/components/constants/cookie";
import axios from "axios";
import TodoLists from "./TodoLists";

const TodoPage = async () => {
  let todoList: Todo[] = [];
  let isLoggedIn = false;

  const cookieStore = cookies();
  const access_token = cookieStore.has(TOKEN_NAME);
  const token = cookieStore.get(TOKEN_NAME);

  if (access_token && token) {
    const { value } = token;
    try {
      const payload = verify(value, JWT_SECRET);
      if (typeof payload === "string") return;
      isLoggedIn = true;
      const { data } = await axios(
        `https://jsonplaceholder.typicode.com/todos?userId=${payload.id}`
      );
      todoList = data;
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar page={3} />
      {isLoggedIn ? (
        <section className="w-4/5 mx-auto px-28 mb-32">
          <h2 className="text-3xl font-bold text-center mb-20 mt-12 text-amber-600">
            Your TodoLists
          </h2>

         <TodoLists todoList={todoList} />
        </section>
      ) : (
        <div className="h-[90vh] w-full grid place-content-center">
          <h2 className="text-4xl text-amber-600 font-bold flex items-center">
            Login to See Your Todo List{" "}
            <Lock className="ml-5" size={36} strokeWidth={2.5} />
          </h2>
        </div>
      )}
    </main>
  );
};

export default TodoPage;
