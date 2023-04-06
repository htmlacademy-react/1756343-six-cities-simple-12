import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import { AppRoutes } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { authSelector } from '../../store/selectors';
import { login } from '../../store/sliceAuth';

const Login = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(authSelector);
  const navigate = useNavigate();

  if (authorizationStatus) {
    navigate(AppRoutes.Main);
  }

  const handleAuth = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }));
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={(e) => handleAuth(e)}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={emailRef} className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
