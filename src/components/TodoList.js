import React, { useState } from 'react'
import Navbar from './Navbar';
import ToDo from './ToDo';

export default function TodoList() {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [allTodos, setAllTodos] = useState(JSON.parse(localStorage.getItem("ToDoList")) || []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim() || !date || !time) {
        alert("Please fill out all fields");
        return;
    }

    let toDo = {
        id: new Date().getHours() + '-' + new Date().getMinutes() + '-' + new Date().getSeconds(),
        text: text.trim(),
        date: date,
        time: time,
        completed: false
    }

    setAllTodos(prevTodos => {
        let updatedTodos = [...prevTodos, toDo];
        localStorage.setItem("ToDoList", JSON.stringify(updatedTodos));
        return updatedTodos;
    });

    setText('');
    setDate('');
    setTime('');
  };

  const handleDelete = (id) => {
    let storedTodos = JSON.parse(localStorage.getItem("ToDoList"));
    let updatedTodos = storedTodos.filter(todo => todo.id !== id);
    setAllTodos(updatedTodos);
    localStorage.setItem("ToDoList", JSON.stringify(updatedTodos));    
  }

  const handleEdit = (id) => {
    let todoStored = JSON.parse(localStorage.getItem("ToDoList"));
    let todoIndex = todoStored.findIndex((todo) => todo.id === id);
    let todo = todoStored[todoIndex];

    setText(todo.text);
    setDate(todo.date);
    setTime(todo.time);
    setEditMode(true);
    setEditId(id);
  };

  const handleUpdate = () => {
    let todoStored = JSON.parse(localStorage.getItem("ToDoList"));
    let todoIndex = todoStored.findIndex((todo) => todo.id === editId);

    const updatedTodos = [...todoStored];
    updatedTodos[todoIndex] = {
      ...updatedTodos[todoIndex],
      text: text,
      date: date,
      time: time
    };

    setAllTodos(updatedTodos);
    localStorage.setItem("ToDoList", JSON.stringify(updatedTodos));

    setEditMode(false);
    setEditId(null);
    setText('');
    setDate('');
    setTime('');
  };

  const handleComplete = (id) => {
    const updatedTodos = allTodos.map((todo) => {
      if (todo.id === id && todo.completed === false) {
        return {
          ...todo,
          completed: true
        };
      } else if (todo.id === id && todo.completed === true) {
        return {
          ...todo,
          completed: false
        };
      }
      return todo;
    });

    setAllTodos(updatedTodos);
    localStorage.setItem("ToDoList", JSON.stringify(updatedTodos));
  };

  return (
    <>
      <div className="container py-3">
        <div className="header text-center bg-dark rounded py-2 mb-3">
          <h1>ToDo List</h1>
        </div>

        <Navbar editMode={editMode} handleUpdate={handleUpdate} handleSubmit={handleSubmit} text={text} setText={setText} date={date} setDate={setDate} time={time} setTime={setTime}/>

        <div className="accordion accordion-flush" id="accordionFlushExample">
            {allTodos.map((todo) => {
                return (
                  <ToDo  key={todo.id} todo={todo} handleEdit={handleEdit} handleComplete={handleComplete} handleDelete={handleDelete}/>
                )
            })}
        </div>
      </div>
    </>
  )
}