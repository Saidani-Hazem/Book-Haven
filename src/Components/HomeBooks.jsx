import { useState, useEffect } from "react";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./HomeBooks.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import LanguageIcon from "@mui/icons-material/Language";
import MuiModal from "../MuiComponents/MuiModal"



const HomeBooks = () => {

  const [books, setBooks] = useState([]);
  const [page, setpage] = useState(2);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  

  const [bookid, setbookid] = useState();

  useEffect(() => {
    axios
      .get(`https://gutendex.com/books/?page=${page}`)
      .then((response) => {
        setBooks(response.data.results);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, [page]);

  const changePage = (event, value) => {
    setpage(value);
    setBooks([]);
  };
  const bgmode = () => {
    return localStorage.getItem("mode") === "light" ? "#d3c5e5" : "#121212";
  };
  const booksRender = () => {
    if (books.length === 0) {
      return false;
    }
 
 
      
     
    return books.map((book, index) => (
      <Card key={book.id} className="book" sx={{ mt: 2}}>
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

          <Typography variant="body2" className="mobileinfos">
            <PersonTwoToneIcon
              sx={{ justifyContent: "center", mr: 1 }}
              color="#1976d2"
              fontSize="small"
            />
            {book.authors && book.authors[0]
              ? book.authors[0].name
              : "Unknown Author"}
          </Typography>

          <div className="langauth">
            <div>
              <Typography variant="body2" className="mobileinfos">
                <LanguageIcon
                  sx={{ justifyContent: "center", mr: 1 }}
                  color="#1976d2"
                  fontSize="small"
                />
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
                  setbookid(book.id);
                  handleOpen();
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

  return (
    <div>
      {booksRender() === false ? (
        <Box className="load" sx={{ width: "100%" }}>
          <CircularProgress color="success" size={"large"}/>
        </Box>
      ) : (
        <div className="bookslist" style={{backgroundColor:bgmode()}}>{booksRender()}</div>
      )}

      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={100}
            color="#7B1FA2"
            page={page}
            onChange={changePage}
            size="small"
            showFirstButton
            showLastButton
          />
        </Stack>
      </div>
      <MuiModal
        open={open} handleClose={() => setOpen(false)} books={books} id={bookid} save={false}
      />
      
    </div>
  );
};



export default HomeBooks;