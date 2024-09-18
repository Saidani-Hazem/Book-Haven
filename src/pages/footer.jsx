import React from "react";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import "./footer.css"
const Footer = () => {
  return (
    <>
      <div className="ftrlists">
        <div className="ftrelem">
          <h4>Fiction</h4>
          <h6>Novels</h6>
          <h6>Storytelling</h6>
          <h6>Imagination</h6>
        </div>

        <div className="ftrelem">
          <h4>Science</h4>
          <h6>Discovery</h6>
          <h6>Innovation</h6>
          <h6>Research</h6>
        </div>

        <div className="ftrelem">
          <h4>History</h4>
          <h6>Civilizations</h6>
          <h6>Events</h6>
          <h6>Heritage</h6>
        </div>

        <div className="ftrelem">
          <div>
            <MenuBookIcon/>
          </div>
        </div>
      </div>

      <div className="me">
        <h5>&copy; Developed by Hazem Saidani</h5>
  
</div>

    </>
  );
};

export default Footer;
