import React from "react";
import './Navbar.css';

function Navbar(){
    return(
        <nav>
            <ul>
                <li><a href="/">Dashboard</a></li>
                <li><a href="/Bookmark">Bookmark</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Signup</a></li>
                <li><a href="/contact">Contact</a></li>
                
            </ul>
        </nav>
    );
}

export default Navbar;