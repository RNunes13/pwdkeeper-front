
import React from 'react';
import theme from '../config/theme';
import { MainRouter } from './Routes';
import { Loader, Notifier } from '../components';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router} from 'react-router-dom';
import './app.scss';

// Redux
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { GlobalState } from '../store/global/types';
import * as GlobalActions from '../store/global/actions';

interface AppProps {
  updateLoadingPage: typeof GlobalActions.updateLoadingPage;
  global: GlobalState;
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.updateLoadingPage(false);
  }

  render() {
    const { global } = this.props;

    return (
      <ThemeProvider theme={ theme }>
        {
          !global.loadingData ?
          <React.Fragment>
            <Notifier />
            <Router>
              <React.Fragment>
                <MainRouter />
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
});

const mapDispatchToProps = (dispatch: Redux.Dispatch) =>
  bindActionCreators({
    ...GlobalActions,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
