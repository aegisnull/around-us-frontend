import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Suscripción al contexto
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // Después de cargar el usuario actual desde la API
  // sus datos serán usados en componentes gestionados.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Edit profile"
      formName="editProfile"
      isOpen={isOpen}
      onClose={onClose}
      formSubmitText="Guardar"
      formSubmitClass="profile-edit"
      onSubmit={handleSubmit}
    >
      <input
        className="modal__input modal__profile-name"
        id="edit-profile-name"
        type="text"
        value={name || ""}
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
        required
      />
      <span className="modal__error" id="edit-profile-name-error">
        Por favor, rellena este campo.
      </span>
      <input
        className="modal__input modal__profile-title"
        id="edit-profile-title"
        type="text"
        value={description || ""}
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionChange}
        required
      />
      <span className="modal__error" id="edit-profile-title-error">
        Por favor, rellena este campo.
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
