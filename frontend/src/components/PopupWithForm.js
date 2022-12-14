function PopupWithForm({
  name,
  title,
  formName,
  isOpen,
  onClose,
  formSubmitClass,
  formSubmitText,
  onSubmit,
  children,
}) {
  return (
    <div className={`modal modal-${name} ${isOpen ? "modal_active" : ""}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <form
          className={`modal__form modal__form_${name}`}
          name={formName}
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className={`modal__form-submit modal__${formSubmitClass}`}
          >
            {formSubmitText}
          </button>
        </form>
        <button
          className={`modal__close-button modal__close_${name}`}
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
