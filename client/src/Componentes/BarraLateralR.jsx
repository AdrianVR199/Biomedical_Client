import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";
import logoBiomedical from "../assets/Logo_orizontal.png";
import { Button } from "@mui/material";
import {
  ExitToApp,
  HomeOutlined,
  TextSnippetOutlined,
  PendingActionsOutlined,
} from "@mui/icons-material";
import { useAppContext } from "../context/ContextProvider";
import imgprofile from "../assets/Recurso 1@4x-100.jpg";

function BarraLateralR({ user }) {
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
              onClick={() => navigate("/recepcionista/perfil")}
              style={{ cursor: "pointer" }}
              src={imgprofile}
              alt=""
            />
            <div className="perfil-info">
              <p
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/recepcionista/perfil")}
              >
                {user}
              </p>
              <p>Recepcionista</p>
            </div>
          </div>
        </div>

        <div className="linksP">
          <ul>
            <li>
              <Button
                className="Menu-boton"
                size="small"
                variant="text"
                startIcon={
                  <HomeOutlined
                    sx={{
                      fontSize: "30px",
                    }}
                  />
                }
                onClick={() => navigate("/Calendariocitas")}
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
             
            </li>
            <li>
              <Button
                className="Menu-boton"
                variant="text"
                startIcon={<TextSnippetOutlined size="large" />}
                onClick={() => navigate("/ListadoPacientesBiomedical")}
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
                startIcon={<PendingActionsOutlined sx={{ fontSize: 10 }} />}
                onClick={() => navigate("/recepcionista/perfil")}
                sx={{
                  width: 1,
                  color: "text.secondary",
                  justifyContent: "flex-start",
                  pl: "25px",
                  fontSize: "16px",
                  height: "40px",
                }}
              >
                Mi Perfil
              </Button>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ paddingBottom: "5%" }} className="exit">
        <Button
          variant="text"
          className="Menu-boton"
          startIcon={<ExitToApp size="40px" />}
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

export default BarraLateralR;
