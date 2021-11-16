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

    /* MODAL CREAR*/
    const [open_create, setOpen] = useState(false);

    const openCloseModalC = () => {
        setOpen(!open_create);
        onClose();
    };

    //CONTROLL
    const { control, handleSubmit, formState } = useForm({

        defaultValues: {
            tipo_alojamiento: '',
        }
    });
    const { errors } = formState;
    const onFormSubmit = data => crearAlojamientoTipo(data);

    /* METODO CREAR */
    let token = localStorage.getItem('token');

    const crearAlojamientoTipo = async data => {

        const respuesta = await gestorAxios.post('/alojamiento-tipo/nuevo', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (respuesta.status === 200) {

            /* console.log('Usuario Creado') */
            setBoolCargando(false);
            setMsgSnack({
                contenido: 'Se creo correctamente el Tipo de Alojamiento',
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
            Crear Tipo de Alojamiento
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
                Formulario para crear un nuevo Tipo de Alojamiento
            </DialogContentText>
        </DialogContent>

        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Box mr={3} ml={3}>
                <Controller
                    name="tipo_alojamiento"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) =>
                        <TextField
                            autoFocus
                            fullWidth
                            label="Tipo de Alojamiento"
                            {...field}
                            error={!!errors["tipo_alojamiento"]}
                            helperText={errors["tipo_alojamiento"] ? 'Complete el dato faltante' : ''}
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