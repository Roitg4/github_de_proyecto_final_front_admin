import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Toast(props) {

    const { openSnack, setOpenSnack, mensaje } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    return (
        <>
            <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleClose}
                    severity={mensaje.severity}
                >
                    {mensaje.contenido}
                </MuiAlert>
            </Snackbar>
        </>
    )

}