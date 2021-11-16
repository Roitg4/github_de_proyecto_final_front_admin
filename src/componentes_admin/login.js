import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    IconButton,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material'

import {
    LockOutlined,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useHistory } from "react-router-dom";

import { useUserDispatch, loginUser, useUserState } from "./../context/userContext";

import GestorAxios from "./../config/axios";

export default function SignIn() {
    const theme = createTheme();

    // context
    var userDispatch = useUserDispatch();
    let history = useHistory();

    const { email: emailState } = useUserState();

    const userLogueado = emailState !== undefined;
    console.log('USER', userLogueado);

    if (userLogueado) {
        console.log('Push')
        history.push("/admin/inicio");
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {
        e.preventDefault();

        // Prepara el paquete a enviar al END-POINT login
        const data = {
            email: email,
            password: password,
        };

        console.log("Datos a enviar para login: ", data);

        await GestorAxios.post("/usuario-admin/login", data).then((res) => {

            console.log("llega respuesta login: ", res.data.data);

            loginUser(userDispatch, res.data.data.token, res.data.data.email, history);

            console.log("Estados actualizados!");

        });
    };

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
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar Sesión
                    </Typography>

                    <form onSubmit={login}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Correo Electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Contraseña"
                            name="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Recordarme el Correo Electrónico"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Iniciar Sesión
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    ¿Se te olvidó tu contraseña?
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}