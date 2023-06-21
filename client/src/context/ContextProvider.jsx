import { useContext } from "react";
import { useState } from "react";
import {
  loginUserRequest,
  loginUserRequest1,
  loadCorreosRequest,
  loadFullUserRequest,
  signupUserRequest,
  loadDepartamentosRequest,
  loadCiudadesRequest,
  CerrarSesionRequest,
  getCitasCRequest,
  ActualizarUsuarioRequest,
  createCitaRequest,
  getHorariosRequest,
  getCitasRequest,
  getCitaRequest,
  UpdateCitaRequest,
  DeleteCitaRequest,
  createHistorialRequest,
  getHistorialRequest,
  getHistorialesRequest,
  UpdateHistorialRequest,
  DeleteHistorialRequest,
  loadUserRequest,
  getUsuarioRequest,
  getUsuariosRequest,
  UpdateUsuarioRequest,
  DeleteUsuarioRequest,
} from "../api/routes.api";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useTask must be used within a taskcontextprovider");
  }
  return context;
};

export const AppContextProvider = ({ children }) => {
  const [Usuario, SetUsuario] = useState();
  const navigate = useNavigate();
  const [Usuarios, SetUsuarios] = useState([]);
  const [Citas, SetCitas] = useState([]);
  const [Historiales, SetHistoriales] = useState([]);

  //Login y SignUp
  const LoginUser = async (user) => {
    try {
      const response = await loginUserRequest(user);
      console.log(response)
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getUsuarioinfo = async () => {
    try {
      const response = await loadUserRequest();

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getUsuarioinfoFull = async (id) => {
    try {
      const response = await loadFullUserRequest(id);

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const SignUpUser = async (user) => {
    try {
      const response = await signupUserRequest(user);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  //funciones manejo de usuarios

  const getUsuario = async (id) => {
    try {
      const response = await getUsuarioRequest(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getUsuarios = async () => {
    try {
      const response = await getUsuariosRequest();

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const updateUsuario = async (id, newfieldstask) => {
    try {
      const response = await ActualizarUsuarioRequest(id, newfieldstask);
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteUsuario = async (id) => {
    try {
      const response = await DeleteUsuarioRequest(id);
      SetUsuarios(Usuarios.filter((usuario) => usuario.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  //funciones manejo de citas
  const createCita = async (cita) => {
    try {
      const response = await createCitaRequest(cita);
    } catch (error) {
      console.log(error);
    }
  };
  const getCita = async (id) => {
    try {
      const response = await getCitaRequest(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getCitas = async () => {
    try {
      const response = await getCitasRequest();

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getCitasCompletas = async () => {
    try {
      const response = await getCitasCRequest();

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateCita = async (id, newfieldstask) => {
    try {
      const response = await UpdateCitaRequest(id, newfieldstask);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteCita = async (id) => {
    try {
      const response = await DeleteCitaRequest(id);
    } catch (error) {
      console.error(error, "nose borro");
    }
  };

  const getHorarios = async (data) => {
    try {
      const response = await getHorariosRequest(data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //funciones manejo de historialeas
  const createHistorial = async (hist) => {
    try {
      const response = await createHistorialRequest(hist);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getHistorial = async (id) => {
    try {
      const response = await getHistorialRequest(id);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getHistoriales = async () => {
    const response = await getHistorialesRequest();
    SetHistoriales(response.data);
  };
  const updateHistorial = async (id, newfieldstask) => {
    try {
      const response = await UpdateHistorialRequest(id, newfieldstask);
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteHistorial = async (id) => {
    try {
      const response = await DeleteHistorialRequest(id);
      SetHistoriales(Historiales.filter((historial) => historial.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const cerrarSesion = async () => {
    try {
      const response = await CerrarSesionRequest();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartamentos = async () => {
    try {
      const response = await loadDepartamentosRequest();

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getCiudades = async (id) => {
    try {
      const response = await loadCiudadesRequest(id);

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getCorreos = async (data) => {
    try {
      const response = await loadCorreosRequest(data);
      console.log(response, "repuesta servidor")
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        Usuarios: Usuarios,
        Citas: Citas,
        getUsuarioinfo,
        getHorarios,
        getCorreos,
        getDepartamentos,
        getCiudades,
        getCitasCompletas,
        Historiales: Historiales,
        getUsuarioinfoFull,
        LoginUser,
        SignUpUser,
        getUsuario,
        getUsuarios,
        updateUsuario,
        DeleteUsuario,
        createCita,
        getCita,
        getCitas,
        UpdateCita,
        DeleteCita,
        createHistorial,
        getHistorial,
        getHistoriales,
        updateHistorial,
        DeleteHistorial,
        cerrarSesion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
