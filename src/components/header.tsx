import { AppRoute } from '../const';
import Navigation from './navigation';
import { Link } from 'react-router-dom';

export default function Header():JSX.Element {
  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </Link>
            </div>
            <Navigation/>
          </div>
        </div>
      </header>
    </div>
  );
}
