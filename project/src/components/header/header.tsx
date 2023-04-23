import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { authSelector, userSelector } from '../../store/selectors';
import { logout } from '../../store/slice-auth';

const Header = (): JSX.Element => {
  const authorizationStatus = useAppSelector(authSelector);
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
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
              {authorizationStatus ?
                <>
                  <li className="header__nav-item user">
                    <div className="header__nav-profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage: `url(${user.avatarUrl})`}}></div>
                      <span className="header__user-name user__name">{user.email}</span>
                    </div>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to="/" onClick={(e) => handleLogout(e)}>
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </> :
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoutes.Login}>
                    <span className="header__signout">Sign in</span>
                  </Link>
                </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
