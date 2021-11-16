import React, { useState } from 'react';
import {
    Box,
    Button,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField,
} from '@mui/material';
import { Print, Close, AttachMoney } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import moment from 'moment';

export default function ModalMostrarUno(props) {

    const { alojamientoAMostrar, onClose } = props;

    const alojamiento = {
        nombre: alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].nombre ? alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].nombre : 'Vacio',
        fecha_inicio: alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].fecha_inicio ? alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].fecha_inicio : 'Vacio',
        fecha_fin: alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].fecha_fin ? alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].fecha_fin : 'Vacio',
        tarifa: alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].tarifa ? alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].tarifa : 'Vacio',
        tipo_nombre: alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].TipoMoneda ? alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].TipoMoneda.nombre : 'Vacio',
        tipo_codigo: alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].TipoMoneda ? alojamientoAMostrar[Object.keys(alojamientoAMostrar)[0]].TipoMoneda.codigo : 'Vacio'
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
                Tarifa
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
                    label="Nombre"
                    defaultValue={alojamiento.nombre}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
            </Box>

            <Stack m={1} ml={3} mr={3} spacing={2} direction="row">
                <TextField
                    label="Fecha Inicio"
                    defaultValue={moment(alojamiento.fecha_inicio).format('DD/MM/YYYY')}
                    multiline
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>

                <TextField
                    label="Fecha Fin"
                    defaultValue={moment(alojamiento.fecha_fin).format('DD/MM/YYYY')}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
            </Stack>

            <Box m={1.5} ml={3} mr={3}>
                <TextField
                    label="Tarifa"
                    defaultValue={alojamiento.tarifa}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachMoney />
                            </InputAdornment>
                        ),
                    }}
                >
                </TextField>
            </Box>

            <Stack m={1} ml={3} mr={3} spacing={2} direction="row">
                <TextField
                    label="Código"
                    defaultValue={alojamiento.tipo_codigo}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>

                <TextField
                    label="Moneda"
                    defaultValue={alojamiento.tipo_nombre}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
            </Stack>

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