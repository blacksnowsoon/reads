import { React } from "react";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "../../css/App.css";

import BookList from "../books/BooksList";
import * as booksAPI from "../../utils/BooksAPI";
import Search from "../search/Search";
import Header from "../header/Header";

const shelves = [
  {
    id: 1,
    mode: "Currently Reading",
    numberOfBooks: 0,
  },
  {
    id: 2,
    mode: "Want To Read",
    numberOfBooks: 0,
  },
  {
    id: 3,
    mode: "Read",
    numberOfBooks: 0,
  },
  {
    id: 4,
    mode: "none",
    numberOfBooks: 0,
  },
];
const App = () => {
  // books[] state at init
  const [books, setBooks] = useState([]);

  // update the books[]
  useEffect(() => {
    (async () => {
      setBooks(await booksAPI.getAll());
    })();
  }, []);
  // update the books[] in case changing the book shelf
  const handleChangeBookShelf = (book, shelf) => {
    // check if the books[] has the recieved book
    const existBook = books.filter((b) => b.id === book.id);
    book.shelf = shelf;
    (async () => {
      await booksAPI.update(book, shelf);
    })().then(() => {
      if (existBook.length === 0) {
        setBooks([...books, book]);
      } else {
        const sortedBooks = books.filter((b) => b.id !== book.id);
        setBooks([...sortedBooks, book]);
      }
    });
  };

  return (
    
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div>
              <Header />
              <BookList
                shelves={shelves}
                books={books}
                onChangeBookShelf={handleChangeBookShelf}
              />
            </div>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <Search
              shelves={shelves}
              books={books}
              onChangeBookShelf={handleChangeBookShelf}
            />
          }
        ></Route>
      </Routes>
    
  );
};

export default App;
