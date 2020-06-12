
import * as React from 'react';
import Form from './Form/Form';

type PropsTypes = {
  handleForgetPass(): void;
};

const SignIn: React.FunctionComponent<PropsTypes> = ({ handleForgetPass }) => {
  return (
    <div className="pk-forget-pass">
      <Form handleForgetPass={ handleForgetPass } />
    </div>
  );
};

export default SignIn;
