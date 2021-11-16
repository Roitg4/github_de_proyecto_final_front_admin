import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack
} from '@mui/material';
import { AccountCircle, ExitToApp, Grass, Close, Check } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useUserDispatch, logout } from "./../../context/userContext";

export default function CustomizedMenus() {

  var userDispatch = useUserDispatch();

  const [openCreate, setOpenCreate] = useState(false);

  const openCloseModalCreate = () => {
    setOpenCreate(!openCreate);
  };

  function Logout() {

    logout(userDispatch);
  }

  return (
    <div>

      <Stack mr={2} spacing={1} direction="row-reverse">
        <IconButton color="inherit" onClick={openCloseModalCreate}>
          <ExitToApp />
        </IconButton>
        <Dialog
          open={openCreate}
          onClose={(event, reason) => {
            if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
              openCloseModalCreate();
            }
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Cerrar Sesión"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Esta seguro que desea cerrar sesión?
            </DialogContentText>
          </DialogContent>
          <Stack m={2} mr={3} ml={3} spacing={1} direction="row-reverse">
            <Button
              component={Link} to="/login"
              variant="contained"
              color='success'
              onClick={() => Logout()}
              endIcon={<Check />}
            >
              Si
            </Button>
            
            <Button
              variant="contained"
              color='error'
              onClick={() => openCloseModalCreate()}
              startIcon={<Close />}
            >
              No
            </Button>
          </Stack>
        </Dialog>

        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>

        <IconButton color="inherit" onClick={() => window.open('http://localhost:4001/elalgarrobo.com.ar/inicio')} >
          <Grass />
        </IconButton>

      </Stack>
    </div>
  );
}
