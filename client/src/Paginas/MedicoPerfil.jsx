import React from "react";
import "../styles/Perfil.css";
import MedicoPerfilCont from "../Componentes/MedicoPerfilCont";
import Top from "../Componentes/Top";

function MedicoPerfil() {
  return (
    <div className="perfil-body">
      <div className="perfil-container">
        <div className="perfil-container-info">
          <Top icon={"PersonOutlineOutlined"} name={"Mi perfil"}></Top>
          <MedicoPerfilCont ></MedicoPerfilCont>
        </div>
      </div>
    </div>
  )
}

export default MedicoPerfil
