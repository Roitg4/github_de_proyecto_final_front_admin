import React from "react";
import GestorAxios from "./../config/axios";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.token,
        email: action.email
      };
    case "LOGOUT":
      return {
        ...state,
        token: undefined,
        email: undefined
      };
    default: {
      throw new Error(`AcciÃ³n no encontrada, tipo: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {

  const storagedToken = localStorage.getItem('token')

  var [state, dispatch] = React.useReducer(userReducer, {
    token: storagedToken,
    email: undefined
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

// **** codigo para procesar las acciones
async function loginUser(dispatch, token, email, history) {

  dispatch({
    type: 'LOGIN',
    token: token,
    email: email
  });

  localStorage.setItem('token', token);

  history.push("/admin/inicio");

}

async function verifyToken(dispatch, token, history) {

  const data = {
    token: token
  }
  console.log('INICIA DATA:', data);
  await GestorAxios.post("/usuario-admin/verifyToken", data).then((res) => {

    console.log("llega respuesta verifyToken: ", res.data.data);

    localStorage.setItem('token', token);

    dispatch({
      type: 'LOGIN',
      token: res.data.data.token,
      email: res.data.data.email
    });

    /* console.log("Estados actualizados!");

    history.push("/admin/inicio");  */

  }).catch((err) => {

    dispatch({
      type: 'LOGOUT',
      token: '',
      email: '',
    });

    console.log("Token no valido!");

    localStorage.removeItem('token');

    history.push("/login");
  });
}

function logout(dispatch) {
  dispatch({
    type: 'LOGOUT',
    token: undefined,
    email: undefined
  });

  localStorage.removeItem('token');

}


export { UserProvider, useUserState, useUserDispatch, loginUser, logout, verifyToken }