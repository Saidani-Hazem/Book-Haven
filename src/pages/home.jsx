import React from 'react';
import MobileDrawer from '../MuiComponents/MobileDrawer';
import "./home.css"
import HomeBooks from"../Components/HomeBooks"


const Home = () => {
    return (
        <>
             <MobileDrawer/>

               <div>
                 <HomeBooks pageid={102}/>
               </div>




        </>
    );
}

export default Home;
