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
import { Edit, Cancel, Close } from '@mui/icons-material';

import gestorAxios from '../../../config/axios';

export default function ModalEditar(props) {

    const { tipoAEditar, onClose, setBoolCargando, setMsgSnack, setOpenSnack } = props;

    //CONTROLL
    const { control, handleSubmit, formState } = useForm({

        defaultValues: {
            tipo_usuario: tipoAEditar[0].tipo_usuario || '',
        }
    });
    const { errors } = formState;
    const onFormSubmit = data => editarTipoUsuario(data);

    const valorInicial = {
        id: tipoAEditar[0].id,
        tipo_usuario: tipoAEditar[0].tipo_usuario,
    }

    /* MODAL EDITAR*/
    const [openEdit, setOpenEdit] = useState(false);

    const openCloseModalEdit = () => {
        setOpenEdit(!openEdit);
        onClose();
    };

    /* METODO EDITAR*/
    let token = localStorage.getItem('token');

    async function editarTipoUsuario(data) {

        const respuesta = await gestorAxios.put(`/tipo-usuario/editar/${valorInicial.id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (respuesta.status === 200) {
            setBoolCargando(false);
            setMsgSnack({
                contenido: 'Se edito correctamente el Rango de Usuario',
                severity: 'success'
            });
            setOpenSnack(true);
            onClose();
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

    return (

        <>
            <DialogTitle sx={{ fontSize: 'h5.fontSize' }}>
                Editar Rango de Usuario
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
                    Formulario para editar al Rango del Usuario
                </DialogContentText>
            </DialogContent>

            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Box mr={3} ml={3}>
                    <Controller
                        name="tipo_usuario"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <TextField
                                autoFocus
                                fullWidth
                                label="Rango de Usuario"
                                {...field}
                                error={!!errors["tipo_usuario"]}
                                helperText={errors["tipo_usuario"] ? 'No deje el campo vacio' : ''}
                            />
                        }
                    />
                </Box>

                <Stack m={2} mr={3} ml={3} spacing={1} direction="row-reverse">
                    <Button
                        variant="contained"
                        color="primary"
                        type='submit'
                        endIcon={<Edit />}
                    >
                        Editar
                    </Button>

                    <Button
                        variant="contained"
                        color='error'
                        onClick={() => openCloseModalEdit()}
                        startIcon={<Cancel />}
                    >
                        Cancelar
                    </Button>
                </Stack>
            </form>

        </>
    );

}