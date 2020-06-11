
import * as React from 'react';
import { OptionsType, QueueType, VariantIconType, VariantColorType } from '../../models/typings/notifier';

// Material UI
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import MessageIcon from '@material-ui/icons/Message';

interface NotifierProps {
}

interface NotifierState {
  open: boolean;
  message: string;
  key: number;
  variant: 'success' | 'warning' | 'error' | 'info' | 'default';
  delay: number;
};

let openSnackbarFn = (options: OptionsType) => {};

export default class Notifier extends React.Component<NotifierProps, NotifierState> {
  private variantIcon: VariantIconType = {
    'success': CheckCircleIcon,
    'warning': WarningIcon,
    'error': ErrorIcon,
    'info': InfoIcon,
    'default': MessageIcon,
  };

  private variantColor: VariantColorType = {
    'success': '#43a047',
    'warning': '#ffa000',
    'error': '#d32f2f',
    'info': '#1976d2',
    'default': '#303030',
  };

  private queue: QueueType[] = [];

  constructor(props: NotifierProps){
    super(props);

    this.state = {
      open: false,
      message: '',
      variant: 'default',
      delay: 6000,
      key: 0,
    };
  }

  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
  }

  openSnackbar = (options: OptionsType) => {
    const { message, variant, delay } = options;

    this.queue.push({
      message,
      variant: variant ? variant : 'default',
      delay: delay ? delay : 6000,
      key: new Date().getTime(),
    });

    if (this.state.open) {
      this.handleSnackbarClose();
    } else {
      this.processQueue();
    }
  }

  processQueue = () => {    
    if (this.queue.length > 0) {
      const { message, variant, key, delay } = this.queue.shift()!;

      this.setState({
        open: true,
        variant,
        message,
        delay,
        key,
      });
    }
  }

  handleSnackbarClose = () => {
    this.setState(prevState => ({
      ...prevState,
      open: false,
      delay: 6000,
    }));
  }

  handleExited = () => {
    this.processQueue();
  }
  
  render() {
    const { open, variant, message, key, delay } = this.state;

    const Icon = this.variantIcon[variant];
    const color = this.variantColor[variant];

    const messageSnackbar = (
      <span
        id="snackbar-message-id"
        style={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}
      >
        <Icon style={{ fontSize: 22, opacity: 0.9, marginRight: 10 }} />
        { message }
      </span>
    );

    const snackbarContent = (
      <SnackbarContent
        style={{ backgroundColor: color, margin: 10 }}
        aria-describedby="client-snackbar"
        message={ messageSnackbar }
        action={
          <Button
            color="inherit"
            size="small"
            onClick={ this.handleSnackbarClose }
          >
            Fechar
          </Button>
        }
      />
    );

    return (
      <Snackbar
        key={ key }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={ delay }
        onClose={ this.handleSnackbarClose }
        onExited={ this.handleExited }
        open={ open }
        ContentProps={{ 'aria-describedby': 'snackbar-message-id' }}
      >
      { snackbarContent }
      </Snackbar>
    );
  }
}

export function openSnackbar(options: OptionsType) {
  openSnackbarFn(options);
}
