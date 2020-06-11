
import * as React from 'react';
import SignUpForm from './Form/Form';

type PropsType = {
  handleSignUp(): void;
};

const SignUp: React.FunctionComponent<PropsType> = ({ handleSignUp }) => {
  const [ showPassword, handleShowPassword ] = React.useState(false);
  
  const togglePassword = () => handleShowPassword(prevState => !prevState);
  
  return (
    <div className="pk-sign-up">
      <SignUpForm
        showPassword={ showPassword }
        handleShowPassword={ togglePassword }
        handleSignUp={ handleSignUp }
      />
    </div>
  );
};

export default SignUp;
