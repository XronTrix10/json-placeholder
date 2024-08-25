import HeaderClient from "./HeaderClient";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { TOKEN_NAME, JWT_SECRET } from "@/components/constants/cookie";
import { type User } from "@/lib/types";
import axios from "axios";
import { BACKEND_URL } from "./constants/backend";

const Header = async () => {
  let user: User | null = null;
  const cookieStore = cookies();
  const access_token = cookieStore.has(TOKEN_NAME);
  const token = cookieStore.get(TOKEN_NAME);

  if (access_token && token) {
    const { value } = token;
    try {
      const payload = verify(value, JWT_SECRET);
      // Get the name of the user
      if (typeof payload === "string") return;

      const { data } = await axios(`${BACKEND_URL}/users/${payload.id}`);
      user = data;
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <header className="bg-amber-400 w-full absolute top-0 z-50">
      <div className="h-16 flex justify-between items-center w-4/5 mx-auto">
        <h2 className="text-xl font-bold">{`{CRUD} Placeholder`}</h2>
        <HeaderClient user={user} />
      </div>
    </header>
  );
};

export default Header;
