import React from "react";
import "./footer.css"; // Make sure to adjust the CSS file name if needed
import { footer, getNavData, socialMediaLinks } from "../../data/Data";
import { useUser } from "../UserProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Footer = () => {

  const { user, setUser } = useUser();
  const navData = getNavData(user); // Get navigation data based on user login state
  const history = useHistory(); 

  // Function to handle logout
  const handleLogout = () => {
    // Clear user data
    setUser(null);
    // Redirect to home page
    history.push("/");
  };
  return (
    <>
      <section className="footerContact">
        {/* Contact section */}
      </section>

      <footer>
        <div className="container">
          <div className="box">
            {/* Newsletter subscription */}
          </div>

          {/* Footer navigation */}
          <div className="box right-aligned">
            <ul>
              {navData.map((item, index) => (
                <li key={index}>
                  {item.path === "/logout" ? (
                    <Link to={item.path} onClick={handleLogout} style={{ color: 'white' }}>
                      {item.text}
                    </Link>
                  ) : user != null ? (
                    // Render all links when user is not null
                    <Link to={item.path} style={{ color: 'white' }}>{item.text}</Link>
                  ) : item.path !== "/property" ? (
                    // Render all links except /add when user is null
                    <Link to={item.path} style={{ color: 'white' }}>{item.text}</Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          {/* Social media links */}
          <div className="box">
            <h3>SOCIAL MEDIA</h3>
            <ul className="social-media-list">
              {socialMediaLinks.map((socialMedia, index) => (
                <li key={index}>
                  <a href={socialMedia.link} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                    {socialMedia.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

      {/* Legal information */}
      <div className="legal">
        <span style={{ color: 'white' }}>© {new Date().getFullYear()} Rental Property Management System. Designed By YourCompany.</span>
      </div>
    </>
  );
};

export default Footer;
