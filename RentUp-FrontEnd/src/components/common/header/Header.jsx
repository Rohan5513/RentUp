import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useUser } from "../UserProvider"; // Import useUser hook from context
import { getNavData } from "../../data/Data"; // Import getNavData function
import { useHistory } from "react-router-dom"; // Import useHistory hook to redirect

const Header = () => {
  const { user, setUser } = useUser(); // Get user and setUser function from context
  const [navList, setNavList] = useState(false);
  const history = useHistory(); // Initialize useHistory hook

  const navData = getNavData(user); // Get navigation data based on user login state

  // Function to handle logout
  const handleLogout = () => {
    // Clear user data
    setUser(null);
    // Redirect to home page
    history.push("/");
    // console.log('from logout');
  };

  console.log(user != null);
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
                    // Render all links when user is not null
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
