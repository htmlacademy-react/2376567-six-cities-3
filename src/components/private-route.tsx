import { Navigate } from 'react-router-dom';
import { AppRoute } from '../const';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/authSelectors';

type PrivateRouteProps = {
  element: JSX.Element;
};

export default function PrivateRoute({ element }: PrivateRouteProps): JSX.Element {
  const isAuth = useSelector(selectIsAuth);
  return isAuth ? element : <Navigate to={AppRoute.Login} />;
}
