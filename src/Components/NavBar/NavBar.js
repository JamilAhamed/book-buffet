import React from 'react';
import  "./NavBar.css"
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <nav className="navbar">
                <NavLink to="/home" className="navbar-logo">
                    Book Buffet
                </NavLink>
          <ul className={'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-links">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/order" className="nav-links">Order</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-links">Admin</Link>
            </li>
          </ul>
        </nav>
        </div>
    );
};

export default NavBar;