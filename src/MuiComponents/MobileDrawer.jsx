import * as React from "react";
import { Global, useTheme } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import TableRowsRoundedIcon from "@mui/icons-material/TableRowsRounded";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import Typography from "@mui/material/Typography";
import GradeTwoToneIcon from "@mui/icons-material/GradeTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import LightModeIcon from "@mui/icons-material/LightMode";
import InfoIcon from "@mui/icons-material/Info";
import "./MobileDrawer.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "80%",
  backgroundColor: grey[100],
  [theme.breakpoints.up("dark")]: {
    backgroundColor: theme.palette.background.default,
  },
}));

export default function MobileDrawer({window ,setmode}) {
  
  const bgmode = () => {
    return localStorage.getItem("mode") === "light" ? "white" : "#121212";
  };

  const cmode = () => {
    return localStorage.getItem("mode") === "light" ? "black" : "white";
  };

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  const theme = useTheme();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(22% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />



      
      <Box sx={{textAlign: "left", pt: 1, bgcolor:bgmode()}}>
        <IconButton>
          <img
            className="logo"
            src="https://img.freepik.com/psd-gratuit/livres-empiles-isoles-fond-transparent_191095-17333.jpg?ga=GA1.1.596290338.1724375721&semt=ais_hybrid"
            alt=""
          />
          <Typography
            variant="h6"
            style={{
              fontFamily: "Roboto",
              fontSize: 18,
              color:cmode(),
              marginLeft:2
            }}
          >
            Book Haven
          </Typography>
        </IconButton>

        <IconButton onClick={toggleDrawer(true)} sx={{ float: "right", mr: 1 }}>
          <TableRowsRoundedIcon fontSize="large" />
        </IconButton>
      </Box>

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <IconButton aria-label="">
          <LocalLibraryIcon />
        </IconButton>

        <div className="navitems">
          <Link to="/saved">
            <IconButton aria-label="">
              <p>saved</p>
              <GradeTwoToneIcon fontSize="medium" />
            </IconButton>
          </Link>

          <Link to="/search">
            <IconButton aria-label="">
              <p>search</p>
              <SearchTwoToneIcon fontSize="medium" />
            </IconButton>
          </Link>

          <Link to="/">
            <IconButton aria-label="">
              <p>Home</p>
              <HomeIcon fontSize="medium" />
            </IconButton>
          </Link>

          <IconButton aria-label="" onClick={() => {
              localStorage.setItem("mode" , theme.palette.mode === "light" ? "dark" :"light")
              setmode(theme.palette.mode === "light" ? "dark" :"light");
            }}> 
            <p>
              Mode
            </p>
            <LightModeIcon fontSize="medium" />
          </IconButton>

          <Link to="/about">
            <IconButton aria-label="">
              <p>About</p>
              <InfoIcon fontSize="medium" />
            </IconButton>
          </Link>
        </div>
      </SwipeableDrawer>
    </Root>
  );
}
