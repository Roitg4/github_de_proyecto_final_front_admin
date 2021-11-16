import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { Print, Close } from '@mui/icons-material';

export default function ModalMostrarUno(props) {

    const { tipoAMostrar, onClose } = props;

    const tipo = {
        tipo_usuario: tipoAMostrar[Object.keys(tipoAMostrar)[0]].tipo_usuario ? tipoAMostrar[Object.keys(tipoAMostrar)[0]].tipo_usuario : 'Vacio',
    }

    /* MODAL MOSTRAR UNO*/
    const [openWatch, setOpenWatch] = useState(false);

    const openCloseModalWatchOne = () => {
        setOpenWatch(!openWatch);
        onClose();
    };

    return (

        <>

            <DialogTitle>
                Rango de Usuario
            </DialogTitle>

            <Box m={1} ml={3} mr={3}>
                <TextField
                    label="Capacidad"
                    defaultValue={tipo.tipo_usuario}
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                >
                </TextField>
            </Box>

            <br />
            <DialogActions>

                <Button
                    variant="outlined"
                    color='info'
                    disabled
                    startIcon={<Print />}
                >
                    Imprimir
                </Button>

                <Button
                    variant="outlined"
                    color='primary'
                    onClick={() => openCloseModalWatchOne()}
                    endIcon={<Close />}
                >
                    Cerrar
                </Button>
            </DialogActions>

        </>
    )
}