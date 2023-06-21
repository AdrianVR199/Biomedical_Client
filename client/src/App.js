import { Routes, Route } from "react-router-dom";
import Citas from "./Paginas/Citas";
import FormCitas from "./Paginas/FormCitas";
import NotFoudPage from "./Paginas/NotFoudPage";
import Inicio from "./Paginas/Inicio";
import LoginPage from "./Paginas/LoginPage";
import SignupPage from "./Paginas/SignupPage";
import CalendarioCitas from "./Paginas/ClendarioCitas";
import RegistroForm from "./Paginas/RegistroForm";
import PacientesList from "./Paginas/PacientesList";
import MedicoPerfil from "./Paginas/MedicoPerfil";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ProtectedRoute } from "./Componentes/ProtectedRoute";
import { ProtectedRoute1 } from "./Componentes/ProtectedRoute1";
import { ProtectedRoute2 } from "./Componentes/ProtectedRoute2";
import PacientePerfil from "./Paginas/PacientePerfil";
import EditarPacientePerfil from "./Paginas/EditarPacientePerfil";
import EditarCitaPage from "./Paginas/EditarCitaPage";
import PacienteV from "./Paginas/PacienteV";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AppContextProvider } from "./context/ContextProvider";
import { es } from "date-fns/locale";
const theme = createTheme({
  palette: {
    primary1: {
      light: "#049cb0",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#ffff",
    },
    biomedical: {
      green: "#BDD258",
      blue: "#05B5CE",
      white: "#ffff",
      grey: "#a7a3a3",
      yellow: "#FDCB00",
    },
    biomedical2: {
      green: "#dee9ac",
      blue: "#82dae7",
      white: "#ffff",
      grey: "#d7d7d7",
      yellow: "#fee580",
    },
    biomedical3: {
      green: "#5f692c",
      blue: "#05a3b9",
      white: "#ffff",
      grey: "#585858",
      yellow: "#7f6600",
    },
  },
});

function App() {
  return (
    <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
      <>
        <ThemeProvider theme={theme}>
          <AppContextProvider>
            <Routes>
              <Route path="/registro" element={<RegistroForm />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route index element={<LoginPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/citas" element={<Citas />} />
                <Route path="/formcitas" element={<FormCitas />} />
                <Route path="/paciente/perfil" element={<PacientePerfil />} />
                <Route path="/editarcita/:id" element={<EditarCitaPage />} />

                <Route
                  path="/editarpaciente/perfil"
                  element={<EditarPacientePerfil />}
                />
              </Route>
              <Route element={<ProtectedRoute1 />}>
                <Route path="/Calendario" element={<CalendarioCitas />} />
                <Route path="/ListadoPacientes" element={<PacientesList />} />
                <Route path="/medico/perfil" element={<MedicoPerfil />} />
                <Route path="/paciente/:id" element={<PacienteV />} />
                <Route
                  path="/editarmedico/perfil"
                  element={<EditarPacientePerfil />}
                />
              </Route>
              <Route element={<ProtectedRoute2 />}>
                <Route path="/Calendariocitas" element={<CalendarioCitas />} />
                <Route
                  path="/ListadoPacientesBiomedical"
                  element={<PacientesList />}
                />
                <Route
                  path="/recepcionista/perfil"
                  element={<MedicoPerfil />}
                />
                <Route path="/Perfilpaciente/:id" element={<PacienteV />} />
                <Route
                  path="/editarrecepcionista/perfil"
                  element={<EditarPacientePerfil />}
                />
              </Route>

              <Route path="*" element={<NotFoudPage />} />
            </Routes>
          </AppContextProvider>
        </ThemeProvider>
      </>
    </LocalizationProvider>
  );
}

export default App;
