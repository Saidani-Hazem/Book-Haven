import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import "./App.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Saved from "./pages/saved";
import Search from "./pages/search";
import About from "./pages/about";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/saved",
    element: <Saved/>,
  },
  {
    path: "/search",
    element: <Search/>,
  },
  {
    path: "/about",
    element: <About/>,
  },
]);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

);

reportWebVitals();
