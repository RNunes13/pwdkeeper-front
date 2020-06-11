
import * as React from 'react';
import classNames from 'classnames';

import './Container.scss';

type PropsType = {
  className?: string;
  style?: React.CSSProperties | undefined;
};

const Container: React.FunctionComponent<PropsType> = (props) => {
  return (
    <div className={ classNames('pk-container', props.className) } style={ props.style }>
      { props.children }
    </div>
  )
}

export default Container;
