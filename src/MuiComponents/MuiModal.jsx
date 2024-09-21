import Box from "@mui/material/Box";

import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";

import Typography from "@mui/material/Typography";
import "../Components/HomeBooks.css";

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

function savebook(obj) {
  const storageKey = "saved";
  let storedArray = JSON.parse(localStorage.getItem(storageKey)) || [];
  const exists = storedArray.some(book => book.id === obj.id);
  
  if (!exists) {
    if (storedArray.length >= 8) {
      storedArray.shift();
    }
    storedArray.push(obj);
    localStorage.setItem(storageKey, JSON.stringify(storedArray));
  }
}

const MuiModal = ({ open, handleClose, books, id, save }) => {
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

                {save === false ? (
                  <IconButton
                    sx={{ fontSize: 15, float: "right", p: 2, height: 15 }}
                    aria-label=""
                    onClick={() => {
                      savebook(book);
                      handleClose();
                    }}
                  >
                    Save
                    <BookmarkBorderIcon size="small" />
                  </IconButton>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }
};
export default MuiModal;
