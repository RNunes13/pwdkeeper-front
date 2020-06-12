
import * as React from 'react';
import { MainLayout } from '../../components';

// Redux
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { AuthState } from '../../store/auth/types';
import { GlobalState } from '../../store/global/types';
import * as AuthActions from '../../store/auth/actions';
import * as GlobalActions from '../../store/global/actions';

export interface DashboardProps {
  auth: AuthState;
  global: GlobalState;
  setPage: typeof GlobalActions.setPage;
}

export interface DashboardState {
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    this.props.setPage('Dashboard');
  }

  render() {
    return (
      <MainLayout>
        <div className="pk-dashboard">
          Dashboard
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  global: state.global,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch) =>
  bindActionCreators({
    ...AuthActions,
    ...GlobalActions,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
