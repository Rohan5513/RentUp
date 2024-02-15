import React from "react";
import Back from "../common/Back";
import Heading from "../common/Heading";
import img from "../images/about.jpg";
import "./about.css";
import { teamMembers } from "../data/Data";

const About = () => {
  

  return (
    <>
      <section className="about">
        <Back name="About Us" title="About Us - Who We Are?" cover={img} />
        <div className="container flex mtop">
          <div className="left row">
            <Heading title="Our Agency Story" subtitle="Check out our company story and work process" />

            {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
            </p>
            <button className="btn2">More About Us</button>
          </div> */}
          <div className="right row">
            {/* Render details of team members */}
              {teamMembers.map((member, index) => (
              <p>
              <div key={index} className="team-member">
                <img src={member.profilePicture} alt={member.name} />
                <h3>{member.name}</h3>
                <p>PRN: {member.prn}</p>
                <p>College: {member.college}</p>
                  </div>
                  </p>
            ))}
          </div>
          </div>
          </div>
      </section>
    </>
  );
};

export default About;
