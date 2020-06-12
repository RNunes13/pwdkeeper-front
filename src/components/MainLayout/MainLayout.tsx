
import * as React from 'react';
import { Navbar } from '../index';
import './MainLayout.scss';

interface MainLayoutProps {
}

const MainLayout: React.FunctionComponent<MainLayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="pk-main">
        { children }
      </main>
    </React.Fragment>
  );
};

export default MainLayout;
