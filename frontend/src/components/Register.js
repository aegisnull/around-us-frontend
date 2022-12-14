import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [inputs, setInputs] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      email: inputs.email,
      password: inputs.password,
    });
  }

  function handleInputChange(evt) {
    setInputs({
      ...inputs,
      [evt.target.name]: evt.target.value,
    });
  }

  React.useEffect(() => {
    setInputs({});
  }, [props.isSuccess]);

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="modal__title auth__title">Register</h2>
        <input
          className="modal__input auth__input"
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email || ""}
          onChange={handleInputChange}
          required
        />
        <input
          className="modal__input auth__input"
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password || ""}
          onChange={handleInputChange}
          required
        />
        <button className="modal__form-submit auth__submit" type="submit">
          Sign up
        </button>
        <Link to="/signin" className="auth__link">
          Already a member? Log in here!
        </Link>
      </form>
    </div>
  );
}

export default Register;
