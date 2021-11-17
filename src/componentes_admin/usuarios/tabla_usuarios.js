import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    LinearProgress
} from '@mui/material';

import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Delete, Visibility, Create, AddCircle } from '@mui/icons-material';
import Title from '../_global/title';
/* import SearchBar from "material-ui-search-bar"; */

// IMPORTACIONES LOCALES
import * as extraService from '../../servicios/extra.service';
import ModalCrear from './modals/modal_crear';
import ModalMostrarUno from './modals/modal_mostrar-uno';
import ModalEditar from './modals/modal_editar';
import ModalEliminar from './modals/modal_eliminar';
import Snackbar from '../_global/snackbar';

export default function TablaAlojamientos() {

    //SNACKBAR
    const valorInicial = {
        contenido: '¡Oops! Algo salio mal',
        severity: 'error'
    }
    const [openSnack, setOpenSnack] = useState(false);
    const [msgSnack, setMsgSnack] = useState(valorInicial);

    /* MODAL CREAR*/
    const [openCreate, setOpenCreate] = useState(false);

    const openCloseModalCreate = () => {
        setOpenCreate(!openCreate);
    };

    /* MODAL MOSTRAR UNO*/
    const [openWathc, setOpenWatch] = useState(false);
    const [UsuarioAMostrar, setAlojamientoAMostrar] = useState(0);

    const openCloseModalWatchOne = (e) => {
        if (!openWathc) {
            const _usuariosAMostrar = usuarios.filter(function (item) {
                return item.id === parseInt(e.currentTarget.id)
            })
            setAlojamientoAMostrar(_usuariosAMostrar);
        }
        setOpenWatch(!openWathc);
    };

    /* MODAL EDITAR*/
    const [openEdit, setOpenEdit] = useState(false);
    const [usuarioAEditar, setAlojamientoAEditar] = useState();

    const openCloseModalEdit = (e) => {

        if (!openEdit) {
            const _usuarioAEditar = usuarios.filter(function (item) {
                return item.id === parseInt(e.currentTarget.id)
            })
            setAlojamientoAEditar(_usuarioAEditar);
        }
        setOpenEdit(!openEdit);
    };

    /* MODAL ELIMINAR*/
    const [openDelete, setOpenDelete] = useState(false);
    const [usuarioAEliminar, setUsuarioAEliminar] = useState(0);

    const openCloseModalDelete = (e) => {

        if (!openDelete) {
            const id_usuario = parseInt(e.currentTarget.id);
            setUsuarioAEliminar(id_usuario);
        }
        setOpenDelete(!openDelete);
    };

    //PAGINATION
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /* METODO MOSTRAR TODOS */
    let token = localStorage.getItem('token');
    //ESTADOS ALOJAMIENTO
    const [usuarios, setGuardarAlojamientos] = useState([]);
    const [alojamientosMostrar, setAlojamientosMostrar] = useState([]);

    const [usuarioTipo, setUsuarioTipo] = useState([]);

    const [boolCargando, setBoolCargando] = useState(false);
    /* const [textoBuscar, setTextoBuscar] = useState(""); */

    useEffect(() => {

        if (!boolCargando) {

            setBoolCargando(true);

            extraService.Usuario_get(token).then(res => {

                setGuardarAlojamientos(res)
                setAlojamientosMostrar(res)
            })

            extraService.tipoUsuario_get(token).then(res => {

                setUsuarioTipo(res)
            })

        }
    }, [usuarios, boolCargando, openSnack, alojamientosMostrar]);

    let emptyRows =
        rowsPerPage - Math.min(rowsPerPage, alojamientosMostrar.length - page * rowsPerPage);

    /* useEffect(() => {

        let items = alojamientos.slice();
        items = items.filter(item => item.nombre.toUpperCase().includes(textoBuscar.toUpperCase()));

        setAlojamientosMostrar(items)
        emptyRows =
            rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

    }, [textoBuscar]) */

    /* TABLA CEBRA */
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    let num = 1;

    return (
        <React.Fragment>
            <Title>Lista de Usuarios</Title>

            <div style={{ width: '100%', height: '400' }}>
                {/* <Box mr={85} mb={2}>
                    <SearchBar
                        placeholder="Barra de búsqueda"
                        value={textoBuscar}
                        onChange={(newValue) => setTextoBuscar(newValue)}
                        onCancelSearch={() => setTextoBuscar('')}
                    />
                </Box> */}

                <Box sx={{ float: 'right' }} mb={2}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => openCloseModalCreate()}
                        startIcon={<AddCircle />}
                    >
                        Crear Usuario
                    </Button>
                </Box>
            </div>

            {alojamientosMostrar.length > 0 ?
                <div>
                    <Table sx={{ minWidth: 700 }} aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Orden</StyledTableCell>
                                <StyledTableCell>Nombre</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Rango</StyledTableCell>
                                <StyledTableCell align="right">Opciones</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {alojamientosMostrar.length ?
                            <TableBody>
                                {alojamientosMostrar.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(tipo =>
                                        <StyledTableRow key={tipo.id}>
                                            <StyledTableCell scope="row">{num++}</StyledTableCell>
                                            <StyledTableCell>{tipo.nombre}</StyledTableCell>
                                            <StyledTableCell>{tipo.email}</StyledTableCell>
                                            <StyledTableCell>{tipo.TipoUsuario && tipo.TipoUsuario.tipo_usuario}</StyledTableCell>
                                            <StyledTableCell align="right">

                                                <Box>
                                                    <IconButton
                                                        color="info"
                                                        id={tipo.id}
                                                        onClick={
                                                            (e) => openCloseModalWatchOne(e)}>
                                                        <Visibility />
                                                    </IconButton>

                                                    <IconButton
                                                        color="primary"
                                                        id={tipo.id}
                                                        onClick={(e) => openCloseModalEdit(e)}>
                                                        <Create />
                                                    </IconButton>

                                                    <IconButton
                                                        color="error"
                                                        id={tipo.id}
                                                        onClick={(e) => openCloseModalDelete(e)}>
                                                        <Delete />
                                                    </IconButton>
                                                </Box>

                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )}
                            </TableBody>
                            :
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Cargando...
                                    </TableCell>
                                </TableRow>
                            </TableBody>}
                        {emptyRows > 0 && (
                            <TableBody>
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>

                    {/* MENSAJE DE CONFIRMACION */}
                    <Snackbar
                        openSnack={openSnack}
                        setOpenSnack={setOpenSnack}
                        mensaje={msgSnack}
                    />
                    {/*  */}

                    {/* MODAL MOSTRAR UNO */}
                    <Dialog
                        open={openWathc}
                        onClose={(event, reason) => {
                            if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                                openCloseModalWatchOne();
                            }
                        }}
                        fullWidth
                        maxWidth='sm'
                    >
                        <ModalMostrarUno
                            onClose={(event, reason) => {
                                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                                    openCloseModalWatchOne();
                                }
                            }}
                            UsuarioAMostrar={UsuarioAMostrar}
                        />
                    </Dialog>
                    {/*  */}

                    {/* MODAL EDITAR */}
                    <Dialog
                        open={openEdit}
                        onClose={(event, reason) => {
                            if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                                openCloseModalEdit();
                            }
                        }}
                        fullWidth
                        maxWidth='sm'
                    >
                        <ModalEditar
                            onClose={(event, reason) => {
                                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                                    openCloseModalEdit();
                                }
                            }}
                            usuarioAEditar={usuarioAEditar}
                            setOpenSnack={setOpenSnack}
                            setMsgSnack={setMsgSnack}
                            usuarioTipo={usuarioTipo}
                            setBoolCargando={setBoolCargando}
                        />
                    </Dialog>
                    {/*  */}

                    {/* MODAL ELIMINAR */}
                    <Dialog
                        open={openDelete}
                        onClose={(event, reason) => {
                            if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                                openCloseModalDelete();
                            }
                        }}
                        fullWidth
                        maxWidth='sm'
                    >
                        <ModalEliminar
                            onClose={(event, reason) => {
                                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                                    openCloseModalDelete();
                                }
                            }}
                            setBoolCargando={setBoolCargando}
                            usuarioAEliminar={usuarioAEliminar}
                            setUsuarioAEliminar={setUsuarioAEliminar}
                            setOpenSnack={setOpenSnack}
                            setMsgSnack={setMsgSnack} />
                    </Dialog>
                    {/*  */}

                    <TablePagination
                        rowsPerPageOptions={[5,10]}
                        component="div"
                        count={alojamientosMostrar.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
                :
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            }

            {/* MODAL CREAR */}
            <Dialog
                open={openCreate}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        openCloseModalCreate();
                    }
                }}
                fullWidth
                maxWidth='sm'
            >
                <ModalCrear
                    onClose={(event, reason) => {
                        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                            openCloseModalCreate();
                        }
                    }}
                    setBoolCargando={setBoolCargando}
                    setOpenSnack={setOpenSnack}
                    setMsgSnack={setMsgSnack}
                    usuarioTipo={usuarioTipo} />
            </Dialog>
            {/*  */}

        </React.Fragment>
    );

}