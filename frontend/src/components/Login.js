import React from "react";
import { Link } from "react-router-dom";

function Login(props) {
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
  }, [props.isLoggedIn]);

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="modal__title auth__title">Login</h2>
        <input
          className="modal__input auth__input"
          type="email"
          name="email"
          placeholder="Email"
          minLength="2"
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
          Log in
        </button>
        <Link to="/signup" className="auth__link">
          Not a member yet? Sign up here!
        </Link>
      </form>
    </div>
  );
}

export default Login;
