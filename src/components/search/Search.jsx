import { React } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as booksAPI from "../../utils/BooksAPI";
import BookCard from "../books/BookCard";
import PropTypes from "prop-types";

const Search = ({ shelves, books, onChangeBookShelf }) => {
  // set the state of search books at init component
  const [searchBooks, setSearchBooks] = useState([]);

  // set the state of the query
  const [query, setQuery] = useState("");
  // update the query with onChange
  const updateQuery = (e) => {
    const value = e.target.value;
    setQuery(value);
  };
  useEffect(() => {
    // fitch the data from the API if the query is not empty string
    (async () => {
      if (!query) return;
      setSearchBooks(await booksAPI.search(query));
    })();
  }, [query]);
  // remove the none option from the search UI
  const searchContextList = Array.from(shelves).filter(
    (shelf) => shelf.mode !== "none"
  );

  // remove the exist books from the search results
  const filterdSearchBooks = searchBooks.filter((book) => {
    const existBook = books.filter((b) => book.id === b.id);
    return existBook[0] ? existBook[0].id !== book.id : book;
  });

  return (
    <div>
      <div className="search-header">
        <form className="search-form">
          <Link to="/" className="back-btn"></Link>
          <input
            value={query}
            type="text"
            placeholder="Search By Title, Author or ISBN"
            onChange={updateQuery}
          />
        </form>
      </div>
      <ul className="sec-shelf-content">
        {filterdSearchBooks.length !== 0 ? (
          filterdSearchBooks.map((book) => {
            return (
              <BookCard
                key={book.id}
                book={book}
                shelves={searchContextList}
                onChangeBookShelf={onChangeBookShelf}
              />
            );
          })
        ) : (
          <div>Not Any Books Match Your Search</div>
        )}
      </ul>
    </div>
  );
};
Search.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired,
};
export default Search;
