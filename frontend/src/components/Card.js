import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ cardData, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  // Verificando si el usuario actual es el propietario de la tarjeta actual
  const isOwn = cardData.owner._id === currentUser._id;

  // Creando una variable que después establecerás en `className` para el botón eliminar
  const cardDeleteButtonClassName = `card__remove-button ${
    isOwn ? "card__remove-button_active" : "card__remove-button"
  }`;

  // Verifica si el usuario actual le dio "like" a la tarjeta
  const isLiked = cardData.likes.some((i) => i._id === currentUser._id);

  // Crea una variable que después establecerás en `className` para el botón like
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : "card__like-button"
  }`;

  function handleClick() {
    onCardClick(cardData);
  }

  function handleLikeClick() {
    onCardLike(cardData);
  }

  function handleDeleteClick() {
    onCardDelete(cardData);
  }

  return (
    <div className="card">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <img
        className="card__img"
        src={cardData.link}
        alt={cardData.name}
        onClick={handleClick}
      />
      <div className="card__text-container">
        <h2 className="card__title">{cardData.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="card__like-counter">{cardData.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
