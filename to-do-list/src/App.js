import "./App.css";
import Header from "./component/Header";
import Form from "./component/Form";
import { useEffect, useState } from "react";
import Todolist from "./component/Todolist";

function App() {
  const initialData = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialData);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header />
        </div>
        <div>
          <Form
            input={input}
            setInput={setInput}
            todos={todos}
            setTodos={setTodos}
            setEditTodo={setEditTodo}
            editTodo={editTodo}
          />
        </div>
        <div>
          <Todolist
            todos={todos}
            setTodos={setTodos}
            setEditTodo={setEditTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
