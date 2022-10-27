import { React } from 'react';
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import PropTypes from "prop-types";

//  declear the BookList component and pass all the props as param which in only the shelves here
const BooksList = ({ shelves, books, onChangeBookShelf }) => {
  // secs for section of the shelves which they live inside a <ul> each section as <li> and inside each <li> lives the list of books as <ul> each book live in <li> as a bookCard
  const showingShelves = Array.from(shelves).filter(
    (shelf) => shelf.mode !== "none"
  );
  const secs = showingShelves.map((shelf) => {
    return (
      <li key={shelf.id} className="sec-shelf">
        <h3>{shelf.mode}</h3>
        <hr />
        <ul className="sec-shelf-content">
          {Array.from(books).map((book) => {
            return (
              book.shelf.toLowerCase() ===
                shelf.mode.replaceAll(" ", "").toLowerCase() && (
                <BookCard
                  key={book.id}
                  book={book}
                  shelves={shelves}
                  onChangeBookShelf={onChangeBookShelf}
                />
              )
            );
          })}
        </ul>
      </li>
    );
  });

  return (
    <ul>
      {secs}
      <Link className="floating-btn" to="/search">
        &#43;
      </Link>
    </ul>
  );
};
BooksList.propTypes = {
  shelves: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired,
};
export default BooksList;
