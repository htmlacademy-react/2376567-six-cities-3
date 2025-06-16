import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../const';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/auth-selectors';
import { loginAction } from '../redux/auth-slice';
import { useAppDispatch } from '../redux/store';
import { cities } from '../const';
import { getRandomInt } from '../utils';
import { changeCity } from '../redux/city-slice';
import { City } from '../types';
import { fetchFavorites } from '../redux/favorites-slice';

export function LoginPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const handleClick = (cityName: City) => {
    dispatch(changeCity(cityName));
    navigate('/main');
  };

  const randomCities = cities[getRandomInt(0, cities.length - 1)];


  useEffect(() => {
    if (isAuth) {
      dispatch(fetchFavorites());
      navigate(AppRoute.Main);
    }
  }, [dispatch, isAuth, navigate]);

  const validateEmail = (value: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  };

  const validatePassword = (value: string): boolean => /[a-zA-Z]/.test(value) && /[0-9]/.test(value);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>):Promise<void> => {
    evt.preventDefault();

    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must contain at least one letter and one number');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      try {

        const resultAction = await dispatch(loginAction({ email, password }));

        if (loginAction.fulfilled.match(resultAction)) {
          navigate(AppRoute.Main);
        } else {
          if (resultAction.payload) {
            setEmailError((resultAction.payload as { error?: string }).error || 'Authorization failed');
          }
        }
      } catch (error) {
        setEmailError('Connection error');
      }
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={(evt) => void handleSubmit(evt)} noValidate>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className={`login__input form__input ${emailError ? 'login__input--error' : ''}`}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <div className="login__error">{emailError}</div>}
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className={`login__input form__input ${passwordError ? 'login__input--error' : ''}`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <div className="login__error">{passwordError}</div>}
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main} onClick={() => handleClick(randomCities)}>
                <span>{randomCities.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
