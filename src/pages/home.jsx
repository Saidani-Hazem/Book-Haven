import React from "react";
import MobileDrawer from "../MuiComponents/MobileDrawer";
import "./home.css";
import HomeBooks from "../Components/HomeBooks";
import Footer from "./footer.jsx";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Home = () => {
  const [mode, setmode] = useState(localStorage.getItem("mode"));

  const darkTheme = createTheme({
    palette: {
      mode: mode || 'dark',
      primary: {
        main: '#7B1FA2',
      },
    },
  });
  

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MobileDrawer setmode={setmode}/>
      <div className="savedlabel">
        <HomeIcon fontSize="medium" />
        <h4>Home Page</h4>
      </div>
      <div>
        <HomeBooks />
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default Home;
