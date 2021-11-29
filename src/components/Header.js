import React from "react";
import { Link } from "gatsby";
import { FaGithub } from "react-icons/fa";
import { useSiteMetadata } from "hooks";
import "assets/stylesheets/components/_header.scss";
const Header = () => {
  const { companyName, companyUrl } = useSiteMetadata();

  return (
    <header>
      <div className="headerContent">
        <p className="teamName">
          <Link to="/">Team Barry COVID Dashboard</Link>
        </p>
        <ul>
          <li>
            <Link to="/about/">About</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
