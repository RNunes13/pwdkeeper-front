
import * as React from 'react';
import SignInForm from './Form/Form';
import ForgetPassForm from '../ForgetPassword/ForgetPassword';
import './SignIn.scss';

interface SignInProps {
  handleSignUp(): void;
};

const SignIn: React.FunctionComponent<SignInProps> = ({ handleSignUp }) => {
  const [ showPassword, handleShowPassword ] = React.useState(false);
  const [ showForgetPass, handleShowForgetPass ] = React.useState(false)
  
  const togglePassword = () => handleShowPassword(prevState => !prevState);
  const handleForgetPass = () => handleShowForgetPass(prevState => !prevState);

  return (
    <div className="pk-sign-in">
      {
        showForgetPass ?
        <ForgetPassForm handleForgetPass={ handleForgetPass } /> :
        <SignInForm
          showPassword={ showPassword }
          handleShowPassword={ togglePassword }
          handleForgetPass={ handleForgetPass }
        />
      }
      <div className="pk-sign-in__register">
        <span className="pk-sign-in__register--text">Não tem uma conta?</span>
        <a className="pk-sign-in__register--button" onClick={ handleSignUp }>Crie uma agora!</a>
      </div>
    </div>
  );
};

export default SignIn;
