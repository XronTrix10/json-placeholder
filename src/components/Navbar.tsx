"use client";

import Link from "next/link";

const Navbar = (props: { page: number }) => {
  const buttons = ["posts", "photos", "users", "todos"];

  return (
    <nav className="w-full h-10 fixed bottom-8">
      <div className="w-fit px-[6px] py-1 bg-light backdrop-blur-md rounded-full mx-auto flex items-center justify-evenly gap-2">
        {buttons.map((btn, index) => (
          <Link
            className={`capitalize font-bold p-2 px-4 ${
              props.page === index ? "bg-accent text-white" : "text-dark"
            } rounded-full`}
            key={index}
            href={index === 0 ? "/" : `/${buttons[index]}`}
          >
            {btn}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
