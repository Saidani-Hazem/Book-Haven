import React from 'react';
import MobileDrawer from '../MuiComponents/MobileDrawer';
import "./home.css"
import HomeBooks from"../Components/HomeBooks"
import Footer from "./footer.jsx"
import HomeIcon from '@mui/icons-material/Home';
const Home = () => {
    return (
        <>
             <MobileDrawer/>
             <div className="savedlabel">
            <HomeIcon fontSize="medium"/>
            <h4>Home Page</h4>
                </div>
               <div>
                 <HomeBooks/>
               </div>
               <Footer />
        </>
    );
}

export default Home;
