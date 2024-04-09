import React from 'react';

export default function User(props) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white py-3">
        <div className="me-auto">
            <div className="fw-bold d-flex">
                <h4 className='me-2'>{props.user.userName}</h4>
            </div>

            <p className='m-0'><span className='fw-bold'>User Password : </span>{props.user.password}</p>
        </div>
        <div className="comp-btns">
            <button type="button" className="btn btn-light fs-5" onClick={props.handleDelete}>Delete</button>
        </div>
        </li>
  )
}