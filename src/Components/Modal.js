import React from "react";
import axios from "axios";

const Modal = ({ show, item, onClose }) => {
  if (!show) {
    return null;
  }

  const handleClose = () => {
    onClose(); // Call the onClose callback function to close the modal
  };

  const addBook = () => {
    let thumbnail =
      item.volumeInfo.imageLinks &&
      (item.volumeInfo.imageLinks.extraLarge ||
        item.volumeInfo.imageLinks.large ||
        item.volumeInfo.imageLinks.medium ||
        item.volumeInfo.imageLinks.thumbnail ||
        item.volumeInfo.imageLinks.smallThumbnail);

    let amount =
      item.saleInfo?.listPrice?.amount ||
      item.saleInfo?.retailPrice?.amount ||
      item.saleInfo?.offerPrice?.amount ||
      0;

    const { title, authors, publisher, publishedDate, description } =
      item.volumeInfo;
    const defaultValues = {
      title: "Unknown Title",
      authors: ["Unknown author"],
      publisher: "Unknown publisher",
      publishedDate: "Unknown publish date",
      description: "This book does not have a description",
    };

    const postData = {
      title: title || defaultValues.title,
      authors: authors || defaultValues.authors,
      publisher: publisher || defaultValues.publisher,
      publishedDate: publishedDate || defaultValues.publishedDate,
      description: description || defaultValues.description,
      price: amount,
      googleLink: item.volumeInfo.previewLink,
      imageLink: thumbnail,
    };

    var config = {
      method: "post",
      url: "http://localhost:5000/api/books/add",
      headers: {},
      data: postData, // Add the postData to the config object
    };

    // Perform the POST request to add the book to the database
    axios(config)
      .then((response) => {
        alert("Book added successfully:", response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error adding book:", error);
        // Handles the error case if the book couldn't be added
      });
  };

  let thumbnail =
    item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;

  return (
    <>
      <div className="overlay">
        <div className="overlay-inner">
          <span class="close" onClick={handleClose}>
            &times;
          </span>
          <div className="inner-box">
            <img src={thumbnail} alt="" />
            <div className="info">
              <h1>{item.volumeInfo.title}</h1>
              <h3>{item.volumeInfo.authors}</h3>
              <h4>
                {item.volumeInfo.publisher}
                <span> {item.volumeInfo.publishedDate}</span>
              </h4>
              <br />
              <a href={item.volumeInfo.previewLink}>
                <button>More</button>
              </a>
              <button onClick={addBook}>Add book</button>
            </div>
          </div>
          <h4 className="description">Description: </h4>
          <p className="description">{item.volumeInfo.description}</p>
        </div>
      </div>
    </>
  );
};

export default Modal;
