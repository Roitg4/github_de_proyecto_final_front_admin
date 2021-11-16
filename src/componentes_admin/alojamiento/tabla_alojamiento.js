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
import { Delete, Visibility, Create, ControlPoint } from '@mui/icons-material';
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
    const [alojamientoAMostrar, setAlojamientoAMostrar] = useState(0);

    const openCloseModalWatchOne = (e) => {
        if (!openWathc) {
            /* console.log('e.current', e); */
            /* const id_alojamiento = parseInt(e.currentTarget.id); */
            const _alojamientoAMostrar = alojamientos.filter(function (item) {
                return item.id === parseInt(e.currentTarget.id)
            })
            /* console.log('alojamiento a mostrar: ', _alojamientoAMostrar); */
            setAlojamientoAMostrar(_alojamientoAMostrar);
        }
        setOpenWatch(!openWathc);
    };

    /* MODAL EDITAR*/
    const [openEdit, setOpenEdit] = useState(false);
    const [alojamientoAEditar, setAlojamientoAEditar] = useState();

    const openCloseModalEdit = (e) => {

        if (!openEdit) {
            const _alojamientoAEditar = alojamientos.filter(function (item) {
                return item.id === parseInt(e.currentTarget.id)
            })
            setAlojamientoAEditar(_alojamientoAEditar);
        }
        setOpenEdit(!openEdit);
    };

    /* MODAL ELIMINAR*/
    const [openDelete, setOpenDelete] = useState(false);
    const [alojamientoAEliminar, setAlojamientoAEliminar] = useState(0);

    const openCloseModalDelete = (e) => {

        if (!openDelete) {
            const id_alojamiento = parseInt(e.currentTarget.id);
            setAlojamientoAEliminar(id_alojamiento);
        }
        setOpenDelete(!openDelete);
    };

    //PAGINATION
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    const [alojamientos, setGuardarAlojamientos] = useState([]);
    const [alojamientosMostrar, setAlojamientosMostrar] = useState([]);

    const [alojamientoTipo, setAlojamientoTipo] = useState([]);
    const [alojamientoEstado, setAlojamientoEstado] = useState([]);

    const [boolCargando, setBoolCargando] = useState(false);
    /* const [textoBuscar, setTextoBuscar] = useState(""); */

    useEffect(() => {

        if (!boolCargando) {

            setBoolCargando(true);

            extraService.alojamiento_get(token).then(res => {

                setGuardarAlojamientos(res)
                setAlojamientosMostrar(res)
            })

            extraService.alojamientoTipo_get(token).then(res => {

                setAlojamientoTipo(res)
            })

            extraService.alojamientoEstado_get(token).then(res => {

                setAlojamientoEstado(res)
            })
        }
    }, [alojamientos, boolCargando, openSnack, alojamientosMostrar]);

    let emptyRows =
        rowsPerPage - Math.min(rowsPerPage, alojamientosMostrar.length - page * rowsPerPage);

    /* useEffect(() => {

        let items = alojamientos.slice();
        items = items.filter(item => item.capacidad.toUpperCase().includes(textoBuscar.toUpperCase()));

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
            <Title>Lista de Alojamientos</Title>

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
                        startIcon={<ControlPoint />}
                    >
                        Crear Alojamiento
                    </Button>
                </Box>
            </div>

            {alojamientosMostrar.length > 0 ?
                <div>
                    <Table sx={{ minWidth: 700 }} aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Orden</StyledTableCell>
                                <StyledTableCell>Tipo</StyledTableCell>
                                <StyledTableCell>Estado</StyledTableCell>
                                <StyledTableCell>Capacidad</StyledTableCell>
                                <StyledTableCell align="right">Opciones</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {alojamientosMostrar.length ?
                            <TableBody>
                                {alojamientosMostrar.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(tipo =>
                                        <StyledTableRow key={tipo.id}>
                                            <StyledTableCell scope="row">{num++}</StyledTableCell>
                                            <StyledTableCell>{tipo.TipoAlojamiento && tipo.TipoAlojamiento.tipo_alojamiento}</StyledTableCell>
                                            <StyledTableCell>{tipo.EstadoAlojamiento && tipo.EstadoAlojamiento.estado_alojamiento}</StyledTableCell>
                                            <StyledTableCell align="center">{tipo.capacidad}</StyledTableCell>
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
                            alojamientoAMostrar={alojamientoAMostrar}
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
                            alojamientoAEditar={alojamientoAEditar}
                            setOpenSnack={setOpenSnack}
                            setMsgSnack={setMsgSnack}
                            alojamientoEstado={alojamientoEstado}
                            alojamientoTipo={alojamientoTipo}
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
                            alojamientoAEliminar={alojamientoAEliminar}
                            setAlojamientoAEliminar={setAlojamientoAEliminar}
                            setOpenSnack={setOpenSnack}
                            setMsgSnack={setMsgSnack} />
                    </Dialog>
                    {/*  */}

                    <TablePagination
                        rowsPerPageOptions={[5, 10]}
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
                    alojamientoEstado={alojamientoEstado}
                    alojamientoTipo={alojamientoTipo} />
            </Dialog>
            {/*  */}

        </React.Fragment>
    );

}