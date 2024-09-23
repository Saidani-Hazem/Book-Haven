import React from "react";
import "./about.css";
import MobileDrawer from "../MuiComponents/MobileDrawer.jsx";
import Footer from "./footer.jsx";

const About = () => {
  return (
    <>
      <MobileDrawer />

      <div className="divlogo">


        <div>
            <img className="aboutlogo" src="https://img.freepik.com/psd-gratuit/livres-empiles-isoles-fond-transparent_191095-17333.jpg?ga=GA1.1.596290338.1724375721&semt=ais_hybrid" alt="" />
                <h4>Book Haven</h4>
        </div>
<div>
    <p>Welcome to Books Haven! On our website, 
        you can view information about various books,
         including their cover pictures. You can also save your 
         favorite book details. Enjoy exploring and keeping track 
         of your reading journey with us!</p>
</div>


      </div>

      <Footer />
    </>
  );
};

export default About;
