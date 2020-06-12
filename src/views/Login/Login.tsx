
import * as React from 'react';
import qs from 'querystring';
import { RouteComponentProps } from 'react-router';
import { Container, SignIn, LoginHeading, SignUp } from '../../components';
import './Login.scss';

// Redux
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { AuthState } from '../../store/auth/types';

interface LoginProps extends RouteComponentProps {
  auth: AuthState;
};

interface LoginState {
  showSignUp: boolean;
};

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      showSignUp: false,
    };

    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp() {
    this.setState(prevState => ({ showSignUp: !prevState.showSignUp }));
  }

  componentDidMount() {
    const query = this.props.location!.search.replace('?', '');  
    const destiny = qs.parse(query).from as string || '/';

    if (this.props.auth.user) this.props.history.push(destiny);
  }

  render() {
    return(
      <section className="pk-login">
        <Container className="pk-login__container">
          <div className="pk-login__wrap">
            <LoginHeading />
            {
              this.state.showSignUp ?
              <SignUp handleSignUp={ this.handleSignUp } /> :
              <SignIn handleSignUp={ this.handleSignUp } /> 
            }
          </div>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = (state: AppState) => ({ auth: state.auth });

export default connect(
  mapStateToProps,
)(Login);
