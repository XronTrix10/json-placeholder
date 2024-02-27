import Navbar from "@/components/Navbar";
import { Lock } from "lucide-react";

const Todo = () => {
  return (
    <main className="min-h-screen grid place-content-center">
        <Navbar page={3} />
      <h2 className="text-4xl text-amber-600 font-bold flex items-center">
        Login to See Your Todo List <Lock className="ml-5" size={36} strokeWidth={2.5} />
      </h2>
    </main>
  );
};

export default Todo;
