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
        <p>Stephen Landaas - Team Leader, UI Design, Map Styling, Charts/Graphs</p>
        <p>Rebecca Lee - Additional Map Functionality, Tables, UI Design</p>
        <p>Ethan Kamus - Tables, Map Adjustments</p>
        <p>Ali Hussain - Website markup, Website Styling, UI Design</p>
      </div>
      <div className="contentBlock">
        <h2>Our GitHub Repo</h2>
        <p>Check out the code for the web-app by clicking on the link below!</p>
        <a href={companyUrl} className="link">
          View on Github
        </a>
      </div>
      <div className="contentBlock">
        <h2><u>Our Sources</u></h2>
        <p>
          This project is based on a COVID-19 web app tutorial made by Colby
          Fayock. The tutorial can be found by clicking <a href="https://www.freecodecamp.org/news/how-to-create-a-coronavirus-covid-19-dashboard-map-app-in-react-with-gatsby-and-leaflet/" className="link">Here</a>!
        </p>
        <br/>
        <p>
          We fetched our country data from <a href="https://corona.lmao.ninja/" className="link">Corona.lmao</a>, and our province/state data from <a href="https://disease.sh/docs/" className="link">Disease.sh</a>. Where these API's fetch their data from can be found <a href="https://github.com/disease-sh/api/blob/master/README.md#sources" className="link">Here</a></p>
        <br/>
        <p>
          Map functionality and overall site interactivity can be accredited to the original tutorial, which utilized Gatsby and Leaflet. We also employed MaterialUI for our tables, as well as ChartJS for our graphs/charts.
        </p>
      </div>
    </div>
  );
};

export default SecondPage;
