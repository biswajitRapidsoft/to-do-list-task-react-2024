import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Form({ todos, setTodos, setEditTodo, editTodo }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title || "");
    } else {
      setInput("");
    }
  }, [editTodo]);

  function onInputChange(e) {
    setInput(e.target.value);
  }

  const updateTodo = (title, id, completed) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodos);
    setEditTodo("");
  };

  function onFormSubmit(e) {
    e.preventDefault();
    if (!editTodo) {
      if (input.trim()) {
        setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
        setInput("");
      } else {
        alert("input cant be empty");
        setInput("");
      }
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          placeholder="enter todo.."
          className="text-inpit"
          value={input}
          onChange={onInputChange}
          required
        />
        <button className="button-add" type="submit">
          {editTodo ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}
