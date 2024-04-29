import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDashboardContext } from '../pages/DashboardLayout'
import '../styles/Navbar.css'
function Navbar() {
  const user=localStorage.getItem('name');
    const {logoutUser}=useDashboardContext();
  return (
    <div className='navbar'>
        <NavLink to='/dashboard' className='nav-link'>Home</NavLink>
        <NavLink to='/dashboard/all-employees' className='nav-link'>All Employees</NavLink>
        <div className="name">{user}</div>
        <button className="logout" onClick={logoutUser}>Logout</button>
    </div>
  )
}

export default Navbar