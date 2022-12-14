import edit from "../images/edit.svg";
import post from "../images/post.svg";
import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const cards = React.useContext(CardsContext);

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main__container">
      <section className="profile">
        <div className="profile__container-left">
          <img
            className="profile__img"
            src={currentUser.avatar}
            alt="Profile avatar"
          />
          <div className="profile__overlay">
            <span
              onClick={onEditAvatarClick}
              className="profile__img-button"
            ></span>
          </div>
        </div>
        <div className="profile__container-middle">
          <div className="profile__subcontainer-top">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              onClick={onEditProfileClick}
            >
              <img
                className="profile__edit-icon"
                src={edit}
                alt="edit button"
              />
            </button>
          </div>
          <div className="profile__subcontainer-bottom">
            <h2 className="profile__title">{currentUser.about}</h2>
          </div>
        </div>
        <div className="profile__container-right">
          <button className="profile__post-button" onClick={onAddPlaceClick}>
            <img className="profile__post-icon" src={post} alt="post button" />
          </button>
        </div>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            cardData={card}
            onCardClick={onCardClick}
            key={card._id}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
