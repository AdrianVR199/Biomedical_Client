import React from "react";
import "../styles/Perfil.css";
import PerfilContent from "../Componentes/PerfilContent";
import Top from '../Componentes/Top'

function PacientePerfil() {
  return (
    <div className="perfil-body">
      <div className="perfil-container">
        <div className="perfil-container-info">
        <Top icon={"PersonOutlineOutlined"} name={"Mi Perfil"}></Top>

          <PerfilContent ></PerfilContent>
        </div>
      </div>
    </div>
  );
}

export default PacientePerfil;
