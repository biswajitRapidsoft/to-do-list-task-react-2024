import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default function Login(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [user, setUser] = useState([]);
    const [company, setCompany] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUserRole, setLoggedInUserRole] = useState("");

    useEffect(() => {
        fetchUserData();
        fetchCompanyData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:5500/users");
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchCompanyData = async () => {
        try {
            const response = await fetch("http://localhost:5500/company");
            const data = await response.json();
            setCompany(data);
        } catch (error) {
            console.error("Error fetching company data:", error);
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();

        const loggedInUser = user.find((u) => u.userName === userName && u.password === password &&
                (u.role === "super admin" || 
                (u.role === "user" && company.find((c) => c.id === u.companyId && c.companyToken === token)))
        );

        sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        if (loggedInUser) {
            if (loggedInUser.role === "super admin") {
                setIsLoggedIn(true);
                setLoggedInUserRole(loggedInUser.role);
            } else if (loggedInUser.role === "user") {
                setIsLoggedIn(true);
                setLoggedInUserRole(loggedInUser.role);
            }
        } else {
            alert("Invalid credentials or company token mismatch. Please try again.");
        }

        setUserName("");
        setPassword("");
        setToken("");
    };

    if (isLoggedIn) {
        if (loggedInUserRole === "super admin") {
            return <Navigate to="/admincompanies" />
        } else if (loggedInUserRole === "user") {
            return <Navigate to="/usertodolist" />
        }
    }

    let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    
  return (
    <>
       <Navbar loggedInUser={loggedInUser} page={props.page}/>
       <h1 className='text-center' style={{width: "100%"}}>Welcome! Login To Reach Your ToDo List.</h1>

        <div className="container w-50 text-white">
            <form className="border rounded px-5 py-5 bg-secondary" onSubmit={handleSubmit}>
                <div className="form-field mb-3">
                    <label htmlFor="inputUserName" className="form-label me-2"><h4>User Name :</h4></label>
                    <input type="text" className="form-control" id="inputUserName" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <div className="form-field mb-3">
                    <label htmlFor="inputPassword" className="form-label me-2"><h4>Password :</h4></label>
                    <input type="password" className="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-field mb-3">
                    <label htmlFor="inputToken" className="form-label me-2"><h4>Company Token :</h4></label>
                    <input type="text" className="form-control" id="inputToken" value={token} onChange={(e) => setToken(e.target.value)}/>
                </div>

                <div className="loginbtndiv d-flex justify-content-center">
                    <button type="submit" className="btn btn-dark fs-4">Log In</button>
                </div>
            </form>
        </div>
    </>
  )
}