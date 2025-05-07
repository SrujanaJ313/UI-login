import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#183084',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background:{
            default:'#87CEEB'
        }
    },
});

export default theme;