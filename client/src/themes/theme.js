import { createMuiTheme } from '@material-ui/core';
import { teal, orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: orange[500],
      contrastText: '#fff',
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
      Divider: 'rgba(0, 0, 0, 0.12)',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(0, 0, 0, 0.54)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;
