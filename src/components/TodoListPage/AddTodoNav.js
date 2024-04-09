import React from 'react'

export default function AddTodoNav(props) {
  return (
    <nav className="navbar navbar-expand-lg bg-secondary mb-3 rounded py-3 px-1 fs-5">
        <div className="container-fluid">
            <form className="d-flex justify-content-between w-100" role="search" onSubmit={props.editMode ? props.handleUpdate : props.handleSubmit}>
                <input className="form-control me-2 flex-grow-1 fs-5" type="text" placeholder="Type Your Task Here..." name="text" value={props.text} onChange={(e) => props.setText(e.target.value)}/>
                <input className="me-2 border-0 rounded px-2" style={{width: '228px'}} type="date" name="date" id="date" value={props.date} onChange={(e) => props.setDate(e.target.value)}/>
                <input className="me-2 border-0 rounded px-2" style={{width: '154px'}} type="time" name="time" id="time" value={props.time} onChange={(e) => props.setTime(e.target.value)}/>
                {props.editMode ? (
                    <button className="btn btn-dark fs-5" type="submit">Update</button>
                ) : (
                    <button className="btn btn-dark fs-5" type="submit">Add</button>
                )}
            </form>
        </div>
    </nav>
  )
}