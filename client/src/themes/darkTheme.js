import { createMuiTheme } from '@material-ui/core';
import { dark } from '@material-ui/core/styles/createPalette';

const darkTheme = createMuiTheme({
  palette: {
    type: dark,
  },
});

export default darkTheme;
