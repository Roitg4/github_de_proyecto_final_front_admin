import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import {
    Box,
    Button,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
    Stack
} from '@mui/material'
import { AddCircle, Cancel, Close } from '@mui/icons-material';

import gestorAxios from '../../../../config/axios';

export default function ModalCrear(props) {

    const { onClose, setBoolCargando, setMsgSnack, setOpenSnack } = props;

    //CONTROLL
    const { control, handleSubmit, formState } = useForm({

        defaultValues: {
            estado_alojamiento: '',
        }
    });
    const { errors } = formState;
    const onFormSubmit = data => crearAlojamientoEstado(data);

    /* MODAL CREAR*/
    const [openCreate, setOpenCreate] = useState(false);

    const openCloseModalC = () => {
        setOpenCreate(!openCreate);
        onClose();
    };

    /* METODO CREAR */
    let token = localStorage.getItem('token');

    const crearAlojamientoEstado = async data => {

        const respuesta = await gestorAxios.post('/alojamiento-estado/nuevo', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (respuesta.status === 200) {
            setBoolCargando(false);
            setMsgSnack({
                contenido: 'Se creo correctamente el Estado de Alojamiento',
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
            Crear Estado del Alojamiento
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
                Formulario para crear un nuevo Estado
            </DialogContentText>
        </DialogContent>

        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Box mr={3} ml={3}>
                <Controller
                    name="estado_alojamiento"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) =>
                        <TextField
                            autoFocus
                            fullWidth
                            label="Estado de Alojamiento"
                            {...field}
                            error={!!errors["estado_alojamiento"]}
                            helperText={errors["estado_alojamiento"] ? 'Complete el dato faltante' : ''}
                            
                        />
                    }
                />
            </Box>

            <Stack m={2} mr={3} ml={3} spacing={1} direction="row-reverse">
                <Button
                    variant="contained"
                    color='success'
                    type='submit'
                    endIcon={<AddCircle />}
                >
                    Crear
                </Button>

                <Button
                    variant="contained"
                    color='error'
                    onClick={() => openCloseModalC()}
                    startIcon={<Cancel />}
                >
                    Cancelar
                </Button>
            </Stack>
        </form>

    </>);
}