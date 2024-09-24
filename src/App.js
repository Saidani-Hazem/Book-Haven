import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Saved from "./pages/saved";
import Search from "./pages/search";
import About from "./pages/about";
import Loader from "./pages/loader.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/saved",
    element: <Saved />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "*",
    element: <Loader/>,
  },
]);

const App = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
