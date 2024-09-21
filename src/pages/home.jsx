import React from 'react';
import MobileDrawer from '../MuiComponents/MobileDrawer';
import "./home.css"
import HomeBooks from"../Components/HomeBooks"
import Footer from "./footer.jsx"

const Home = () => {
    return (
        <>
             <MobileDrawer/>
               <div>
                 <HomeBooks/>
               </div>
               <Footer />
        </>
    );
}

export default Home;
