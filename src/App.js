import React, { useState, useEffect } from "react";
import { useUserState, verifyToken, useUserDispatch } from './context/userContext';
import { useHistory } from "react-router-dom"; //useHistory

import {
  BrowserRouter as Router,
  Switch, //Switch
  Route,
  Redirect //Redirect
} from 'react-router-dom';

//MIS COMPONENTES
import Login from './componentes_admin/login';
import Inicio from './componentes_admin/inicio/inicio';

//USUARIOS ADMINISTRADORES 
import Usuarios from './componentes_admin/usuarios/dashborad';
import Tipo_Usuario from './componentes_admin/tipo_usuario/dashborad';

//ALOJAMIENTOS
import Alojamientos from './componentes_admin/alojamiento/dashborad';
import Sub_Alojamientos from './componentes_admin/sub_alojamientos/dashborad';

//TARIFAS
import Tarifas from './componentes_admin/tarifa/dashborad';
import Sub_Tarifas from './componentes_admin/sub_alojamientos/dashborad';

function App(props) {

  var userDispatch = useUserDispatch();
  let history = useHistory ();

  const [loginInProcess, setLoginInProcess] = useState();

  const { email, token } = useUserState();
  let usuarioLogeado = email !== undefined;

  console.log('EVALUA:', usuarioLogeado, email, token);

  const pruebaLogin = async () => {

    localStorage.setItem('loginInProcess', true);
    setLoginInProcess(true);
    await verifyToken(userDispatch, token, history)
  };

  //BANDERA
  useEffect(() => {
    setLoginInProcess(localStorage.getItem('loginInProcess') || false);
  }, [])
  console.log('LoginProcess', loginInProcess);

  useEffect(() => {
    if (!usuarioLogeado && !loginInProcess) {
      if (token) {

        console.log('EVALUAR TOKEN:')
        pruebaLogin();

        usuarioLogeado = email !== undefined;
        console.log('PRUEBA EVALUA:', usuarioLogeado, email, token);
        localStorage.removeItem('loginInProcess');
        setLoginInProcess(false);
      }
    }
  }, [loginInProcess])

  return (

    <>
      {((!usuarioLogeado && !loginInProcess) || loginInProcess) && token ?
        <> Cargando...</>
        :
        <Router>
          <Switch>
            {/* PAGINA ADMINISTRATIVA */}
            <Route path='/login' component={Login} />

            <Route path='/admin/:path?'>

              <> {

                usuarioLogeado ? (

                  <>
                    <Route>

                      <Route path="/admin/sub-tarifas" component={Sub_Tarifas}/>

                      <Route path="/admin/tarifas" component={Tarifas}/>

                      <Route path="/admin/sub-alojamientos" component={Sub_Alojamientos}/>

                      <Route path="/admin/alojamientos" component={Alojamientos}/>

                      <Route path="/admin/rango-usuarios" component={Tipo_Usuario}/>

                      <Route path="/admin/usuarios" component={Usuarios}/>

                      <Route path="/admin/inicio" component={Inicio}/>

                    </Route>
                  </>

                ) : (
                  <Redirect to={{ pathname: '/login' }} />
                )
              } </>

              {/* <Route component={() => (<div>404 Main Admin</div>)} exact path='/admin/*' /> */}

            </Route>
          </Switch>
        </Router>
      }
    </>

  );
}

export default App;