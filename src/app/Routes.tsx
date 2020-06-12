
import * as React from 'react';
import qs from 'querystring';
import Loadable from 'react-loadable';
import { Loader } from '../components';
import { Redirect, Route, Switch } from 'react-router-dom';

// Dynamic import
const loading = () => <Loader loading />

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login'), loading
});

/**
 * Handles redirection safely when not logged in.
 */
const PrivateRoute = ({ component, userIsLogged, ...rest }: any) => (
  <Route {...rest} render={(props: any) => {
    if (userIsLogged) {
      return React.createElement(component, { ...props });
    }

    return <Redirect to={{
      pathname: '/login',
      search: `?${qs.stringify({ from: props.location.pathname })}`,
    }} />;
  }} />
);

/**
 * The main application router.
 */
interface MainRouterProps {
  userIsLogged: boolean;
}

export const MainRouter = ({ userIsLogged }: MainRouterProps) => (
  <Switch>
    <Route exact path="/login" component={ Login } />
    <PrivateRoute exact userIsLogged={ userIsLogged } path="/" component={ () => <div>Password Keeper</div> } />
  </Switch>
);
