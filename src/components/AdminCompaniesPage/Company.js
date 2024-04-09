import React, { useState, useEffect } from 'react';

export default function Company(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers()
    },[])
    
    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5500/users");
            const data = await response.json();
            
            setUsers(data);
        } catch (error) {
            console.error("Error fetching Users data:", error);
        }
    };

    const filteredUsers = users.filter(user => user.companyId === props.company.id);

    return (
    <li className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white py-3">
      <div className="me-auto">
        <div className="fw-bold d-flex">
            <h4 className='me-2'>{props.company.companyName}</h4>
            <span className="badge text-bg-primary rounded-pill d-flex align-items-center mb-2">{filteredUsers.length}</span>
            </div>
        <p className='m-0'><span className='fw-bold'>Company Token : </span>{props.company.companyToken}</p>
      </div>
      <div className="comp-btns">
        <button type="button" className="btn btn-light fs-5 me-3" onClick={props.handleUsers}>Users</button>
        <button type="button" className="btn btn-light fs-5" onClick={props.handleDelete}>Delete</button>
      </div>
    </li>
  )
}