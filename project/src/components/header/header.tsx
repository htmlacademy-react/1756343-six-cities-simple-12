import { Link } from 'react-router-dom';

const Header = (): JSX.Element => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link header__logo-link--active" to='/'>
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <div className="header__nav-profile">
                <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
              </div>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-link" to="/">
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
