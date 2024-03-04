import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useUser } from "../UserProvider"; 
import { getNavData } from "../../data/Data"; 
import { useHistory } from "react-router-dom"; 

const Header = () => {
  const { user, setUser } = useUser(); 
  const [navList, setNavList] = useState(false);
  const history = useHistory(); 

  const navData = getNavData(user); 

  const handleLogout = () => {
    localStorage.removeItem('user');
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
              {navData.map((item, index) => (
                <li key={index}>
                  {item.path === "/logout" ? (
                    <Link to={item.path} onClick={handleLogout}>
                      {item.text}
                    </Link>
                  ) : user != null ? (
                    <>
                      <Link to={item.path}>{item.text}</Link>
                      {item.path === "/add" && (
                        <Link to="/ListedProperty">Show Listed Property</Link>
                      )}
                      {item.path === "/property" && (
                        <Link to="/ListedProperty">Show Listed Property</Link>
                      )}
                    </>
                  ) : item.path !== "/property" ? (
                    // Render all links except /add when user is null
                    <Link to={item.path}>{item.text}</Link>
                  ) : null}
                </li>
              ))}
            </ul>
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
