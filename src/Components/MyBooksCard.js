import React, { useState } from "react";
import MyBooksModal from "./MyBooksModal";

const MyBooksCard = ({ book }) => {
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState();

  const openModal = (item) => {
    setShow(true);
    setItem(item);
  };

  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      {book.map((item) => {
        let thumbnail = item.imageLink;
        let amount = item.price;

        const priceDisplay =
          amount !== 0 ? (
            <p className="amount">RON {amount}</p>
          ) : (
            <p className="amount">Price info unavailable</p>
          );

        return (
          <div className="card" onClick={() => openModal(item)} key={item.id}>
            {thumbnail && <img src={thumbnail} alt="" />}
            <div className="bottom">
              <h3 className="title">{item.title}</h3>
              {priceDisplay}
            </div>
          </div>
        );
      })}
      <MyBooksModal show={show} item={bookItem} onClose={closeModal} />
    </>
  );
};

export default MyBooksCard;
