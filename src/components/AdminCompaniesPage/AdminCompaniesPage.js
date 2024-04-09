import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import AddCompanyNav from './AddCompanyNav';
import {v4 as uid} from "uuid"
import Company from './Company';
import { useNavigate } from 'react-router-dom';


export default function AdminCompaniesPage() {
  let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  const [companyName, setCompanyName] = useState("");
  const [companyToken, setCompanyToken] = useState("");
  const [allCompanies, setAllCompanies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  },[])
  
  const fetchCompanies = async () => {
    try {
        const response = await fetch("http://localhost:5500/company");
        const data = await response.json();
        
        setAllCompanies(data);
    } catch (error) {
        console.error("Error fetching Company data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName.trim() || !companyToken.trim()) {
        alert("Please fill out all fields");
        return;
    }

    let company = {
      id: `${uid()}`,
      companyName: companyName,
      companyToken: companyToken
    }

    try {
      const response = await fetch("http://localhost:5500/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(company)
      });
  
      if (!response.ok) {
        throw new Error('Failed to add new company');
      }
  
      const data = await response.json();
      setAllCompanies(prevCompanies => [...prevCompanies, data]);
      setCompanyName('');
      setCompanyToken('');
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  const handleDelete = async (id) => {
    let c = window.confirm("Are you sure you want to delete this company?");
    if (c) {
      try {
        const response = await fetch(`http://localhost:5500/company/${id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete company');
        }
  
        const usersResponse = await fetch(`http://localhost:5500/users?companyId=${id}`);
        const usersData = await usersResponse.json();
        for (const user of usersData) {
          await fetch(`http://localhost:5500/users/${user.id}`, {
            method: 'DELETE',
          });
  
          await fetch(`http://localhost:5500/todolist?userId=${user.id}`, {
            method: 'DELETE',
          });
        }
  
        setAllCompanies(prevCompanies => prevCompanies.filter(company => company.id !== id));
      } catch (error) {
        console.error("Error deleting company:", error);
      }
    } else {
      return;
    }
  };
  
  const handleUsers = (company) => {
    navigate(`/admincompanies/adminusers`, { state: company });
  };

  return (
    <>
      <Navbar loggedInUser={loggedInUser} page={[{pageTitle: "Company List", pagePath: "/admincompanies"}]}/>

      <div className="px-3">
        <AddCompanyNav handleSubmit={handleSubmit} companyName={companyName} setCompanyName={setCompanyName} companyToken={companyToken} setCompanyToken={setCompanyToken}/>

        <ul className="list-group">
          {allCompanies.map(company => (
            <Company key={company.id} company={company} handleUsers={() => handleUsers(company)} handleDelete={() => handleDelete(company.id)}/>
          ))}
        </ul>
      </div>
    </>
  )
}