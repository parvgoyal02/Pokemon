import React from "react";
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { useLoginContext } from "../context/logincontext";
import { useNavigate } from "react-router-dom";

function Navbar(){
    const { isLoggedIn, logout } = useLoginContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav>
        <ul>
            <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Dashboard</NavLink>
            </li>
            
            {isLoggedIn ? (
            <>
                <li>
                <button onClick={handleLogout}>Logout</button>
                </li>
            </>
            ) : (
            <>
                <li>
                <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>Login</NavLink>
                </li>
                <li>
                <NavLink to="/signup" className={({ isActive }) => isActive ? "active-link" : ""}>Signup</NavLink>
                </li>
            </>
            )}

            <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contact</NavLink>
            </li>
        </ul>
        </nav>
    );
}
export default Navbar;