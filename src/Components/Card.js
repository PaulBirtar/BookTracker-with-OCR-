import React, { useState } from "react";
import Modal from "./Modal";

const Card = ({ book }) => {
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
        let thumbnail =
          item.volumeInfo.imageLinks &&
          (item.volumeInfo.imageLinks.extraLarge ||
            item.volumeInfo.imageLinks.large ||
            item.volumeInfo.imageLinks.medium ||
            item.volumeInfo.imageLinks.thumbnail ||
            item.volumeInfo.imageLinks.smallThumbnail);

        let amount =
          item.saleInfo.listPrice &&
          (item.saleInfo.listPrice.amount ||
            item.saleInfo.retailPrice.amount ||
            item.saleInfo.offerPrice.amount);

        let priceDisplay = amount ? `RON ${amount}` : "Price info unavailable";

        return (
          <div className="card" onClick={() => openModal(item)} key={item.id}>
            {thumbnail && <img src={thumbnail} alt="" />}
            <div className="bottom">
              <h3 className="title">{item.volumeInfo.title}</h3>
              <p className="amount">{priceDisplay}</p>
            </div>
          </div>
        );
      })}
      <Modal show={show} item={bookItem} onClose={closeModal} />
    </>
  );
};

export default Card;
