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

    const { alojamientoAMostrar, onClose } = props;

    const alojamiento = {
        tipo_adicional: alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].tipo_adicional ? alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].tipo_adicional : 'Vacio',
        descripcion: alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].descripcion ? alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].descripcion : 'Vacio',
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
                Alojamiento
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

            <Box m={1.5} ml={3} mr={3}>
                <TextField
                    label="Adicional"
                    defaultValue={alojamiento.tipo_adicional}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
            </Box>

            <Box m={1} ml={3} mr={3}>
                <TextField
                    label="Descripción"
                    defaultValue={alojamiento.descripcion}
                    multiline
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
            </Box>

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