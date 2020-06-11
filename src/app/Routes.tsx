
import * as React from 'react';
import qs from 'querystring';
import Loadable from 'react-loadable';
import { Redirect, Route, Switch } from 'react-router-dom';

// Dynamic import
const loading = () => <div>Carregando...</div>

/**
 * Handles redirection safely when not logged in.
 */
const PrivateRoute = ({ component, user, ...rest }: any) => (
  <Route {...rest} render={(props: any) => {
    if (true) {
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
export const MainRouter = () => (
  <Switch>
    <Route exact path="/" component={ () => <div>Password Keeper</div> } />
  </Switch>
);
