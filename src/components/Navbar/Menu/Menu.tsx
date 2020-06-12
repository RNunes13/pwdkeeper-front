
import * as React from 'react';
import ProgressiveImage from 'react-progressive-image';
import { MD5 } from 'crypto-js/';
import { Auth } from '../../../services';
import { withRouter, RouteComponentProps } from 'react-router';

// Material UI
import Fade from '@material-ui/core/Fade';
import MenuUI from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import { AuthState } from '../../../store/auth/types';
import * as AuthActions from '../../../store/auth/actions';

interface MenuProps extends RouteComponentProps {
  auth: AuthState;
  setUser: typeof AuthActions.setUser;
}

interface MenuState {
  menu: HTMLElement | null;
}

const Menu: React.FunctionComponent<MenuProps> = ({ auth, setUser, history }) => {
  const [ menu, setMenu ] = React.useState<Element | null>(null);
  
  const { name, email } = auth.user!;

  const handleMenu = (event: React.MouseEvent) => setMenu(event.currentTarget);

  const closeMenu = () => setMenu(null);

  const redirect = (link: string) => {
    closeMenu();
    history.push(link);
  }

  const signOut = () => {
    Auth.signOut().then(resp => {
      setUser(null);
      history.push('/login');
    })
  }

  const gravarImage = `https://www.gravatar.com/avatar/${MD5(email).toString()}?s=200&d=robohash`;

  const onErrorImage = (evt: any) => {
    evt.currentTarget.src = require('../../../assets/images/placeholder.png');
  }

  const renderAvatar = (
    <ProgressiveImage 
      placeholder=""
      src={ gravarImage }
      onError={ onErrorImage }
    >
      {(src: string, loading: boolean) => {
        if (loading) return <CircularProgress color="inherit" />;
        
        return <Avatar alt={ name } src={ src } />
      }}
    </ProgressiveImage >
  );

  return (
    <div>
      <IconButton
        aria-owns={ menu ? 'menu-appbar' : undefined }
        aria-haspopup="true"
        onClick={ handleMenu }
        color="inherit"
        style={{ padding: 8 }}
      >
        { renderAvatar }
      </IconButton>
      <MenuUI
        id="menu-appbar"
        anchorEl={ menu }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={ closeMenu }
        open={ Boolean(menu) }
        TransitionComponent={ Fade }
      >
        <MenuItem disabled style={{ display: 'flex', justifyContent: 'center' }} >
          { name }
        </MenuItem>
        <Divider />
        {/* <MenuItem onClick={ () => redirect('/profile') }>
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText inset primary="Minha Conta" />
        </MenuItem> */}
        <MenuItem onClick={ signOut }>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </MenuItem>
      </MenuUI>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch) =>
  bindActionCreators({
    ...AuthActions,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Menu));
