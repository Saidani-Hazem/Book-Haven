import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./HomeBooks.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Footer from "../pages/footer";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CakeIcon from "@mui/icons-material/Cake";
import LanguageIcon from "@mui/icons-material/Language";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

//model style
const style = {
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "90%",
  bgcolor: "#D3C5E5",
  boxShadow: 24,
  p: 2,
};

const HomeBooks = () => {
  const [books, setBooks] = useState([]);
  const [page, setpage] = useState(2);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

          <Typography variant="body2" className="mobileinfos">
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
              <Typography variant="body2" className="mobileinfos">
                <LanguageIcon
                  sx={{ justifyContent: "center", mr: 1 }}
                  color="primary"
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
      <BasicModal
        open={open}
        handleClose={handleClose}
        books={books}
        id={bookid}
      />
      <Footer />
    </div>
  );
};

function BasicModal({ open, handleClose, books, id }) {
  const book = books.find((book) => book.id === id);

  if (!book) {
    return null;
  } else {
    console.log(book);
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <IconButton
              sx={{ float: "right", p: 0 }}
              aria-label=""
              onClick={handleClose}
            >
              <CloseIcon size="small" />
            </IconButton>

            <div className="singlebookimg">
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

              <div className="bookinfos">
                <div>
                  <h4 className="booktitle">{book.title.substring(0, 50)}</h4>
                  <div className="titleonebook">
                    {book.subjects && book.subjects.length > 0 ? (
                      book.subjects.slice(0, 3).map((sub, index) => (
                        <Typography
                          className="subs"
                          key={index}
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <p className="mobilesubs">{sub}</p>
                        </Typography>
                      ))
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        No subjects available
                      </Typography>
                    )}
                  </div>
                  <div className="iconstitle">
                    <Typography variant="body2">
                      <PersonTwoToneIcon
                        className="mobileinfos"
                        sx={{ justifyContent: "center", mr: 1 }}
                        color="primary"
                        fontSize="small"
                      />
                      {book.authors && book.authors[0]
                        ? book.authors[0].name
                        : "Unknown Author"}
                      <br />
                      <CakeIcon
                        sx={{ justifyContent: "center", mr: 1 }}
                        color="primary"
                        fontSize="small"
                      />
                      {book.authors && book.authors[0]
                        ? book.authors[0].birth_year + "   --   "
                        : "Unknown "}

                      {book.authors && book.authors[0]
                        ? book.authors[0].death_year
                        : "Date"}
                    </Typography>

                    <Typography variant="body2" className="mobileinfos">
                      <LanguageIcon
                        sx={{ justifyContent: "center", mr: 1 }}
                        color="primary"
                        fontSize="small"
                      />
                      {book.languages}
                    </Typography>

                    <div className="translators">
                      <h4>Translators : </h4>
                      {book.translators && book.translators.length > 0 ? (
                        book.translators.map((tran, index) => (
                          <Typography
                            className="subs"
                            key={index}
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            <p className="mobilesubs">{tran.name}</p>
                          </Typography>
                        ))
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          No Translators available..
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
                <IconButton
                sx={{ fontSize: 15, float: "right", p: 2 ,height:15}}
                aria-label=""
                onClick={handleClose}
              >
                Save
                <BookmarkBorderIcon size="small" />
              </IconButton>
              </div>
              
            </div>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default HomeBooks;
