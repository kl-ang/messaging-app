import { ThemeOptions } from '@mui/material';

export const halogenThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#007AFF',
      contrastText: '#fff',
    },
    secondary: {
      main: '#007AFF',
      contrastText: '#fff',
    },
    error: {
      main: '#C92726',
      contrastText: '#fff',
    },
    warning: {
      main: '#DA8B01',
      contrastText: '#fff',
    },
    info: {
      main: '#3A66D5',
      contrastText: '#fff',
    },
    success: {
      main: '#60BB58',
      contrastText: '#fff',
    },
  },
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          outline: 'none !important;',
        },
      },
    },
  },
};
