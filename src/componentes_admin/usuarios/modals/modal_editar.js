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
    InputAdornment,
    FormControl,
    FormHelperText,
    MenuItem,
    Stack,
    Select,
    TextField
} from '@mui/material';
import {
    Edit,
    Cancel,
    Close,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';

import gestorAxios from '../../../config/axios';

export default function ModalEditar(props) {

    const { usuarioAEditar, usuarioTipo, onClose, setBoolCargando, setMsgSnack, setOpenSnack } = props;

    //CONTROLL
    const { control, handleSubmit, formState } = useForm({

        defaultValues: {
            nombre: usuarioAEditar[0].nombre || '',
            password: usuarioAEditar[0].password || '',
            email: usuarioAEditar[0].email || '',
            TipoUsuarioId: usuarioAEditar[0].TipoUsuario.id || '',
        }
    });
    const { errors } = formState;
    const onFormSubmit = data => editarAlojamiento(data);

    const valorInicial = {
        id: usuarioAEditar[0].id,
        nombre: usuarioAEditar[0].nombre,
        password: usuarioAEditar[0].password,
        email: usuarioAEditar[0].password,
        TipoUsuarioId: usuarioAEditar[0].TipoUsuario.id,
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

        const respuesta = await gestorAxios.put(`/usuario-admin/editar/${valorInicial.id}`, data, {
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

    /* CONTRASEÑA OJO */
    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (

        <>
            <DialogTitle sx={{ fontSize: 'h5.fontSize' }}>
                Editar Usuario
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
                    Formulario para editar al Usuario
                </DialogContentText>
            </DialogContent>

            <form onSubmit={handleSubmit(onFormSubmit)}>

                <Stack m={1} mr={3} ml={3} spacing={2} direction="row">
                    <Controller
                        name="nombre"
                        variant="outlined"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <TextField
                                autoFocus
                                label="Nombre"
                                fullWidth
                                {...field}
                                error={!!errors["nombre"]}
                                helperText={errors["nombre"] ? 'No deje el campo vacio' : ''}
                            />
                        }
                    />

                    <Controller
                        name="TipoUsuarioId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel error={!!errors["TipoUsuarioId"]}>Rango de Usuario</InputLabel>
                                <Select
                                    label="Rango de Usuario"
                                    {...field}
                                    error={!!errors["TipoUsuarioId"]}
                                >
                                    <MenuItem value="">
                                        <em>Nada</em>
                                    </MenuItem>
                                    {usuarioTipo.map(item =>
                                        <MenuItem key={item.id} value={item.id}>{item.tipo_usuario}</MenuItem>
                                    )}
                                </Select>
                                <FormHelperText error={!!errors["TipoUsuarioId"]}
                                >
                                    {errors["TipoUsuarioId"] ? 'No deje el campo vacio' : ''}
                                </FormHelperText>
                            </FormControl>
                        }
                    />
                </Stack>

                <Box m={2} mr={3} ml={3}>
                    <Controller
                        name="email"
                        variant="outlined"
                        control={control}
                        rules={{ required: true, pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ }}
                        render={({ field }) =>
                            <TextField
                                fullWidth
                                label="Correo Electrónico"
                                {...field}
                                error={!!errors["email"]}
                                helperText={errors["email"] ? 'Tiene que proporcionar un email valido' : ''}
                            />
                        }
                    />
                </Box>

                <Box m={2} mr={3} ml={3}>
                    <Controller
                        name="password"
                        variant="outlined"
                        control={control}
                        rules={{ required: true, minLength: 8, maxLength: 12 }}
                        render={({ field }) =>
                            <TextField
                                fullWidth
                                label="Contraseña"
                                {...field}
                                error={!!errors["password"]}
                                helperText={errors["password"] ? 'La contraseña debe tener un mínimo de 8 y un máximo de 12 caracteres' : ''}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }}
                                type={values.showPassword ? 'text' : 'password'}

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