
import * as React from 'react';
import Menu from './Menu/Menu';
import Sidebar from '../Sidebar/Sidebar';
import './Navbar.scss';

// Redux
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { AuthState } from '../../store/auth/types';
import { GlobalState } from '../../store/global/types';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

interface Props {
  auth: AuthState;
  global: GlobalState;
}

const Navbar: React.FunctionComponent<Props> = ({ auth, global }) => {  
  const [ sidebar, setSidebar ] = React.useState(false);

  const toggleDrawer = () => setSidebar(!sidebar);

  const component = (
    <>
      <AppBar className="pk-navbar">
        <Toolbar>
          <IconButton className="pk-navbar__menu" aria-label="Menu" onClick={ toggleDrawer }>
            <MenuIcon />
          </IconButton>
          <Typography className="pk-navbar__title" variant="h6" color="inherit">
            { global.page }
          </Typography>
          <Menu />
        </Toolbar>
      </AppBar>
      <Sidebar show={ Boolean(auth.user) } open={ sidebar } toggleDrawer={ toggleDrawer } />
    </>
  );

  return Boolean(auth.user) ? component : null;
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  global: state.global,
});

export default connect(mapStateToProps)(Navbar);
