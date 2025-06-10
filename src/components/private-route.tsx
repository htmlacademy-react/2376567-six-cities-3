import { Navigate } from 'react-router-dom';
import { AppRoute } from '../const';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/auth-selectors';
import type { PrivateRouteProps } from '../types';

export default function PrivateRoute({ element }: PrivateRouteProps): JSX.Element {
  const isAuth = useSelector(selectIsAuth);
  return isAuth ? element : <Navigate to={AppRoute.Login} />;
}
