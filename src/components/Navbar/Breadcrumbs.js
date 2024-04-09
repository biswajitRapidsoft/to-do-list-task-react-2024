import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {v4 as uid} from "uuid"

export default function Breadcrumbs(props) {
    let location = useLocation()

    let currentPath = location.pathname;
    let company = "";
    let token = "";

    const crumbs = props.page.map((crumb) => {
        return (
            <div className="crumb me-2" key={uid()}>
                <Link to={crumb.pagePath} className="me-1">{crumb.pageTitle}</Link>
                <i className="fa-solid fa-angle-right"></i>
            </div>
        )
    })

    if (currentPath === "/admincompanies/adminusers") {
        company = props.company.companyName;
        token = props.company.companyToken;
    }

  return (
    <>
        <div className="breadcrumbs text-white d-flex justify-content-between align-items-center mx-3">
            <h5 className="d-flex">{crumbs}</h5>
            {currentPath === "/admincompanies/adminusers" && 
                <h3 className="text-white m-0">{company} - {token}</h3>
            }
        </div>
    </>
  )
}