import React from "react";
import "../styles/Perfil.css";
import PacientePview from "../Componentes/PacientePview";
import Top from "../Componentes/Top";

function PacienteV() {
  return (
    <div className="perfil-body">
      <div className="perfil-container">
        <div className="perfil-container-info">
          <Top icon={"PersonOutlineOutlined"} name={"Paciente"}></Top>
          <PacientePview ></PacientePview>
        </div>
      </div>
    </div>
  );
}

export default PacienteV;
