import React from 'react'

export default function AddCompanyNav(props) {
  return (
    <nav className="navbar navbar-expand-lg bg-secondary mb-3 rounded py-3 px-1 fs-5">
        <div className="container-fluid">
            <form className="d-flex justify-content-between w-100" role="search" onSubmit={props.handleSubmit}>
                <input className="form-control me-2 flex-grow-1 fs-5" type="text" placeholder="Enter Company Name Here..." name="companyName" value={props.companyName} onChange={(e) => props.setCompanyName(e.target.value)}/>
                <input className="form-control me-2 flex-grow-1 fs-5" type="text" placeholder="Enter Company Token Here..." name="companyToken" value={props.companyToken} onChange={(e) => props.setCompanyToken(e.target.value)}/>
                
                <button className="btn btn-dark fs-5" type="submit">Add</button>
            </form>
        </div>
    </nav>
  )
}
