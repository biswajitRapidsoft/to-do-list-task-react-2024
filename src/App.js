import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LoginPage/Login';
import AdminCompaniesPage from './components/AdminCompaniesPage/AdminCompaniesPage';
import TodoList from './components/TodoListPage/TodoList';
import AdminUsersPage from './components/AdminUsersPage/AdminUsersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login page={[{pageTitle: "Login Page", pagePath: "/"}]}/>} />
        <Route path="/usertodolist" element={<TodoList/>} />
        <Route path="/admincompanies" element={<AdminCompaniesPage/>} />
        <Route path="/admincompanies/adminusers" element={<AdminUsersPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
