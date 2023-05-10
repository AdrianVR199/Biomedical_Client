import axios from "axios";

//logearse en la aplicacion
export const loginUserRequest = async (user) =>
  await axios({
    method: "POST",
    data: user,
    withCredentials: true,
    url: "http://localhost:4000/auth/signin",
  });

export const loadUserRequest = async () =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: "http://localhost:4000/userinfo",
  });

export const loadFullUserRequest = async (id) =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `http://localhost:4000/userinfoC/${id}`,
  });

export const loginUserRequest1 = async (user) =>
  await axios.post("http://localhost:4000/auth/signin", user);

//Registrarse en la aplicacion
export const signupUserRequest = async (user) =>
  await axios({
    method: "POST",
    data: user,
    withCredentials: true,
    url: "http://localhost:4000/auth/signup",
  });
//Cerrar sesion
export const CerrarSesionRequest = async () =>
  await axios({
    method: "POST",
    withCredentials: true,
    url: "http://localhost:4000/logout",
  });

//actualizar datos usuario
export const ActualizarUsuarioRequest = async (id, newfields) =>
  await axios({
    method: "PUT",
    withCredentials: true,
    data: newfields,
    url: `http://localhost:4000/usuarios/${id}`,
  });

// await axios.post("http://localhost:4000/logout");

//CITAS

//Crear cita
export const createCitaRequest = async (cita) =>
  await axios({
    method: "POST",
    data: cita,
    withCredentials: true,
    url: "http://localhost:4000/citas",
  });
//await axios.post("http://localhost:4000/tasks/", cita);

//traer cita
export const getCitaRequest = async (id) =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `http://localhost:4000/citas/${id}`,
  });
// await axios.get(`http://localhost:4000/tasks/${id}`);

//Crear cita
export const getCitasRequest = async () =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: "http://localhost:4000/citas",
  });
// await axios.get("http://localhost:4000/citas", { withCredentials: true });
export const getCitasCRequest = async () =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: "http://localhost:4000/citascompletas",
  });
//actualizar cita
export const UpdateCitaRequest = async (id, newfields) =>
await axios({
  method: "PUT",
  withCredentials: true,
  data: newfields,
  url: `http://localhost:4000/citas/${id}`,
});
 // await axios.put(`http://localhost:4000/tasks/${id}`, newfields);

//borrar cita
export const DeleteCitaRequest = async (id) =>
  await axios({
    method: "DELETE",
    withCredentials: true,
    url: `http://localhost:4000/citas/${id}`,
  });
// await axios.delete(`http://localhost:4000/tasks/${id}`);

//traer horarios
export const getHorariosRequest = async (infoh) =>
  await axios({
    method: "POST",
    withCredentials: true,
    data: infoh,
    url: "http://localhost:4000/horarios",
  });

//HISTORIALES

//Crear historial
export const createHistorialRequest = async (hist) =>
  await axios.post("http://localhost:4000/tasks/", hist);

//traer historial
export const getHistorialRequest = async (id) =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `http://localhost:4000/historiales/${id}`,
  });
// await axios.get(`http://localhost:4000//historiales/:${id}`);

//traer historiales
export const getHistorialesRequest = async () =>
  await axios.post("http://localhost:4000/tasks/");

//actualizar historial
export const UpdateHistorialRequest = async (id, newfields) =>
await axios({
  method: "PUT",
  withCredentials: true,
  data: newfields,
  url: `http://localhost:4000/historiales/${id}`,
});
 // await axios.put(`http://localhost:4000/tasks/${id}`, newfields);

//eliminar hisotrial
export const DeleteHistorialRequest = async (id) =>
  await axios.delete(`http://localhost:4000/tasks/${id}`);

//usuarioooooos

//traer historial
export const getUsuarioRequest = async (id) =>
  await axios.get(`http://localhost:4000/usuarios/${id}`);

//traer historiales
export const getUsuariosRequest = async () =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: "http://localhost:4000/usuarios",
  });
// await axios.post("http://localhost:4000/usuarios/");

//actualizar historial
export const UpdateUsuarioRequest = async (id, newfields) =>
  await axios.put(`http://localhost:4000/usuarios/${id}`, newfields);

//eliminar hisotrial
export const DeleteUsuarioRequest = async (id) =>
  await axios.delete(`http://localhost:4000/usuarios/${id}`);

//data de depa y pueblos

export const loadDepartamentosRequest = async () =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: "http://localhost:4000/departamentos",
  });

export const loadCiudadesRequest = async (id) =>
  await axios({
    method: "GET",
    withCredentials: true,
    url: `http://localhost:4000/ciudades/${id}`,
  });

export const loadCorreosRequest = async (data) =>
  await axios({
    method: "POST",
    data:data,
    withCredentials: true,
    url: "http://localhost:4000/correos",
  });