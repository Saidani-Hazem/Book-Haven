import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TranslateTwoToneIcon from "@mui/icons-material/TranslateTwoTone";
import Card from "@mui/material/Card";
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./HomeBooks.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Footer from "../pages/footer";

const HomeBooks = () => {
  const [books, setBooks] = useState([]);
  const [page, setpage] = useState(2);

  useEffect(() => {
    axios
      .get(`https://gutendex.com/books/?page=${page}`)
      .then((response) => {
        setBooks(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, [page]);

  const changePage = (event, value) => {
    setpage(value);
    setBooks([]);
  };

  const booksRender = () => {
    if (books.length === 0) {
      return false;
    }

    return books.map((book, index) => (
      <Card className="book" sx={{ mt: 2 }}>
        <div className="bookimg">
          <img
            key={book.id}
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
            <h6 key={index}>{book.title.substring(0, 30)}</h6>
          </Typography>
          <Typography
            key={book.id}
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            {book.subjects[0].substring(0, 32)}
          </Typography>

          <Typography variant="body2">
            <PersonTwoToneIcon
              sx={{ justifyContent: "center", mr: 1 }}
              color="primary"
              fontSize="small"
            />
            {book.authors && book.authors[0]
              ? book.authors[0].name
              : "Unknown Author"}
          </Typography>

          <div className="langauth">
            <div>
              <Typography variant="body2">
                <TranslateTwoToneIcon
                  sx={{ justifyContent: "center", mr: 1 }}
                  color="primary"
                  fontSize="small"
                />
                {book.languages}
              </Typography>
            </div>

            <div>
              {" "}
              <Button sx={{ float: "left" }} size="small" variant="contained" color="secondary">
                More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div>
      {booksRender() === false ? (
        <Box className="load" sx={{ width: "100%" }}>
          <CircularProgress color="success" />
        </Box>
      ) : (
        <div className="bookslist">{booksRender()}</div>
      )}

      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={100}
            color="secondary"
            page={page}
            onChange={changePage}
            size="small"
            showFirstButton
            showLastButton
          />
        </Stack>
      </div>

      <Footer />
    </div>
  );
};

export default HomeBooks;
