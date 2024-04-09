import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

export default function Navbar(props) {
    const navigate = useNavigate();

    const convertToTitleCase = (str) => {
        return str.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    };

    const handleLogout = () => {
        sessionStorage.removeItem('loggedInUser');
        navigate('/');
    };

  return (
    <>
        <div className={`header bg-dark d-flex ${props.loggedInUser? "justify-content-between" : "justify-content-center my-3"} py-3`}>
            <h1 className='ms-3'>ToDo List</h1>
            {props.loggedInUser &&
            <div className="user-nav d-flex me-3">
                <h1 className='me-5'>{convertToTitleCase(props.loggedInUser.role)} - {props.loggedInUser.userName}</h1>
                <button type="button" className="btn btn-light fs-5" onClick={handleLogout}>Logout</button>
            </div>}
        </div>

        {props.loggedInUser &&
        <div className="breadcrumbs-company bg-secondary py-3 mb-3">
            <Breadcrumbs page={props.page} company={props.company}/>
        </div>}
    </>
  )
}