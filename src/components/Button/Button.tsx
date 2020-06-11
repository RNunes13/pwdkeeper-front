
import * as React from 'react';
import classNames from 'classnames';

// Material UI
import ButtonUI, { ButtonProps as ButtonUIProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

interface ButtonProps {
  text: string;
  loading?: boolean;
}

const Button: React.FunctionComponent<ButtonProps & ButtonUIProps> = ({
  text,
  loading,
  className,
  ...props
}) => {  
  return (
    <div style={{ position: 'relative', display: 'inline' }}>
      <ButtonUI className={ classNames('pk-button', className) } { ...props }>{ text }</ButtonUI>
      {
        loading &&
        <CircularProgress
          size={ 24 }
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            color: '#009688',
            marginTop: -12,
            marginLeft: -12
          }}
        />
      }
    </div>
  );
};

export default Button;
