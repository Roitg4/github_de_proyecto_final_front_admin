import React, { useState } from 'react';
import {
    Button,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Stack
} from '@mui/material'
import { Delete, Cancel, Close } from '@mui/icons-material';

import gestorAxios from '../../../../config/axios';

export default function ModalEliminar(props) {

    const { onClose, tipoAEliminar, setTipoAEliminar, setBoolCargando, setMsgSnack, setOpenSnack } = props;

    // MODAL ELIMINAR
    const [openDelete, setOpenDelete] = useState(false);

    const openClosedModalD = () => {
        setOpenDelete(!openDelete);
        onClose();
    };

    /* METODO ELIMINAR */
    let token = localStorage.getItem('token');
    async function eliminarAlojamientoTipo() {

        if (tipoAEliminar === undefined) {

            console.log('No hay id');
            return false;
        }

        const data = tipoAEliminar;

        const respuesta = await gestorAxios.delete('/tipo-moneda/eliminar/' + data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (respuesta.status === 200) {
            setTipoAEliminar(0);
            setBoolCargando(false);
            setMsgSnack({
                contenido: 'Se elimino correctamente el Tipo de Moneda',
                severity: 'success'
            });
            setOpenSnack(true);
        } else {
            setBoolCargando(false);
            setMsgSnack({
                contenido: '¡Oops! La acción no se pudo realizar',
                severity: 'error'
            });
            setOpenSnack(true);
        }
        onClose();

    }

    return (<>

        <DialogTitle sx={{ fontSize: 'h5.fontSize' }}>
            Eliminar Tipo de Moneda
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
        <DialogContent>
            <DialogContentText>
                ¿Esta seguro que desea eliminar esta Moneda permanentemente?
            </DialogContentText>
        </DialogContent>

        <Stack m={2} mr={3} ml={3} spacing={1} direction="row-reverse">
            <Button
                variant="contained"
                color='error'
                onClick={() => eliminarAlojamientoTipo()}
                endIcon={<Delete />}
            >
                Si, eliminar
            </Button>

            <Button
                variant="contained"
                color='primary'
                onClick={() => openClosedModalD()}
                startIcon={<Cancel />}
            >
                Cancelar
            </Button>
        </Stack>
    </>);
}