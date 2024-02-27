"use server";

import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { MAX_AGE, TOKEN_NAME, JWT_SECRET } from "@/components/constants/cookie";
import { redirect } from "next/navigation";


const LogIn = async (userId: number) => {
  const token = sign(
    {
      id: userId,
    },
    JWT_SECRET,
    {
      expiresIn: MAX_AGE,
    }
  );

  cookies().set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  redirect("/");
};

export default LogIn;
