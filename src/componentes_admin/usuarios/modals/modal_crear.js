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
    AddCircle,
    Cancel,
    Close,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';

import gestorAxios from '../../../config/axios';

export default function ModalCrear(props) {

    const { usuarioTipo, onClose, setBoolCargando, setMsgSnack, setOpenSnack } = props;

    //CONTROLL
    const { control, handleSubmit, formState } = useForm({

        defaultValues: {
            nombre: '',
            password: '',
            email: '',
            TipoUsuarioId: '',
        }
    });
    const { errors } = formState;
    const onFormSubmit = data => crearAlojamiento(data);

    /* MODAL CREAR*/
    const [openCreate, setOpenCreate] = useState(false);

    const openCloseModalC = () => {
        setOpenCreate(!openCreate);
        onClose();
    };

    let token = localStorage.getItem('token');

    const crearAlojamiento = async data => {

        const respuesta = await gestorAxios.post('/usuario-admin/registro', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (respuesta.status === 200) {

            setBoolCargando(false);
            setMsgSnack({
                contenido: 'Se creo correctamente el Usuario',
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

    return (<>

        <DialogTitle sx={{ fontSize: 'h5.fontSize' }}>
            Crear Usuario
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
                Formulario para crear un nuevo Usuario
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
                            fullWidth
                            label="Nombre"
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