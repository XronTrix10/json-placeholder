"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TOKEN_NAME } from "@/components/constants/cookie";

const LogOut = () => {
  cookies().delete(TOKEN_NAME);

  redirect("/");
};

export default LogOut;