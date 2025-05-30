import React from "react";
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';

function Navbar(){
    return(
        <nav>
            <ul>
                <li><NavLink to="/" className={({isActive})=> isActive?"active-link":" "}>Dashboard</NavLink></li>
                <li><NavLink to="/Bookmark" className={({isActive})=> isActive?"active-link":" "}>Bookmark</NavLink></li>
                <li><NavLink to="/login" className={({isActive})=> isActive?"active-link":" "}>Login</NavLink></li>
                <li><NavLink to="/signup" className={({isActive})=> isActive?"active-link":" "}>Signup</NavLink></li>
                <li><NavLink to="/contact" className={({isActive})=> isActive?"active-link":" "}>Contact</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;