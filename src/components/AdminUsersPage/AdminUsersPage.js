import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import {v4 as uid} from "uuid"
import { useLocation } from 'react-router-dom';
import User from './User';
import AddUserNav from './AddUserNav';

export default function AdminUsersPage() {
    let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [allUsers, setAllUsers] = useState([]);

    const { state } = useLocation();

    const company = state;
  
    useEffect(() => {
      fetchUsers();
    });

    const fetchUsers = async () => {
      try {
          const response = await fetch("http://localhost:5500/users");
          const data = await response.json();
          const filteredUsers = data.filter(user => user.companyId === state.id);
          
          setAllUsers(filteredUsers);
      } catch (error) {
          console.error("Error fetching Company data:", error);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!userName.trim() || !password.trim()) {
          alert("Please fill out all fields");
          return;
      }
  
      let user = {
        id: `${uid()}`,
        userName: userName,
        password: password,
        companyId: state.id,
        role: "user"
      }
  
      try {
        const response = await fetch("http://localhost:5500/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        });
    
        if (!response.ok) {
          throw new Error('Failed to add new user');
        }
    
        const data = await response.json();
        setAllUsers(prevUsers => [...prevUsers, data]);
        setUserName('');
        setPassword('');
      } catch (error) {
        console.error("Error adding user:", error);
      }
    };
  
    const handleDelete = async (id) => {
      let c = window.confirm("Are you sure you want to delete this user?");
      if (c) {
        try {
          const response = await fetch(`http://localhost:5500/users/${id}`, {
            method: 'DELETE',
          });
    
          if (!response.ok) {
            throw new Error('Failed to delete user');
          }
    
          setAllUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        } catch (error) {
          console.error("Error deleting company:", error);
        }  
      } else {
        return;
      }
    }
    
  
    return (
      <>
        <Navbar loggedInUser={loggedInUser} page={[{pageTitle: "Company List", pagePath: "/admincompanies"}, {pageTitle: "User List", pagePath: "/admincompanies/adminusers"}]} company= {company}/>
  
        <div className="px-3">
          <AddUserNav handleSubmit={handleSubmit} userName={userName} setUserName={setUserName} password={password} setPassword={setPassword}/>
  
          <ul className="list-group">
            {allUsers.map(user => (
              <User key={user.id} user={user} handleDelete={() => handleDelete(user.id)}/>
            ))}
          </ul>
        </div>
      </>
    )
}