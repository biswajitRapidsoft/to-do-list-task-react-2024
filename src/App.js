// import "./App.css";
import Login from "./component/login/Login"; // Assuming the path is correct
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./component/admin/AdminPage";
import UserPage from "./component/user/UserPage";
import Adminuserpage from "./component/admin/users/Adminuserpage";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin/adminusers" element={<Adminuserpage />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
