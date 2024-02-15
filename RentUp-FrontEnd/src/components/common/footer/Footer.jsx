import React from "react";
import "./footer.css"; // Make sure to adjust the CSS file name if needed
import { footer, socialMediaLinks } from "../../data/Data";

const Footer = () => {
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
          {footer.map((val, index) => (
            <div className="box" key={index}>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items, idx) => (
                  <li key={idx}>{items.list}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social media links */}
          <div className="box">
            <h3>SOCIAL MEDIA</h3>
            <ul className="social-media-list">
              {socialMediaLinks.map((socialMedia, index) => (
                <li key={index}>
                  <a href={socialMedia.link} target="_blank" rel="noopener noreferrer">
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
        <span>© {new Date().getFullYear()} Rental Property Management System. Designed By YourCompany.</span>
      </div>
    </>
  );
};

export default Footer;
