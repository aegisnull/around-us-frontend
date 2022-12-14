import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Cambiar foto de perfil"
      formName="newProfileImg"
      isOpen={isOpen}
      onClose={onClose}
      formSubmitText="Guardar"
      formSubmitClass="form-profile"
      onSubmit={handleSubmit}
    >
      <input
        className="modal__input modal__profile-url"
        id="new-profile-url"
        type="url"
        ref={avatarRef}
        placeholder="URL de la imagen"
        required
      />
      <span className="modal__error" id="new-profile-url-error">
        Por favor, rellena este campo.
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
