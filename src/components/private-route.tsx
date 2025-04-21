import { Navigate } from 'react-router-dom';
import { AppRoute } from '../const';
import { PrivateRouteProps } from '../types';

export default function PrivateRoute ({isAuth, element}: PrivateRouteProps):JSX.Element {
  return (isAuth ? element : <Navigate to={AppRoute.Login}/>);
}
