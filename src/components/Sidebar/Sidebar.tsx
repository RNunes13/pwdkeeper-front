
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import './Sidebar.scss';

// Material UI
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

interface SidebarProps extends RouteComponentProps {
  show: boolean;
  open: boolean;
  toggleDrawer: () => void;
};

const Sidebar: React.FunctionComponent<SidebarProps> = ({ show, open, toggleDrawer, history }) => {
  const handleClick = (link: string) => {
    history.push(link);
  };

  const links = [
    {
      name: 'Dashboard',
      link: '/',
      icon: DashboardIcon,
    }
  ];
  
  const items = (
    <div>
      <List>
        {links.map(link => (
          <ListItem key={ link.name } onClick={ () => handleClick(link.link) } button>
            <ListItemIcon>{ React.createElement(link.icon) }</ListItemIcon>
            <ListItemText primary={ link.name } />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const component = (
    <SwipeableDrawer
      className="pk-sidebar"
      open={ open }
      onClose={ toggleDrawer }
      onOpen={ toggleDrawer }
      color="secondary"
    >
      <div className="pk-sidebar__heading">
        <IconButton className="pk-sidebar__heading--close" onClick={ toggleDrawer }>
          <ChevronLeftIcon />
        </IconButton>
        <figure className="pk-sidebar__heading--image">
          <img
            className="pk-sidebar__heading--image-icon"
            src={ require('assets/images/icon.png') }
            alt="Password Keeper"
          />
          <img
            className="pk-sidebar__heading--image-name"
            src={ require('assets/images/name.png') }
            alt="Password Keeper"
          />
        </figure>
      </div>
      <div
        tabIndex={0}
        role="button"
        onClick={ toggleDrawer } 
        onKeyDown={ toggleDrawer }
      >
      { items }
      </div>
    </SwipeableDrawer>
  );

  if (!show) return null;
  
  return component
}

export default withRouter(Sidebar);
