import axios from "axios";
import httpAdapter from "axios/lib/adapters/http"
//const serverName="localhost:8080";
const serverName="ec2-3-83-2-193.compute-1.amazonaws.com";

const port="4000";
//logearse en la aplicacion
export const loginUserRequest = async (user) =>
  await axios({
    method: "POST",
    data: user,
    adapter:httpAdapter,
    withCredentials: true,
    url: `https://${serverName}/auth/signin`,
// url: "https://localhost:4000/auth/signin",
  });

export const loadUserRequest = async () =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `https://${serverName}/userinfo`,
  });

export const loadFullUserRequest = async (id) =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `https://${serverName}/userinfoC/${id}`,
  });

export const loginUserRequest1 = async (user) =>
  await axios.post(`https://${serverName}/auth/signin`, user);

//Registrarse en la aplicacion
export const signupUserRequest = async (user) =>
  await axios({
    method: "POST",
    data: user,
    withCredentials: true,
    url: `https://${serverName}/auth/signup`,
  });
//Cerrar sesion
export const CerrarSesionRequest = async () =>
  await axios({
    method: "POST",
    withCredentials: true,
    url: `https://${serverName}/logout`,
  });

//actualizar datos usuario
export const ActualizarUsuarioRequest = async (id, newfields) =>
  await axios({
    method: "PUT",
    withCredentials: true,
    data: newfields,
    url: `https://${serverName}/usuarios/${id}`,
  });

// await axios.post("https://${serverName}/logout");

//CITAS

//Crear cita
export const createCitaRequest = async (cita) =>
  await axios({
    method: "POST",
    data: cita,
    withCredentials: true,
    url: `https://${serverName}/citas`,
  });
//await axios.post("https://${serverName}/tasks/", cita);

//traer cita
export const getCitaRequest = async (id) =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `https://${serverName}/citas/${id}`,
  });
// await axios.get(`https://${serverName}/tasks/${id}`);

//Crear cita
export const getCitasRequest = async () =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `https://${serverName}/citas`,
  });
// await axios.get("https://${serverName}/citas", { withCredentials: true });
export const getCitasCRequest = async () =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `https://${serverName}/citascompletas`,
  });
//actualizar cita
export const UpdateCitaRequest = async (id, newfields) =>
await axios({
  method: "PUT",
  withCredentials: true,
  data: newfields,
  url: `https://${serverName}/citas/${id}`,
});
 // await axios.put(`https://${serverName}/tasks/${id}`, newfields);

//borrar cita
export const DeleteCitaRequest = async (id) =>
  await axios({
    method: "DELETE",
    withCredentials: true,
    url: `https://${serverName}/citas/${id}`,
  });
// await axios.delete(`https://${serverName}/tasks/${id}`);

//traer horarios
export const getHorariosRequest = async (infoh) =>
  await axios({
    method: "POST",
    withCredentials: true,
    data: infoh,
    url: `https://${serverName}/horarios`,
  });

//HISTORIALES

//Crear historial
export const createHistorialRequest = async (hist) =>
  await axios.post(`https://${serverName}/tasks/`, hist);

//traer historial
export const getHistorialRequest = async (id) =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `https://${serverName}/historiales/${id}`,
  });
// await axios.get(`https://${serverName}//historiales/:${id}`);

//traer historiales
export const getHistorialesRequest = async () =>
  await axios.post(`https://${serverName}/tasks/`);

//actualizar historial
export const UpdateHistorialRequest = async (id, newfields) =>
await axios({
  method: "PUT",
  withCredentials: true,
  data: newfields,
  url: `https://${serverName}/historiales/${id}`,
});
 // await axios.put(`https://${serverName}/tasks/${id}`, newfields);

//eliminar hisotrial
export const DeleteHistorialRequest = async (id) =>
  await axios.delete(`https://${serverName}/tasks/${id}`);

//usuarioooooos

//traer historial
export const getUsuarioRequest = async (id) =>
  await axios.get(`https://${serverName}/usuarios/${id}`);

//traer historiales
export const getUsuariosRequest = async () =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `https://${serverName}/usuarios`,
  });
// await axios.post("https://${serverName}/usuarios/");

//actualizar historial
export const UpdateUsuarioRequest = async (id, newfields) =>
  await axios.put(`https://${serverName}/usuarios/${id}`, newfields);

//eliminar hisotrial
export const DeleteUsuarioRequest = async (id) =>
  await axios.delete(`https://${serverName}/usuarios/${id}`);

//data de depa y pueblos

export const loadDepartamentosRequest = async () =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `https://${serverName}/departamentos`,
  });

export const loadCiudadesRequest = async (id) =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `https://${serverName}/ciudades/${id}`,
  });

export const loadCorreosRequest = async (data) =>
  await axios({
    method: "POST",
    data:data,
    withCredentials: true,
    url: `https://${serverName}/correos`,
  });
