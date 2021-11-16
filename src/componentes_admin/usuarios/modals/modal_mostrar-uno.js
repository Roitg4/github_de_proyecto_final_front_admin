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

    const { UsuarioAMostrar, onClose } = props;

    const usuario = {
        nombre: UsuarioAMostrar[Object.keys(UsuarioAMostrar)[0]].nombre ? UsuarioAMostrar[Object.keys(UsuarioAMostrar)[0]].nombre : 'Vacio',
        password: UsuarioAMostrar[Object.keys(UsuarioAMostrar)[0]].password ? UsuarioAMostrar[Object.keys(UsuarioAMostrar)[0]].password : '[ Protegido ]',
        email: UsuarioAMostrar[Object.keys(UsuarioAMostrar)[0]].email ? UsuarioAMostrar[Object.keys(UsuarioAMostrar)[0]].email : 'Vacio',
        tipo: UsuarioAMostrar[Object.keys(UsuarioAMostrar)[0]].TipoUsuario ? UsuarioAMostrar[Object.keys(UsuarioAMostrar)[0]].TipoUsuario.tipo_usuario : 'Vacio'
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

            <Stack m={1} mr={3} ml={3} spacing={2} direction="row">
                <TextField
                    label="Nombre"
                    defaultValue={usuario.nombre}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>

                <TextField
                    label="Rango de Usuario"
                    defaultValue={usuario.tipo}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
            </Stack>

            <Box m={1.5} ml={3} mr={3}>
                <TextField
                    label="Correo Electrónico"
                    defaultValue={usuario.email}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
            </Box>

            <Box m={1} ml={3} mr={3}>
                <TextField
                    label="Contraseña"
                    value="[ Protegido ]"
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