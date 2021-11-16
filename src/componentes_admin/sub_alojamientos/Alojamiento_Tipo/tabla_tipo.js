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
import { Delete, Create, ControlPoint } from '@mui/icons-material';
import Title from '../../_global/title';
/* import SearchBar from "material-ui-search-bar"; */

// IMPORTACIONES LOCALES
import * as extraService from '../../../servicios/extra.service';
import ModalCrear from './modals/modal_crear';
import ModalEditar from './modals/modal_editar';
import ModalEliminar from './modals/modal_eliminar';
import Snackbar from '../../_global/snackbar';

export default function TablaTipo() {

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

    /* MODAL EDITAR*/
    const [openEdit, setOpenEdit] = useState(false);
    const [tipoAEditar, setTipoAEditar] = useState(0);

    const openCloseModalEdit = (e) => {

        if (!openEdit) {
            const _tipoAEditar = alojamientoTipos.filter(function (item) {
                return item.id === parseInt(e.currentTarget.id)
            })
            setTipoAEditar(_tipoAEditar);
        }
        setOpenEdit(!openEdit);
    };

    /* MODAL ELIMINAR*/
    const [openDelete, setOpenDelete] = useState(false);
    const [tipoAEliminar, setTipoAEliminar] = useState(0);

    const openCloseModalDelete = (e) => {

        if (!openDelete) {
            const id_alojamiento_tipo = parseInt(e.currentTarget.id);
            setTipoAEliminar(id_alojamiento_tipo);
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
    /* ESTADOS ALOJAMIENTO */
    const [alojamientoTipos, setGuardarAlojamientoTipos] = useState([]);
    const [alojamientoTipoMostrar, setAlojamientoTipoMostrar] = useState([]);

    const [boolCargando, setBoolCargando] = useState(false);
    /* const [textoBuscar, setTextoBuscar] = useState(""); */

    useEffect(() => {

        if (!boolCargando) {

            setBoolCargando(true);

            extraService.alojamientoTipo_get(token).then(res => {

                setGuardarAlojamientoTipos(res)
                setAlojamientoTipoMostrar(res)
            })
        }
    }, [alojamientoTipos, boolCargando, alojamientoTipoMostrar]);

    let emptyRows =
        rowsPerPage - Math.min(rowsPerPage, alojamientoTipoMostrar.length - page * rowsPerPage);

    /* useEffect(() => {

        let items = alojamientoTipos.slice();
        items = items.filter(item => item.tipo_alojamiento.toUpperCase().includes(textoBuscar.toUpperCase()));

        setAlojamientoTipoMostrar(items)
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
            <Title>Lista de Tipos de Alojamientos</Title>

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
                        Crear Tipo
                    </Button>
                </Box>
            </div>

            {alojamientoTipoMostrar.length > 0 ?
                <div>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Orden</StyledTableCell>
                                <StyledTableCell>Tipo de Alojamiento</StyledTableCell>
                                <StyledTableCell align="right">Opciones</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {alojamientoTipoMostrar.length ?
                            <TableBody>
                                {alojamientoTipoMostrar.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(tipo =>
                                        <StyledTableRow key={tipo.id}>
                                            <StyledTableCell scope="row">{num++}</StyledTableCell>
                                            <StyledTableCell >{tipo.tipo_alojamiento}</StyledTableCell>
                                            <StyledTableCell align="right">

                                                <Box>
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
                    <Snackbar openSnack={openSnack} setOpenSnack={setOpenSnack} mensaje={msgSnack} />
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
                            setBoolCargando={setBoolCargando}
                            tipoAEditar={tipoAEditar}
                            setOpenSnack={setOpenSnack}
                            setMsgSnack={setMsgSnack}
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
                            tipoAEliminar={tipoAEliminar}
                            setTipoAEliminar={setTipoAEliminar}
                            setOpenSnack={setOpenSnack}
                            setMsgSnack={setMsgSnack} />
                    </Dialog>
                    {/*  */}

                    <TablePagination
                        rowsPerPageOptions={[5, 10]}
                        component="div"
                        count={alojamientoTipoMostrar.length}
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
                    setMsgSnack={setMsgSnack} />
            </Dialog>
            {/*  */}

        </React.Fragment>
    );

}