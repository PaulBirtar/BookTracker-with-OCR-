import React from "react";
import axios from "axios";

const MyBooksModal = ({ show, item, onClose }) => {
  if (!show) {
    return null;
  }

  const handleClose = () => {
    onClose(); // Call the onClose callback function to close the modal
  };

  const deleteBook = () => {
    const bookId = item._id;

    // Ask for confirmation before deleting the book
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmDelete) {
      var config = {
        method: "delete",
        url: `http://localhost:5000/api/books/${bookId}`,
        headers: {},
      };

      // Perform the DELETE request to remove the book from the database
      axios(config)
        .then((response) => {
          alert("Book deleted successfully");
          // Refresh the page
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("Error deleting book:", error);
          // Handle the error case if the book couldn't be deleted
        });
    }
  };

  return (
    <>
      <div className="overlay">
        <div className="overlay-inner">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <div className="inner-box">
            <img src={item.imageLink} alt="" />
            <div className="info">
              <h1>{item.title}</h1>
              <h3>{item.authors.join(", ")}</h3>
              <h4>
                {item.publisher}
                <span> {item.publishedDate}</span>
              </h4>
              <br />
              <a href={item.googleLink}>
                <button>More</button>
              </a>
              <button onClick={deleteBook}>Delete Book</button>
            </div>
          </div>
          <h4 className="description">Description: </h4>
          <p className="description">{item.description}</p>
        </div>
      </div>
    </>
  );
};

export default MyBooksModal;
