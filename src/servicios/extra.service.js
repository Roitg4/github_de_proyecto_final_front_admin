//Comunicacion con App.
import gestorAxios from './../config/axios';

export const Usuario_get = async ( token ) => {

    let data = {  }

    await gestorAxios.get('/usuario-admin', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => { 
        
        data = res.data;

    });
    console.log(data)
    return data;
}

export const tipoUsuario_get = async ( token ) => {

    let data = {  }

    await gestorAxios.get('/tipo-usuario', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => { 
        
        data = res.data;

    });
    console.log(data)
    return data;
}

export const alojamiento_get = async ( token ) => {

    let data = {  }

    await gestorAxios.get('/alojamiento', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => { 
        
        data = res.data;

    });
    console.log(data)
    return data;
}


export const alojamientoTipo_get = async ( token ) => {

    let data = {  }

    await gestorAxios.get('/alojamiento-tipo', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => { 
        
        data = res.data;

    });
    console.log(data)
    return data;
}

export const alojamientoEstado_get = async ( token ) => {

    let data = {  }

    await gestorAxios.get('/alojamiento-estado', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => { 
        
        data = res.data;

    });
    console.log(data)
    return data;
}

export const tarifas_get = async ( token ) => {

    let data = {  }

    await gestorAxios.get('/tarifa', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => { 
        
        data = res.data;

    });
    console.log(data)
    return data;
}

export const formaPago_get = async ( token ) => {

    let data = {  }

    await gestorAxios.get('/forma-pago', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => { 
        
        data = res.data;

    });
    console.log(data)
    return data;
}

export const tipoMoneda_get = async ( token ) => {

    let data = {  }

    await gestorAxios.get('/tipo-moneda', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => { 
        
        data = res.data;

    });
    console.log(data)
    return data;
}

export const adicional_get = async ( token ) => {

    let data = {  }

    await gestorAxios.get('/adicional', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => { 
        
        data = res.data;

    });
    console.log(data)
    return data;
}
