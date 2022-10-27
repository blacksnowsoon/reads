import { React } from "react";
import PropTypes from "prop-types";
import ContextMenu from "../contecxt_menu/ContextMenu";

// declear the bookCard taking the all props =>({shelves, book, handleBookShelf(book, shelf)})
const BookCard = ({ shelves, book, onChangeBookShelf }) => {
  // in case of updating the book in the database update the book in the recent app data
  const handleChangeShelf = (shelf) => {
    onChangeBookShelf(book, shelf);
  };

  return (
    <li key={book.id} className="book-card">
      <div
        className="img"
        style={{
          width: 128,
          height: 183,
          backgroundImage: `url("${book.imageLinks.smallThumbnail}")`,
        }}
      ></div>
      <h4 className="book-name">{book.title}</h4>
      <h6 className="book-auther">
        <span>Authors : </span>
        {book.authors}
      </h6>
      <div className="book-discription">
        <p>{book.subtitle || "No Subtitles"}</p>
        <a href={book.previewLink} target="_blank" rel="noreferrer">
          Preview
        </a>
      </div>
      <div className="btn-warper">
        <div className="card-context-btn">
          {
            <ContextMenu
              contextMenu={shelves}
              onChangeShelf={handleChangeShelf}
              book={book}
            />
          }
        </div>
      </div>
    </li>
  );
};
BookCard.propTypes = {
  shelves: PropTypes.array.isRequired,
  book: PropTypes.object.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired,
};
export default BookCard;
