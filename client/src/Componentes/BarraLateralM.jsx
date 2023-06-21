import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";
import logoBiomedical from "../assets/Logo_orizontal.png";
import { Button } from "@mui/material";
import {
  ExitToApp,
  HomeOutlined,
  PeopleOutline,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import { useAppContext } from "../context/ContextProvider";
import imgprofile from "../assets/Recurso 1@4x-100.jpg";

function BarraLateralM({ user }) {
  const navigate = useNavigate();
  const { cerrarSesion } = useAppContext();

  return (
    <div className="barra-lateral">
      <div style={{ paddingTop: "5%" }} className="barra-lat-info">
        <div className="top">
          <img
            style={{ width: "65%", height: "auto" }}
            src={logoBiomedical}
            alt=""
          />
          <div className="perfil-head">
            <img
              className="img-perfil"
              onClick={() => navigate("/medico/perfil")}
              style={{ cursor: "pointer" }}
              src={imgprofile}
              alt=""
            />
            <div className="perfil-info">
              <p
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/medico/perfil")}
              >
                {user}
              </p>
              <p>Médico</p>
            </div>
          </div>
        </div>

        <div className="linksP">
          <ul>
            <li>
              <Button
                className="Menu-boton"
                variant="text"
                size="big"
                startIcon={
                  <HomeOutlined
                    sx={{
                      paddingLeft:"0px",
                      fontSize: "25px",
                    }}
                  />
                }
                onClick={() => navigate("/Calendario")}
                sx={{
                  width: 1,
                  color: "text.secondary",
                  justifyContent: "flex-start",
                  pl: "25px",
                  fontSize: "16px",
                }}
              >
                Inicio
              </Button>
            </li>
            <li>
              <Button
                className="Menu-boton"
                variant="text"
                size="big"
                startIcon={<PeopleOutline  sx={{
                  fontSize: "25px",
                }}/>}
                onClick={() => navigate("/Listadopacientes")}
                sx={{
                  width: 1,
                  color: "text.secondary",
                  justifyContent: "flex-start",
                  pl: "25px",
                  fontSize: "16px",
                  height: "40px",
                }}
              >
                Pacientes
              </Button>
            </li>
            <li>
              <Button
                className="Menu-boton"
                variant="text"
                size="big"
                startIcon={<PersonOutlineOutlined  sx={{
                  fontSize: "25px",
                }}/>}
                onClick={() => navigate("/medico/perfil")}
                sx={{
                  width: 1,
                  color: "text.secondary",
                  justifyContent: "flex-start",
                  pl: "25px",
                  fontSize: "16px",
                  height: "40px",
                }}
              >
                Mi Perfíl
              </Button>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ paddingBottom: "5%" }} className="exit">
        <Button
          variant="text"
          className="Menu-boton"
          size="big"
          startIcon={<ExitToApp />}
          onClick={async () => await cerrarSesion()}
          sx={{
            width: 1,
            color: "text.secondary",
            justifyContent: "flex-start",
            pl: "15px",
            fontSize: "16px",
            height: "40px",
          }}
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}

export default BarraLateralM;
