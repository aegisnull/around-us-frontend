import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [pictureName, setPictureName] = React.useState("");
  const [pictureLink, setPictureLink] = React.useState("");

  function handlePictureNameChange(e) {
    setPictureName(e.target.value);
  }

  function handlePictureLinkChange(e) {
    setPictureLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name: pictureName,
      link: pictureLink,
    });
  }

  React.useEffect(() => {
    setPictureName("");
    setPictureLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="post"
      title="Nuevo Lugar"
      formName="newPlace"
      isOpen={isOpen}
      onClose={onClose}
      formSubmitText="Crear"
      formSubmitClass="form-create"
      onSubmit={handleSubmit}
    >
      <input
        className="modal__input modal__profile-cardtitle"
        id="new-place-title"
        type="text"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        value={pictureName || ""}
        onChange={handlePictureNameChange}
        required
      />
      <span className="modal__error" id="new-place-title-error">
        Por favor, rellena este campo.
      </span>
      <input
        className="modal__input modal__profile-cardurl"
        id="new-place-url"
        type="url"
        placeholder="Enlace a la imágen"
        value={pictureLink || ""}
        onChange={handlePictureLinkChange}
        required
      />
      <span className="modal__error" id="new-place-url-error">
        Por favor, rellena este campo.
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
