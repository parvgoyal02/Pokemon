import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar(){
    return(
        <nav>
            <ul>
                <li><a href="/">Dashboard</a></li>
                <li><a href="/PokeInfo">Pokeinfo</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Signup</a></li>
                <li><a href="/Bookmark">Bookmark</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;