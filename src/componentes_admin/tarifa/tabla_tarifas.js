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
import moment from 'moment';

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
            const _alojamientoAMostrar = tarifas.filter(function (item) {
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
            const _alojamientoAEditar = tarifas.filter(function (item) {
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
    const [tarifas, setGuardarTarifas] = useState([]);
    const [tarifasMostrar, setTarifasMostrar] = useState([]);

    const [tipoMoneda, setTipoMoneda] = useState([]);

    const [boolCargando, setBoolCargando] = useState(false);
    /* const [textoBuscar, setTextoBuscar] = useState(""); */

    useEffect(() => {

        if (!boolCargando) {

            setBoolCargando(true);

            extraService.tarifas_get(token).then(res => {

                setGuardarTarifas(res)
                setTarifasMostrar(res)
            })

            extraService.tipoMoneda_get(token).then(res => {

                setTipoMoneda(res)
            })

        }
    }, [tarifas, boolCargando, openSnack, tarifasMostrar]);

    let emptyRows =
        rowsPerPage - Math.min(rowsPerPage, tarifasMostrar.length - page * rowsPerPage);

    /* useEffect(() => {

        let items = tarifas.slice();
        items = items.filter(item => item.nombre.toUpperCase().includes(textoBuscar.toUpperCase()));

        setTarifasMostrar(items)
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
            <Title>Lista de Tarifas</Title>

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
                        Crear Tarifa
                    </Button>
                </Box>
            </div>

            {tarifasMostrar.length > 0 ?
                <div>
                    <Table sx={{ minWidth: 700 }} aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Orden</StyledTableCell>
                                <StyledTableCell>Nombre</StyledTableCell>
                                <StyledTableCell>Fecha Inicio</StyledTableCell>
                                <StyledTableCell>Fecha Final</StyledTableCell>
                                <StyledTableCell>Tarifa</StyledTableCell>
                                <StyledTableCell>Tipo de Moneda</StyledTableCell>
                                <StyledTableCell align="right">Opciones</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {tarifasMostrar.length ?
                            <TableBody>
                                {tarifasMostrar.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(tipo =>
                                        <StyledTableRow key={tipo.id}>
                                            <StyledTableCell scope="row">{num++}</StyledTableCell>
                                            <StyledTableCell>{tipo.nombre}</StyledTableCell>
                                            <StyledTableCell>{moment(tipo.fecha_inicio).format('DD/MM/YYYY')}</StyledTableCell>
                                            <StyledTableCell>{moment(tipo.fecha_fin).format('DD/MM/YYYY')}</StyledTableCell>
                                            <StyledTableCell>{tipo.tarifa}</StyledTableCell>
                                            <StyledTableCell>{tipo.TipoMoneda && tipo.TipoMoneda.nombre}</StyledTableCell>
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
                            tipoMoneda={tipoMoneda}
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
                        count={tarifasMostrar.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
                :
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                    <p>Tiempo acabado. Por favor, vuelva a iniciar sesión</p>
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
                    tipoMoneda={tipoMoneda} />
            </Dialog>
            {/*  */}

        </React.Fragment>
    );

}