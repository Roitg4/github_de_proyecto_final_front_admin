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
    InputAdornment,
    Stack,
    Select,
    TextField
} from '@mui/material';
import { Edit, Cancel, Close, AttachMoney } from '@mui/icons-material';
import {
    DatePicker,
    LocalizationProvider,
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import frLocale from 'date-fns/locale/fr';

import gestorAxios from '../../../config/axios';

export default function ModalEditar(props) {

    const { alojamientoAEditar, tipoMoneda, onClose, setBoolCargando, setMsgSnack, setOpenSnack } = props;

    //CONTROLL
    const { control, handleSubmit, formState } = useForm({

        defaultValues: {
            nombre: alojamientoAEditar[0].nombre || '',
            fecha_inicio: alojamientoAEditar[0].fecha_inicio || '',
            fecha_fin: alojamientoAEditar[0].fecha_fin || '',
            tarifa: alojamientoAEditar[0].tarifa || '',
            TipoMonedaId: alojamientoAEditar[0].TipoMoneda.id || '',
        }
    });
    const { errors } = formState;
    const onFormSubmit = data => editarAlojamiento(data);

    const valorInicial = {
        id: alojamientoAEditar[0].id,
        nombre: alojamientoAEditar[0].nombre,
        fecha_inicio: alojamientoAEditar[0].fecha_inicio,
        fecha_fin: alojamientoAEditar[0].fecha_fin,
        tarifa: alojamientoAEditar[0].tarifa,
        TipoMonedaId: alojamientoAEditar[0].TipoMoneda.id,
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

        const respuesta = await gestorAxios.put(`/tarifa/editar/${valorInicial.id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (respuesta.status === 200) {
            /* console.log('Usuario editado\n', respuesta); */
            setBoolCargando(false);
            setMsgSnack({
                contenido: 'Se edito correctamente la Tarifa',
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
                Editar Tarifa
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
                    Formulario para editar la Tarifa
                </DialogContentText>
            </DialogContent>

            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Stack m={1} ml={5.8} spacing={2} direction="row">
                    <Controller
                        name="fecha_inicio"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                                <DatePicker
                                    fullWidth
                                    label="Fecha Inicial"
                                    {...field}
                                    error={!!errors["fecha_inicio"]}
                                    helperText={errors["fecha_inicio"] ? 'No deje el campo vacio' : ''}
                                    value={field.value}
                                    onChange={(newValue) => {
                                        field.onChange(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        }
                    />

                    <Controller
                        name="fecha_fin"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                                <DatePicker
                                    fullWidth
                                    label="Fecha Fin"
                                    {...field}
                                    error={!!errors["fecha_fin"]}
                                    helperText={errors["fecha_fin"] ? 'No deje el campo vacio' : ''}
                                    value={field.value}
                                    onChange={(newValue) => {
                                        field.onChange(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        }
                    />
                </Stack>

                <Box m={2} mr={3} ml={3}>
                    <Controller
                        name="nombre"
                        variant="outlined"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <TextField
                                autoFocus
                                fullWidth
                                label="Nombre"
                                {...field}
                                error={!!errors["nombre"]}
                                helperText={errors["nombre"] ? 'No deje el campo vacio' : ''}
                            />
                        }
                    />
                </Box>

                <Stack m={2} ml={3} mr={3} spacing={2} direction="row">
                    <Controller
                        name="tarifa"
                        variant="outlined"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <TextField
                                fullWidth
                                label="Tarifa"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoney />
                                        </InputAdornment>
                                    ),
                                }}
                                {...field}
                                error={!!errors["tarifa"]}
                                helperText={errors["tarifa"] ? 'No deje el campo vacio' : ''}
                            />
                        }
                    />

                    <Controller
                        name="TipoMonedaId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel error={!!errors["TipoMonedaId"]}>Tipo de Moneda</InputLabel>
                                <Select
                                    label="Tipo de Moneda"
                                    {...field}
                                    error={!!errors["TipoMonedaId"]}
                                >
                                    <MenuItem value="">
                                        <em>Nada</em>
                                    </MenuItem>
                                    {tipoMoneda.map(item =>
                                        <MenuItem key={item.id} value={item.id}>{item.nombre}</MenuItem>
                                    )}
                                </Select>
                                <FormHelperText error={!!errors["TipoMonedaId"]}
                                >
                                    {errors["TipoMonedaId"] ? 'No deje el campo vacio' : ''}
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