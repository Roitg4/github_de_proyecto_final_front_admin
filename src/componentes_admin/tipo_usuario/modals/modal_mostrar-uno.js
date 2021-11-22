import React, { useState } from 'react';
import {
    Box,
    Button,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
} from '@mui/material';
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

            <DialogTitle sx={{ fontSize: 'h5.fontSize' }}>
                Usuario
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
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
            <Stack m={2} mr={3} ml={3} spacing={1} direction="row-reverse">
                <Button
                    variant="contained"
                    color='primary'
                    onClick={() => openCloseModalWatchOne()}
                    endIcon={<Close />}
                >
                    Cerrar
                </Button>

                <Button
                    variant="contained"
                    color='info'
                    disabled
                    startIcon={<Print />}
                >
                    Imprimir
                </Button>
            </Stack>

        </>
    )
}