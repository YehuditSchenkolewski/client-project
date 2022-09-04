import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const linkNav = (linkTo, LinkText) => {
    return (
      <li className="nav-item">
        <Link to={linkTo} className="nav-link">
          {LinkText}
        </Link>
      </li>
    )
  }

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <ul>
        {isLoggedIn ? (
          <div className="navbar-nav ml-auto">
            {linkNav("/info", "Info")}
            {linkNav("/logOut", "LogOut")}
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            {linkNav("/login", "Login")}
          </div>
        )}
      </ul>
    </nav>
  )
}