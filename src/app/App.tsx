
import React from 'react';
import theme from '../config/theme';
import { Auth } from '../services';
import { MainRouter } from './Routes';
import { Loader, Notifier } from '../components';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router} from 'react-router-dom';
import './app.scss';

// Redux
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { AuthState } from '../store/auth/types';
import { GlobalState } from '../store/global/types';
import * as AuthActions from '../store/auth/actions';
import * as GlobalActions from '../store/global/actions';

interface AppProps {
  global: GlobalState;
  auth: AuthState;
  setUser: typeof AuthActions.setUser;
  updateLoadingPage: typeof GlobalActions.updateLoadingPage;
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    const authService: Auth = new Auth();

    authService
      .checkUser()
      .then((user) => {
        this.props.setUser(user);
        this.props.updateLoadingPage(false);
      });
  }

  render() {
    const { auth, global } = this.props;

    return (
      <ThemeProvider theme={ theme }>
        {
          !global.loadingData ?
          <React.Fragment>
            <Notifier />
            <Router>
              <React.Fragment>
                <MainRouter userIsLogged={ Boolean(auth.user) } />
              </React.Fragment>
            </Router>
          </React.Fragment> :
          <Loader loading />
        }
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  global: state.global,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch) =>
  bindActionCreators({
    ...GlobalActions,
    ...AuthActions,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
