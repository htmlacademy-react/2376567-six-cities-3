import { Navigate } from 'react-router-dom';
import { AppRoute } from '../const';
import { useSelector } from 'react-redux';
import { selectAuthorizationStatus } from '../redux/auth-selectors';
import type { PrivateRouteProps } from '../types';
import Spinner from './spinner/spinner';
import { AuthorizationStatus } from '../types';

export default function PrivateRoute({ element }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.UNKNOWN) {
    return <Spinner />;
  }

  return authorizationStatus === AuthorizationStatus.AUTH
    ? element
    : <Navigate to={AppRoute.Login} />;
}
