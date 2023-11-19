import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#01579b',
            light: '#4f83cc',
            dark: '#002f6c',
        },
        secondary: {
            main: green[500],
        },
    },
    typography: {
        etitle: {
            fontSize: '1.00rem',
            fontWeight: 420,
        },
        fieldname: {
            fontSize: '1.00rem',
            fontWeight: 400,
        },
        eroles: {
            fontSize: '1.00rem',
            fontWeight: 420,
        },
        wtitle: {
            fontSize: '1.00rem',
            fontWeight: 350,
            fontStyle: 'italic'
        },
        mtitle: {
            fontSize: '1.00rem',
            fontWeight: 450,
        },
        description: {
            fontSize: '0.95rem',
        },
        agentprefix: {
            fontSize: '1.00rem',
            fontWeight: 400,
            fontStyle: 'italic'
        },
        agentname: {
            fontSize: '1.00rem',
            fontWeight: 400
        },
        relatedprefix: {
            fontSize: '0.95rem',
            fontStyle: 'italic'
        },
        relatedlabel: {
            fontSize: '0.95rem',
        },
        contentsprefix: {
            fontSize: '0.95rem',
        },
        contents: {
            fontSize: '0.95rem',
            fontStyle: 'italic'
        }
    }
});