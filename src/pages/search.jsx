import React, { useState, useEffect, useCallback } from "react";
import MobileDrawer from "../MuiComponents/MobileDrawer";
import Footer from "./footer";
import "./search.css";
import "../Components/HomeBooks.css";
import axios from "axios";
import Card from "@mui/material/Card";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import Button from "@mui/material/Button";
import MuiModal from "../MuiComponents/MuiModal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Search = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [Value, SetValue] = useState("");
  const [open, setOpen] = useState(false);
  const [bookid, setBookid] = useState();
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState(1);

  const handleChange = (event) => {
    setArea(event.target.value);
  };

  const fetchAllBooks = useCallback(async () => {
    setLoading(true);
    const result = [];

    try {
      for (let page = area; page <= area + 10; page++) {
        const response = await axios.get(
          `https://gutendex.com/books/?page=${page}`
        );
        console.log(`fetch ${page}`);
        result.push(...response.data.results);
      }
      setAllBooks(result);
      setFilteredBooks(result);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }, [area]);

  useEffect(() => {
    fetchAllBooks();
  }, [fetchAllBooks]);

  const handleSearch = (searchValue) => {
    const upperCaseSearchValue = searchValue.toUpperCase();
    if (!upperCaseSearchValue) {
      setFilteredBooks(allBooks);
    } else {
      const filteredResults = allBooks.filter((book) =>
        book.title.toUpperCase().includes(upperCaseSearchValue)
      );
      setFilteredBooks(filteredResults);
    }
  };

  const booksRender = () => {
    if (filteredBooks.length === 0) {
      return false;
    }

    return filteredBooks.slice(1, 17).map((book) => (
      <Card key={book.id} className="book" sx={{ mt: 2 }}>
        <div className="bookimg">
          <img
            src={
              book.formats && book.formats["image/jpeg"]
                ? book.formats["image/jpeg"]
                : "https://i.imgur.com/J5LVHEL.jpg"
            }
            loading="lazy"
            alt="Book cover"
          />
        </div>
        <CardContent sx={{ padding: 1 }}>
          <Typography variant="h5" component="div">
            <h6>{book.title.substring(0, 30)}</h6>
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {book.subjects[0]?.substring(0, 32)}
          </Typography>
          <Typography variant="body2" className="mobileinfos">
            <PersonTwoToneIcon sx={{ justifyContent: "center", mr: 1 }} color="primary" fontSize="small" />
            {book.authors?.[0]?.name || "Unknown Author"}
          </Typography>
          <div className="langauth">
            <div>
              <Typography variant="body2" className="mobileinfos">
                <LanguageIcon sx={{ justifyContent: "center", mr: 1 }} color="primary" fontSize="small" />
                {book.languages}
              </Typography>
            </div>
            <div>
              <Button
                sx={{ float: "left" }}
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => {
                  setBookid(book.id);
                  setOpen(true);
                }}
              >
                More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  };

  const valueChange = (eo) => {
    SetValue(eo.target.value);
    handleSearch(eo.target.value);
  };

  return (
    <>
      <MobileDrawer />
      <div>
        <div className="inptsearch">
        <form className="form">
            <label htmlFor="search">
              <input
                className="input"
                type="text"
                required
                placeholder="Search By Book Name"
                id="search"
                value={Value}
                onChange={valueChange}
              />

              <div className="fancy-bg" />
              <div className="search">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
                >
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                  </g>
                </svg>
              </div>
              <button className="close-btn" type="reset">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </label>
          </form>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Book Area</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={area}
                label="Book Area"
                onChange={handleChange}
                className="select"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <MenuItem key={i} value={i * 10 + 1}>
                    {`${i * 10 + 1}-${i * 10 + 11}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>

      {loading ? (
        <Box className="load" sx={{ width: "100%" }}>
          <CircularProgress color="success" size={"large"} />
        </Box>
      ) : (
        <div className="bookslist">{booksRender()}</div>
      )}
      <MuiModal
        open={open}
        handleClose={() => setOpen(false)}
        books={allBooks}
        id={bookid}
        save={false}
      />
      <Footer />
    </>
  );
};

export default Search;
