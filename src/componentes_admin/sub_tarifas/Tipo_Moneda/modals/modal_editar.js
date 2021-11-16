import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import {
    Button,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
    Stack
} from '@mui/material'
import { Edit, Cancel, Close } from '@mui/icons-material';

import gestorAxios from '../../../../config/axios';

export default function ModalEditar(props) {

    const { tipoAEditar, onClose, setBoolCargando, setMsgSnack, setOpenSnack } = props;

    //CONTROLL
    const { control, handleSubmit, formState } = useForm({

        defaultValues: {
            nombre: tipoAEditar[0].nombre || '',
            codigo: tipoAEditar[0].codigo || '',
        }
    });
    const { errors } = formState;
    const onFormSubmit = data => editarAlojamientoTipo(data);

    const valorInicial = {
        id: tipoAEditar[0].id,
        nombre: tipoAEditar[0].nombre,
        codigo: tipoAEditar[0].codigo,
    }

    /* MODAL EDITAR*/
    const [openEdit, setOpenEdit] = useState(false);

    const openCloseModalEdit = () => {
        setOpenEdit(!openEdit);
        onClose();
    };


    /* METODO EDITAR*/
    let token = localStorage.getItem('token');

    async function editarAlojamientoTipo(data) {

        const respuesta = await gestorAxios.put(`/tipo-moneda/editar/${valorInicial.id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (respuesta.status === 200) {
            setBoolCargando(false);
            setMsgSnack({
                contenido: 'Se edito correctamente el Tipo de Moneda',
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
                Editar Tipo de Moneda
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
                    Formulario para editar al Tipo de Alojamiento
                </DialogContentText>
            </DialogContent>

            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Stack m={2} mr={3} ml={3} spacing={2} direction="row">
                    <Controller
                        name="codigo"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <TextField
                                autoFocus
                                fullWidth
                                label="Código"
                                {...field}
                                error={!!errors["codigo"]}
                                helperText={errors["codigo"] ? 'Complete el dato faltante' : ''}
                            />
                        }
                    />

                    <Controller
                        name="nombre"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <TextField
                                fullWidth
                                label="Nombre"
                                {...field}
                                error={!!errors["nombre"]}
                                helperText={errors["nombre"] ? 'Complete el dato faltante' : ''}
                            />
                        }
                    />
                </Stack>

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