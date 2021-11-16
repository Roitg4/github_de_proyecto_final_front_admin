import axios from 'axios';

let GestorAxios;

if (process.env.NODE_ENV !== 'production') {
   GestorAxios = axios.create({
      baseURL: 'http://localhost:3000'
   });
} else {
   GestorAxios = axios.create({
      baseURL: 'http://www.mi-app.com.ar'
   });
}

export default GestorAxios;