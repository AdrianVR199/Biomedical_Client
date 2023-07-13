import axios from "axios";
//const serverName="localhost:8080";
//import httpAdapter from "axios"
const serverName="ec2-18-212-74-248.compute-1.amazonaws.com:3000";

const port="4000";
//logearse en la aplicacion
export const loginUserRequest = async (user) =>
  await axios({
    method: "POST",
    data: user,
    withCredentials: true,
    url: `http://${serverName}/auth/signin`,
// url: "http://localhost:4000/auth/signin",
  });

export const loadUserRequest = async () =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `http://${serverName}/userinfo`,
  });

export const loadFullUserRequest = async (id) =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `http://${serverName}/userinfoC/${id}`,
  });

export const loginUserRequest1 = async (user) =>
  await axios.post(`http://${serverName}/auth/signin`, user);

//Registrarse en la aplicacion
export const signupUserRequest = async (user) =>
  await axios({
    method: "POST",
    data: user,
    withCredentials: true,
    url: `http://${serverName}/auth/signup`,
  });
//Cerrar sesion
export const CerrarSesionRequest = async () =>
  await axios({
    method: "POST",
    withCredentials: true,
    url: `http://${serverName}/logout`,
  });

//actualizar datos usuario
export const ActualizarUsuarioRequest = async (id, newfields) =>
  await axios({
    method: "PUT",
    withCredentials: true,
    data: newfields,
    url: `http://${serverName}/usuarios/${id}`,
  });

// await axios.post("http://${serverName}/logout");

//CITAS

//Crear cita
export const createCitaRequest = async (cita) =>
  await axios({
    method: "POST",
    data: cita,
    withCredentials: true,
    url: `http://${serverName}/citas`,
  });
//await axios.post("http://${serverName}/tasks/", cita);

//traer cita
export const getCitaRequest = async (id) =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `http://${serverName}/citas/${id}`,
  });
// await axios.get(`http://${serverName}/tasks/${id}`);

//Crear cita
export const getCitasRequest = async () =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `http://${serverName}/citas`,
  });
// await axios.get("http://${serverName}/citas", { withCredentials: true });
export const getCitasCRequest = async () =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `http://${serverName}/citascompletas`,
  });
//actualizar cita
export const UpdateCitaRequest = async (id, newfields) =>
await axios({
  method: "PUT",
  withCredentials: true,
  data: newfields,
  url: `http://${serverName}/citas/${id}`,
});
 // await axios.put(`http://${serverName}/tasks/${id}`, newfields);

//borrar cita
export const DeleteCitaRequest = async (id) =>
  await axios({
    method: "DELETE",
    withCredentials: true,
    url: `http://${serverName}/citas/${id}`,
  });
// await axios.delete(`http://${serverName}/tasks/${id}`);

//traer horarios
export const getHorariosRequest = async (infoh) =>
  await axios({
    method: "POST",
    withCredentials: true,
    data: infoh,
    url: `http://${serverName}/horarios`,
  });

//HISTORIALES

//Crear historial
export const createHistorialRequest = async (hist) =>
  await axios.post(`http://${serverName}/tasks/`, hist);

//traer historial
export const getHistorialRequest = async (id) =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `http://${serverName}/historiales/${id}`,
  });
// await axios.get(`http://${serverName}//historiales/:${id}`);

//traer historiales
export const getHistorialesRequest = async () =>
  await axios.post(`http://${serverName}/tasks/`);

//actualizar historial
export const UpdateHistorialRequest = async (id, newfields) =>
await axios({
  method: "PUT",
  withCredentials: true,
  data: newfields,
  url: `http://${serverName}/historiales/${id}`,
});
 // await axios.put(`http://${serverName}/tasks/${id}`, newfields);

//eliminar hisotrial
export const DeleteHistorialRequest = async (id) =>
  await axios.delete(`http://${serverName}/tasks/${id}`);

//usuarioooooos

//traer historial
export const getUsuarioRequest = async (id) =>
  await axios.get(`http://${serverName}/usuarios/${id}`);

//traer historiales
export const getUsuariosRequest = async () =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `http://${serverName}/usuarios`,
  });
// await axios.post("http://${serverName}/usuarios/");

//actualizar historial
export const UpdateUsuarioRequest = async (id, newfields) =>
  await axios.put(`http://${serverName}/usuarios/${id}`, newfields);

//eliminar hisotrial
export const DeleteUsuarioRequest = async (id) =>
  await axios.delete(`http://${serverName}/usuarios/${id}`);

//data de depa y pueblos

export const loadDepartamentosRequest = async () =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `http://${serverName}/departamentos`,
  });

export const loadCiudadesRequest = async (id) =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `http://${serverName}/ciudades/${id}`,
  });

export const loadCorreosRequest = async (data) =>
  await axios({
    method: "POST",
    data:data,
    withCredentials: true,
    url: `http://${serverName}/correos`,
  });
