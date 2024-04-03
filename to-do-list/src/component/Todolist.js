import React from "react";

export default function Todolist({ todos, setTodos, setEditTodo }) {
  const handleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  const handleEdit = (id) => {
    const findTodo = todos.find((todo) => todo.id === id);
    console.log(findTodo);

    setEditTodo(findTodo);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      {todos.map((todo) => (
        <li className="list-item" key={todo.id}>
          <input
            type="text"
            value={todo.title}
            className={`list ${todo.completed ? "complete" : ""}`}
            onChange={(e) => e.preventDefault()}
          />

          <div>
            <button
              className="button-complete task-buttom"
              onClick={() => handleComplete(todo.id)}
            >
              <i className="fa fa-check-circle"></i>
            </button>
            <button
              className="button-edit task-buttom"
              onClick={() => handleEdit(todo.id)}
            >
              <i className="fa fa-edit"></i>
            </button>
            <button
              className="button-delete task-buttom"
              onClick={() => handleDelete(todo.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </li>
      ))}
    </div>
  );
}
