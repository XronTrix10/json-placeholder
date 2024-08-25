"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LogIn from "@/server/login";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { type User } from "@/lib/types";

const HeaderClient = (props: { user: User | null }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formdata = new FormData(event.currentTarget);
    const id = formdata.get("id");
    if (typeof id !== "string") {
      return;
    }
    await LogIn(parseInt(id));

    setLoading(false);

    router.refresh();
  };

  return (
    <div className="flex justify-center items-center">
      {!props.user ? (
        <Dialog>
          <DialogTrigger className="p-2 px-4 rounded-full bg-white font-bold focus:outline-none">
            LogIn
          </DialogTrigger>
          <DialogContent className="text-center sm:rounded-2xl w-fit px-20 py-10">
            <DialogHeader className="mx-auto sm:rounded-2xl">
              <DialogTitle className="text-xl font-bold">
                LogIn to{" "}
                <span className="text-amber-500">{`{CRUD} Placeholder`}</span>
              </DialogTitle>
              <DialogDescription>
                <form onSubmit={handleLogin}>
                  <div className="flex flex-col mt-6">
                    <label htmlFor="userId" className="my-4 text-black text-lg">
                      Enter Your User Id
                    </label>
                    <input
                      id="userId"
                      name="id"
                      type="number"
                      min={1}
                      max={10}
                      required={true}
                      placeholder="Enter Between 1 and 10"
                      className="p-2 rounded-full focus:outline-none bg-lime-100 text-black"
                    />
                  </div>
                  <div className="w-full">
                    <button
                      disabled={loading}
                      type="submit"
                      className="flex items-center mt-6 p-2 px-4 bg-amber-400 rounded-full text-black mx-auto hover:text-white font-bold hover:font-normal hover:bg-amber-500"
                    >
                      {loading ? "Loggin..." : "LogIn"}
                      {loading && <Loader2 className="ml-2 animate-spin" />}
                    </button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            className="p-2 px-4 bg-white rounded-full text-black font-bold hover:text-amber-500"
            href={`/users/${props.user.id}`}
          >
            My Posts
          </Link>
          <Link
            className="p-2 px-4 bg-white rounded-full text-black font-bold hover:text-amber-500"
            href={"/create"}
          >
            Add Post
          </Link>
          <div className="h-10 w-10 rounded-full bg-white font-bold text-xl grid place-content-center text-amber-600">
            {props.user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderClient;
