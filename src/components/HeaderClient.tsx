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
import { Loader2, Moon, Sun, SunMoon } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { type User } from "@/lib/types";
import { useTheme } from "next-themes";

const HeaderClient = (props: { user: User | null }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setAppTheme] = useState<string>("system");
  const router = useRouter();
  const { setTheme } = useTheme();

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

  const handleTheme = () => {
    if (theme === "system") {
      setAppTheme("light");
      setTheme("light");
    } else if (theme === "light") {
      setAppTheme("dark");
      setTheme("dark");
    } else {
      setAppTheme("system");
      setTheme("system");
    }
  };

  return (
    <div className="flex justify-center items-center gap-x-4">
      <button onClick={handleTheme} className="dark:text-accent text-white">
        {
          theme === "system" ? <SunMoon /> : theme === "light" ? <Sun /> : <Moon />
        }
      </button>
      {!props.user ? (
        <Dialog>
          <DialogTrigger className="p-2 px-4 rounded-full bg-light dark:bg-accent text-black dark:text-white hover:text-accent font-bold focus:outline-none">
            LogIn
          </DialogTrigger>
          <DialogContent className="text-center sm:rounded-2xl w-fit px-20 py-10">
            <DialogHeader className="mx-auto sm:rounded-2xl">
              <DialogTitle className="text-xl font-bold text-accent dark:text-accent">
                LogIn to{" "}
                <span>{`{CRUD} Placeholder`}</span>
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
                      className="p-2 rounded-full focus:outline-none bg-light text-black"
                    />
                  </div>
                  <div className="w-full">
                    <button
                      disabled={loading}
                      type="submit"
                      className="flex items-center mt-6 p-2 px-4 bg-light dark:bg-accent text-black dark:text-white hover:text-accent rounded-full font-bold"
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
        <div className="flex items-center gap-4 *:font-medium">
          <Link
            className="p-2 px-4 bg-light dark:bg-accent rounded-full text-black dark:text-white hover:text-accent"
            href={`/users/${props.user.id}`}
          >
            My Posts
          </Link>
          <Link
            className="p-2 px-4 bg-light dark:bg-accent rounded-full text-black dark:text-white hover:text-accent"
            href={"/create"}
          >
            Add Post
          </Link>
          <div className="size-10 cursor-pointer rounded-full bg-light dark:bg-accent text-lg grid place-content-center text-black dark:text-white">
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
