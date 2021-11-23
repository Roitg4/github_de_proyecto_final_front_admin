import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import {
  Dashboard, AssignmentInd, Contacts, HomeWork, MonetizationOn, People, AccountBalance,
  KingBed, AddTask
} from '@mui/icons-material';
import { Link } from "react-router-dom";

export const mainListItems = (

  <div>
    <ListItem button component={Link} to="/admin/inicio">
      <ListItemIcon>
        <Dashboard />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItem>

    <ListItem button component={Link} to="/admin/usuarios">
      <ListItemIcon>
        <AssignmentInd />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItem>

    <ListItem button component={Link} to="#">
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="Clientes" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <Contacts />
      </ListItemIcon>
      <ListItemText primary="Reservas" />
    </ListItem>

    <ListItem button component={Link} to="/admin/alojamientos">
      <ListItemIcon>
        <HomeWork />
      </ListItemIcon>
      <ListItemText primary="Alojamientos" />
    </ListItem>

    <ListItem button component={Link} to="/admin/tarifas">
      <ListItemIcon>
        <MonetizationOn />
      </ListItemIcon>
      <ListItemText primary="Tarifas" />
    </ListItem>

  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Sub Áreas</ListSubheader>

    <ListItem button component={Link} to="/admin/adicionales">
      <ListItemIcon>
        <AddTask />
      </ListItemIcon>
      <ListItemText primary="Adicionales" />
    </ListItem>

   {/*  <ListItem button component={Link} to="/admin/rango-usuarios">
      <ListItemIcon>
        <RecentActors />
      </ListItemIcon>
      <ListItemText primary="Rangos del Usuario" />
    </ListItem> */}

    <ListItem button component={Link} to="/admin/sub-alojamientos">
      <ListItemIcon>
        <KingBed />
      </ListItemIcon>
      <ListItemText primary="Sub Alojamientos" />
    </ListItem>

    <ListItem button component={Link} to="/admin/sub-tarifas">
      <ListItemIcon>
        <AccountBalance />
      </ListItemIcon>
      <ListItemText primary="Monedas y Pagos" />
    </ListItem>

  </div>
);