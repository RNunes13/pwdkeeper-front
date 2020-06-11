
import React from 'react';
import { PulseLoader } from 'react-spinners';
import './Loader.scss';

export interface LoaderProps {
  loading: boolean;
}

const Loader: React.FunctionComponent<LoaderProps> = ({ loading }) => {
  return (
    <div className="pk-loader__container">
      <PulseLoader
        size={ 15 }
        color="#009688"
        loading={ loading }
      />
    </div>
  );
};

export default Loader;
