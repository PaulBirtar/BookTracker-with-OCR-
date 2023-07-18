import React, { useState, useEffect } from "react";
import MyBooksCard from "./MyBooksCard";
import axios from "axios";

export default function SavedBooks() {
  const [bookData, setData] = useState([]);

  useEffect(() => {
    getBooks(); // Call getBooks() only once when the component is initially rendered
  }, []);

  const getBooks = () => {
    var config = {
      method: "get",
      url: "http://localhost:5000/api/books/getAll",
      headers: {},
    };

    axios(config)
      .then((response) => {
        const books = response.data;
        if (books && books.length > 0) {
          setData(books);
          console.log("Books retrieved successfully: ", books);
        } else {
          alert("There are no books in the database!");
          return;
        }
      })
      .catch((error) => {
        console.log("Error retrieving books: ", error);
      });
  };

  return (
    <>
      <h2 className="my-books-h2">Your saved books: </h2>

      <div className="card-container">
        <MyBooksCard book={bookData} />
      </div>
    </>
  );
}
