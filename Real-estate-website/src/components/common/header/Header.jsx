import React, { useState } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link } from "react-router-dom";
import { useUser } from "../UserProvider"; // Import useUser hook from context
import { useHistory } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useUser(); // Get user and setUser function from context
  const [navList, setNavList] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    // Clear user data on logout
    setUser(null);
    history.push("/");
  };

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <img src="./images/logo.png" alt="" />
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="button flex">
            {user ? (
              // If user is logged in, show profile and logout buttons
              <>
                <button className="btn1">
                  <Link to="/profile">Profile</Link>
                </button>
                <button className="btn1" onClick={handleLogout}>
                 <Link to="/">Log Out</Link>
                </button>
              </>
            ) : (
              // If user is not logged in, show login and signup links
              <>
                <button className="btn1">
                  <Link to="/login">Login</Link>
                </button>
                <button className="btn1">
                  <Link to="/signup">Signup</Link>
                </button>
              </>
            )}
          </div>

          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
