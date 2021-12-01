import React from "react";
import { useSiteMetadata } from "hooks";
import "assets/stylesheets/pages/_about.scss";
import Header from "components/Header";

const SecondPage = () => {
  const { companyName, companyUrl, authorName, authorUrl, siteDescription } =
    useSiteMetadata();

  return (
    <div className="aboutContainer">
      <Header />
      <div className="contentBlock">
        <h1>About Us &#38; References</h1>
      </div>
      <div className="contentBlock">
        <h1>Meet The Team</h1>
        <p>Stephen Landaas - Team Leader, UI Design, Leaflet edits, JSX, CSS</p>
        <p>Rebecca Lee ~ Lorem</p>
        <p>Ethan Kamus ~ Lorem</p>
        <p>Ali Hussain ~ Lorem</p>
      </div>
      <div className="contentBlock">
        <h2>Our GitHub Repo</h2>
        <p>Check out the code for the web-app by clicking on the link below!</p>
        <a href={companyUrl} className="link">
          View on Github
        </a>
      </div>
      <div className="contentBlock">
        <h2>COVID-19 Dashboard & Map App Tutorial</h2>
        <p>
          This project is based on a COVID-19 web app tutorial made by Colby
          Fayock. The tutorial can be found by clicking on the link below!
        </p>
        <a
          href="https://www.freecodecamp.org/news/how-to-create-a-coronavirus-covid-19-dashboard-map-app-in-react-with-gatsby-and-leaflet/"
          className="link"
        >
          View Tutorial
        </a>
      </div>
    </div>
  );
};

export default SecondPage;
