import React, { useState, useEffect } from 'react'
import AddTodoNav from './AddTodoNav';
import ToDo from './ToDo';
import {v4 as uid} from "uuid"
import Navbar from '../Navbar/Navbar';

export default function TodoList() {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [allTodos, setAllTodos] = useState([]);

  let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  useEffect(() => {
    fetchTodoList()
  })
  
  const fetchTodoList = async () => {
    try {
        const response = await fetch("http://localhost:5500/todolist");
        const data = await response.json();
        let filteredData = data.filter((d) => d.userId === loggedInUser.id)
        
        setAllTodos(filteredData);
    } catch (error) {
        console.error("Error fetching todo data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() || !date || !time) {
        alert("Please fill out all fields");
        return;
    }

    let toDo = {
      id: `task${uid()}`,
      text: text.trim(),
      date: date,
      time: time,
      userId: loggedInUser.id,
      completed: false
    }

    try {
      const response = await fetch("http://localhost:5500/todolist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(toDo)
      });
  
      if (!response.ok) {
        throw new Error('Failed to add new todo');
      }
  
      const data = await response.json();
      setAllTodos(prevTodos => [...prevTodos, data]);
      setText('');
      setDate('');
      setTime('');
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDelete = async (id) => {
    let c = window.confirm("Are you sure you want to delete this task?");
    if (c) {
      try {
        const response = await fetch(`http://localhost:5500/todolist/${id}`, {
          method: 'DELETE',
        });
    
        if (!response.ok) {
          throw new Error('Failed to delete todo');
        }
    
        setAllTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    } else {
      return;
    }
  };
  

  const handleEdit = (id) => {
    const todoToUpdate = allTodos.find(todo => todo.id === id);
    if (!todoToUpdate) {
      console.error("Todo not found");
      return;
    }

    console.log(todoToUpdate.date)
  
    setText(todoToUpdate.text);
    setDate(todoToUpdate.date);
    setTime(todoToUpdate.time);
    setEditMode(true);
    setEditId(id);
  };

  const handleUpdate = async () => {
    if (!editId) {
      console.error("Edit ID not found");
      return;
    }

    const todoToUpdate = allTodos.find(todo => todo.id === editId);
  
    const updatedTodo = {
      ...todoToUpdate,
      text: text.trim(),
      date: date,
      time: time
    };
  
    try {
      const response = await fetch(`http://localhost:5500/todolist/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTodo)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
  
      const updatedTodoItem = await response.json();
      setAllTodos(prevTodos => prevTodos.map(todo => {
        if (todo.id === editId) {
          return updatedTodoItem;
        } else {
          return todo;
        }
      }));
  
      setEditMode(false);
      setEditId(null);
      setText('');
      setDate('');
      setTime('');
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleComplete = async (id) => {
    const todoToUpdate = allTodos.find(todo => todo.id === id);
    if (!todoToUpdate) {
      console.error("Todo not found");
      return;
    }

    const updatedTodo = {
      ...todoToUpdate,
      completed: !todoToUpdate.completed
    };

    try {
      const response = await fetch (`http://localhost:5500/todolist/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTodo)
      });

      if (!response.ok) {
        throw new Error('Failed to update completed field');
      }

      setAllTodos(prevTodos => prevTodos.map(todo => {
        if (todo.id === id) {
          return updatedTodo;
        } else {
          return todo;
        }
      }));
    } 
    
    catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <>
      <Navbar loggedInUser={loggedInUser} page={[{pageTitle: "To Do List", pagePath: "/usertodolist"}]}/>

      <div className="px-3 py-3">
        <AddTodoNav editMode={editMode} handleUpdate={handleUpdate} handleSubmit={handleSubmit} text={text} setText={setText} date={date} setDate={setDate} time={time} setTime={setTime}/>

        <div className="accordion accordion-flush" id="accordionFlushExample">
            {allTodos.map((todo) => {
                return (
                  <ToDo key={todo.id} todo={todo} handleEdit={handleEdit} handleComplete={handleComplete} handleDelete={handleDelete}/>
                )
            })}
        </div>
      </div>
    </>
  )
}