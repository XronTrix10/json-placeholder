import { type User } from "@/lib/types";
import { User as UserLogo } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserTable = (props: { users: User[] }) => {
  return (
    <section className="w-4/5 mx-auto mt-16">
      <h2 className="text-center my-10 mt-16">All Authors</h2>

      <div className="flex flex-col gap-y-10 px-20 mb-32">
        {props.users.map((user) => (
          <div
            key={user.id}
            className="flex w-full justify-between items-center border border-accent dark:border-light dark:bg-light/70 dark:text-black rounded-2xl p-2 px-4"
          >
            <div className="h-10 w-10 rounded-full bg-accent text-white grid place-content-center">
              <UserLogo size={30} strokeWidth={1.5} />
            </div>
            <p className="text-lg font-bold">{user.name}</p>
            <p>{user.email}</p>
            <p>{user.website}</p>
            <Link
              className="p-2 px-4 bg-accent text-white rounded-full font-bold"
              href={`/users/${user.id}`}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserTable;
