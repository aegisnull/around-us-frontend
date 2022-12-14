function ImagePopup({ isOpen, card, onClose }) {
  return (
    <div id="lightbox" className={`popup ${isOpen ? "active" : ""}`}>
      <img className="popup__image" src={card.link} alt={card.name} />
      <p className="popup__title">{card.name}</p>
      <button className="popup__close" onClick={onClose}></button>
    </div>
  );
}

export default ImagePopup;
