
import * as React from 'react';
import './Heading.scss';

const Heading: React.FunctionComponent<{}> = () => {
  return (
    <div className="pk-login__heading">
      <figure className="pk-login__heading--icon">
        <img src={ require('../../../assets/images/icon.png') } alt="Password Keeper - Icon"/>
      </figure>
      <figure className="pk-login__heading--name">
        <img src={ require('../../../assets/images/name.png') } alt="Password Keeper - Name"/>
      </figure>
    </div>
  );
};

export default Heading;
