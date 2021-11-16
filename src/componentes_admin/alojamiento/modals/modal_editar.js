import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import {
    Box,
    Button,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    IconButton,
    FormControl,
    FormHelperText,
    MenuItem,
    Stack,
    Select,
    TextField
} from '@mui/material';
import { Edit, Cancel, Close } from '@mui/icons-material';

import gestorAxios from '../../../config/axios';

export default function ModalEditar(props) {

    const { alojamientoAEditar, alojamientoEstado, alojamientoTipo, onClose, setBoolCargando, setMsgSnack, setOpenSnack } = props;

    //CONTROLL
    const { control, handleSubmit, formState } = useForm({

        defaultValues: {
            capacidad: alojamientoAEditar[0].capacidad || '',
            descripcion: alojamientoAEditar[0].descripcion || '',
            TipoAlojamientoId: alojamientoAEditar[0].TipoAlojamiento.id || '',
            EstadoAlojamientoId: alojamientoAEditar[0].EstadoAlojamiento.id || '',
        }
    });
    const { errors } = formState;
    const onFormSubmit = data => editarAlojamiento(data);

    const valorInicial = {
        id: alojamientoAEditar[0].id,
        capacidad: alojamientoAEditar[0].capacidad,
        descripcion: alojamientoAEditar[0].descripcion,
        TipoAlojamientoId: alojamientoAEditar[0].TipoAlojamiento.id,
        EstadoAlojamientoId: alojamientoAEditar[0].EstadoAlojamiento.id,
    }

    /* MODAL EDITAR*/
    const [openEdit, setOpenEdit] = useState(false);

    const openCloseModalEdit = () => {
        setOpenEdit(!openEdit);
        onClose();
    };

    /* METODO EDITAR*/
    let token = localStorage.getItem('token');

    async function editarAlojamiento(data) {

        const respuesta = await gestorAxios.put(`/alojamiento/editar/${valorInicial.id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (respuesta.status === 200) {
            /* console.log('Usuario editado\n', respuesta); */
            setBoolCargando(false);
            setMsgSnack({
                contenido: 'Se edito correctamente el Alojamiento',
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
                Editar Alojamiento
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
                    Formulario para editar el Alojamiento
                </DialogContentText>
            </DialogContent>

            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Box m={2} ml={3} mr={3}>
                    <Controller
                        name="capacidad"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel error={!!errors["capacidad"]}>Capacidad</InputLabel>
                                <Select
                                    label="Capacidad"
                                    {...field}
                                    error={!!errors["capacidad"]}
                                >
                                    <MenuItem value="">
                                        <em>Nada</em>
                                    </MenuItem>
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                </Select>
                                <FormHelperText error={!!errors["capacidad"]}
                                >
                                    {errors["capacidad"] ? 'No deje el campo vacio' : ''}
                                </FormHelperText>
                            </FormControl>
                        }
                    />
                </Box>

                <Box m={2} mr={3} ml={3}>
                    <Controller
                        name="descripcion"
                        variant="outlined"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <TextField
                                autoFocus
                                label="Descripción"
                                fullWidth
                                multiline
                                {...field}
                                error={!!errors["descripcion"]}
                                helperText={errors["descripcion"] ? 'No deje el campo vacio' : ''}
                            />
                        }
                    />
                </Box>

                <Stack m={1} mr={3} ml={3} spacing={2} direction="row">
                    <Controller
                        name="TipoAlojamientoId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel error={!!errors["TipoAlojamientoId"]}>Tipo de Alojamiento</InputLabel>
                                <Select
                                    label="Tipo de Alojamiento"
                                    {...field}
                                    error={!!errors["TipoAlojamientoId"]}
                                >
                                    <MenuItem value="">
                                        <em>Nada</em>
                                    </MenuItem>
                                    {alojamientoTipo.map(item =>
                                        <MenuItem key={item.id} value={item.id}>{item.tipo_alojamiento}</MenuItem>
                                    )}
                                </Select>
                                <FormHelperText error={!!errors["TipoAlojamientoId"]}
                                >
                                    {errors["TipoAlojamientoId"] ? 'No deje el campo vacio' : ''}
                                </FormHelperText>
                            </FormControl>
                        }
                    />

                    <Controller
                        name="EstadoAlojamientoId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel error={!!errors["EstadoAlojamientoId"]}>Estado de Alojamiento</InputLabel>
                                <Select
                                    label="Estado de Alojamiento"
                                    {...field}
                                    error={!!errors["EstadoAlojamientoId"]}
                                >
                                    <MenuItem value="">
                                        <em>Nada</em>
                                    </MenuItem>
                                    {alojamientoEstado.map(item =>
                                        <MenuItem key={item.id} value={item.id}>{item.estado_alojamiento}</MenuItem>
                                    )}
                                </Select>
                                <FormHelperText error={!!errors["EstadoAlojamientoId"]}
                                >
                                    {errors["EstadoAlojamientoId"] ? 'No deje el campo vacio' : ''}
                                </FormHelperText>
                            </FormControl>
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