import React from "react";
import "../styles/EditaPerfilP.css";
import EditPerfilP from "../Componentes/EditPerfilP.jsx";
import Top from "../Componentes/Top";

function EditarPacientePerfil() {
  return (
    <div className="E-perfil-body">
      <div className="E-perfil-container">
        <div className="E-perfil-container-info">
          <Top icon={"PersonOutlineOutlined"} name={"Editar perfil"}></Top>
          <EditPerfilP></EditPerfilP>
        </div>
      </div>
    </div>
  );
}

export default EditarPacientePerfil;
