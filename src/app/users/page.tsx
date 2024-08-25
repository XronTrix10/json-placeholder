import { BACKEND_URL } from "@/components/constants/backend";
import Navbar from "@/components/Navbar";
import UserTable from "@/components/sections/UserTable";
import { type User } from "@/lib/types";
import axios from "axios";

const Users = async () => {
  let users: User[] = [];

  try {
    const { data } = await axios(`${BACKEND_URL}/users`);
    users = data;
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="">
      <Navbar page={2} />

      <UserTable users={users} />
    </main>
  );
};

export default Users;
