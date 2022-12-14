import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  const currentPath = useLocation().pathname;
  const linkTo = currentPath === "/signup" ? "/signin" : "/signup";
  const linkText = currentPath === "/signin" ? "Sign up" : "Log in";

  return (
    <>
      <header className="main__container header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo Around" />
        </Link>
        <nav className="header__nav">
          {props.isLoggedIn ? (
            <>
              <p className="header__auth">{props.userEmail}</p>
              <Link
                to="/signin"
                className="header__auth"
                onClick={props.handleLogout}
              >
                Log out
              </Link>
            </>
          ) : (
            <Link to={linkTo} className="header__auth">
              {linkText}
            </Link>
          )}
        </nav>
      </header>
      <div className="header__line"></div>
    </>
  );
}

export default Header;
