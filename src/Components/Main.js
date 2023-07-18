import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";
import Scan from "./Scan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Main = () => {
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);

  const searchBook = () => {
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          search +
          "&maxResults=40"
      )
      .then((response) => {
        const items = response.data.items;
        if (items && items.length > 0) {
          setData(items);
        } else {
          alert("No results found! Please try again with a different search!");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAutofill = (text) => {
    setSearch(text);
  };

  return (
    <>
      <div className="main-container">
        <div className="header">
          <div className="row">
            <h2>Find Your Book</h2>
            <div className="search">
              <input
                type="text"
                placeholder="Enter Your Book Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchBook();
                  }
                }}
              />
              <button class="button-5" onClick={searchBook}>
                <FontAwesomeIcon icon={faSearch} /> Search
              </button>

              {/* Autofill button */}
              <button
                class="button-5"
                onClick={() => {
                  setSearch(window.extractedText);
                }}
              >
                Autofill
              </button>
            </div>
            {/* Move the Scan component inside the row2 div */}
          </div>
        </div>

        <div className="scanDiv">
          <Scan handleAutofill={handleAutofill} />
        </div>

        <div className="card-container">
          <Card book={bookData} />
        </div>
      </div>
    </>
  );
};

export default Main;
