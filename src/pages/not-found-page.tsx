import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import HeaderComponent from '../components/header';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--not-found">
      <HeaderComponent />
      <main className="page__main page__main--not-found">
        <div className="container">
          <section className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Page not found</p>
            <Link className="not-found__link" to={AppRoute.Main}>
              Go to main page
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
