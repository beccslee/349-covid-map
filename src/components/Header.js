import React from "react";
import { Link } from "gatsby";
import { FaAtlas, FaGithub, FaVirus } from "react-icons/fa";
import { useSiteMetadata } from "hooks";
import "assets/stylesheets/components/_header.scss";
const Header = () => {
  const { companyName, companyUrl } = useSiteMetadata();

  return (
    <header>
      <div className="headerContent">
        <p className="teamName">
          <Link to="/"><FaVirus className="virLogo"/> &nbsp;Team Barry COVID Dashboard</Link>
        </p>
        <ul>
          <li>
            <Link to="/about/">About Us / References</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
