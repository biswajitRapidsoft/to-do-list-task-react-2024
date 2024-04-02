import React, { useState } from 'react'

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
        <div className="container">
            <nav className="navbar navbar-expand-lg bg-secondary mb-3 rounded">
                <div className="container-fluid">
                    <form className="d-flex justify-content-between w-100" role="search" onSubmit={editMode ? handleUpdate : handleSubmit}>
                        <input className="form-control me-2 flex-grow-1" type="text" placeholder="Type Here..." value={text} onChange={(e) => setText(e.target.value)}/>
                        <input className="me-2 border-0 rounded px-2" style={{width: '175px'}} type="date" name="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                        <input className="me-2 border-0 rounded px-2" style={{width: '123px'}} type="time" name="time" id="time" value={time} onChange={(e) => setTime(e.target.value)}/>
                        {editMode ? (
                            <button className="btn btn-dark" type="submit">Update</button>
                        ) : (
                            <button className="btn btn-dark" type="submit">Add</button>
                        )}
                    </form>
                </div>
            </nav>

            <div className="accordion accordion-flush" id="accordionFlushExample">
                {allTodos.map((todo) => {
                    return (
                        <div className="accordion-item" key={todo.id}>
                            <h2 className="accordion-header">
                            <button className="accordion-button collapsed bg-secondary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${todo.id}`} aria-expanded="false" aria-controls={`#flush-collapse-${todo.id}`}>
                                Task @{todo.id}
                            </button>
                            </h2>
                            <div id={`flush-collapse-${todo.id}`} className="accordion-collapse collapse">
                                <div className="accordion-body d-flex justify-content-between align-items-center bg-light">
                                    <p className={`my-auto ${todo.completed ? 'text-decoration-line-through text-body-tertiary' : ''}`} style={{width: '60%'}}>Task: {todo.text} to be done at {`${todo.time}`} on {`${todo.date}`}</p>
                                    <div className="todoBtns">
                                        <button type="button" className="btn btn-dark edit me-3" onClick={() => handleEdit(todo.id)}>Edit</button>
                                        <button type="button" className="btn btn-dark completed me-3" onClick={() => handleComplete(todo.id)}>Completed</button>
                                        <button type="button" className="btn btn-dark delete" onClick={() => handleDelete(todo.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </>
  )
}