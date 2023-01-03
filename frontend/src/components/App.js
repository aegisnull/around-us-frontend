import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { React, useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { auth } from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [userEmail, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const history = useNavigate();

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log("Error. La solicitud ha fallado");
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log("Error. La solicitud ha fallado");
      });
  }, []);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  useEffect(() => {
    const closeByClick = (e) => {
      if (e.target.classList.contains("modal_active")) {
        closeAllPopups();
      }
    };

    document.addEventListener("click", closeByClick);

    return () => document.removeEventListener("click", closeByClick);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .validateToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setIsLoggedIn(true);
            history("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, []);

  function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Envía una petición a la API y obtén los datos actualizados de la tarjeta
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
    setIsImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(name, about) {
    api
      .setUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Error. La solicitud ha fallado");
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Error. La solicitud ha fallado");
      });
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Error. La solicitud ha fallado");
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history("/login");
  }

  function handleLogin(userData) {
    auth
      .authenticate(userData)
      .then((user) => {
        localStorage.setItem("jwt", user.token);
        setIsLoggedIn(true);
        setEmail(userData.email);
        history("/");
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function handleSignup(userData) {
    auth
      .register(userData)
      .then((user) => {
        if (user.data._id) {
          setIsSuccess(true);
          history("signin");
        } else {
          setIsSuccess(false);
        }
      })
      .catch(() => {
        setIsSuccess(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          handleLogout={handleLogout}
        />
        <CardsContext.Provider value={cards}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/signin"
              element={<Login isLoggedIn={isLoggedIn} onSubmit={handleLogin} />}
            ></Route>
            <Route
              path="/signup"
              element={
                <Register isSuccess={isSuccess} onSubmit={handleSignup} />
              }
            ></Route>
          </Routes>
        </CardsContext.Provider>
        <Footer />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
        ;
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
