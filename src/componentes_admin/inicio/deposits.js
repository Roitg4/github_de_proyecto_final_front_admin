import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Title from '../_global/title';

export default function Deposits() {
    return (
        <React.Fragment>
            <Title>Depósitos recientes</Title>
            <Typography component="p" variant="h4">
                $2.400,00
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                el 20 de enero, 2022
            </Typography>
            <div>
                <Button variant="contained" color="primary" href="#contained-buttons">
                    Ver Saldo
                </Button>
            </div>
        </React.Fragment>
    );
}