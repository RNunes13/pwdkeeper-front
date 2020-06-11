
import * as React from 'react';
import qs from 'querystring';
import { RouteComponentProps } from 'react-router';
import { Container, SignIn, LoginHeading, SignUp } from '../../components';
import './Login.scss';

interface LoginProps extends RouteComponentProps {
};

interface LoginState {
  showSignUp: boolean;
};

export default class Login extends React.Component<LoginProps, LoginState> {
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
    const destiny = qs.parse(query).from as string || '/dashboard';

    // if (auth.currentUser()) this.props.history.push(destiny);
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
