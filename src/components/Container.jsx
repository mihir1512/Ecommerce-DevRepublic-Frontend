import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function MuiContainer({ children }) {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl" style={{ paddingTop: 10, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {children}
            </Container>
        </React.Fragment>
    );
}
