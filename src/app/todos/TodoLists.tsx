"use client";

import { useState } from "react";
import { type Todo } from "@/lib/types";
import { Trash2 } from "lucide-react";

const TodoLists = (props: { todoList: Todo[] }) => {
  const [list, setList] = useState<Todo[]>(props.todoList);

  const handleCheck = (id: number) => {
    const updatedList = list.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setList(updatedList);
  };

  const handleDelete = (id: number) => {
    const updatedList = list.filter((todo) => todo.id !== id);
    setList(updatedList);
  };

  return (
    <div className="flex flex-col gap-6">
      {list.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between py-3 px-5 border border-amber-400 bg-gradient-to-r from-amber-200 via-gray-400 to-amber-100 rounded-full"
        >
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              onClick={() => handleCheck(todo.id)}
              checked={todo.completed}
            />
            <h5 className="text-xl font-bold">{todo.title}</h5>
          </div>
          <button onClick={() => handleDelete(todo.id)}>
            <Trash2 size={18} className="ml-2 text-red-600" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoLists;
