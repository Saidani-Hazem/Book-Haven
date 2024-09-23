import React, { useState, useEffect } from "react";
import MobileDrawer from "../MuiComponents/MobileDrawer";
import "./home.css";
import Footer from "./footer.jsx";
import Card from "@mui/material/Card";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../Components/HomeBooks.css";
import LanguageIcon from "@mui/icons-material/Language";
import MuiModal from "../MuiComponents/MuiModal.jsx";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import Box from "@mui/material/Box";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Saved = () => {
  const [open, setOpen] = useState(false);
  const [bookid, setBookId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("saved")) || [];
    setData(savedBooks);
  }, []);

  const handleOpen = (id) => {
    setBookId(id);
    setOpen(true);
  };

  return (
    <>
      <MobileDrawer />

      <div className="savedlabel">
        <BookmarkIcon fontSize="medium" />
        <h4>Saved Book</h4>
      </div>

      <div className="bookslist">
        {data && data.length > 0 ? (
          data.map((book, index) => (
            <Card className="book" sx={{ mt: 2 }} key={book.id}>
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
                  {book.subjects[0]?.substring(0, 32) || "No subjects"}
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
                      onClick={() => handleOpen(book.id)}
                    >
                      More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <Box className="nosaved" sx={{ width: "100%" }}>
              <h4>No Saved Book</h4>

              <BookmarkRemoveIcon />
            </Box>
          </Typography>
        )}
      </div>
      <MuiModal
        open={open}
        handleClose={() => setOpen(false)}
        books={data}
        id={bookid}
        save={true}
      />
      <Footer />
    </>
  );
};

export default Saved;
