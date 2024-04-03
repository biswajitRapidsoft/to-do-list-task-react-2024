import React from 'react'

export default function ToDo(props) {
    return (
        <div className="accordion-item mb-1 rounded">
            <h2 className="accordion-header">
            <button className="accordion-button collapsed bg-dark text-white rounded fs-5 text-white" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${props.todo.id}`} aria-expanded="false" aria-controls={`#flush-collapse-${props.todo.id}`}>
                Task @{props.todo.id}
            </button>
            </h2>
            <div id={`flush-collapse-${props.todo.id}`} className="accordion-collapse collapse">
                <div className="accordion-body d-flex justify-content-between align-items-center bg-light rounded">
                    <p className={`my-auto fs-4 ${props.todo.completed ? 'text-decoration-line-through text-body-tertiary' : ''}`} style={{width: '60%'}}>Task: {props.todo.text} | To be done at {`${props.todo.time}`} on {`${props.todo.date}`}</p>
                    <div className="todoBtns">
                        <button type="button" className="btn btn-dark edit me-3" onClick={() => props.handleEdit(props.todo.id)}>Edit</button>
                        <button type="button" className="btn btn-dark completed me-3" onClick={() => props.handleComplete(props.todo.id)}>Completed</button>
                        <button type="button" className="btn btn-dark delete" onClick={() => props.handleDelete(props.todo.id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}