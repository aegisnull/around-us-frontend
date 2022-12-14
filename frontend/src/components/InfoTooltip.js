import React from "react";
import SuccessMark from "../images/success-mark.svg";
import FailMark from "../images/failed-mark.svg";

function InfoTooltip(props) {
  const image = props.isSuccess ? SuccessMark : FailMark;
  const text = props.isSuccess
    ? "Success! You have now been registered."
    : "Oops, something went wrong! Please try again.";
  const imageAlt = props.isSuccess ? "Success" : "Fail";

  return (
    <div
      className={`modal modal_tooltip ${props.isOpen ? "modal_active" : ""}`}
    >
      <div className="modal__container">
        <img className="modal__tooltip-image" src={image} alt={imageAlt} />
        <h3 className="modal__title modal__tooltip-text">{text}</h3>
        <button
          className="modal__close-button modal__close_tooltip"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
