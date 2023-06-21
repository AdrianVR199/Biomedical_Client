import React from "react";
import ListadoCitas from "../Componentes/ListadoCitas";
import Top from '../Componentes/Top'

import "../styles/Citas.css";
export default function Citas() {
  return (
    <div className="citas-body">
      <div className="citas-container">
        <div className="citas-container-info">
          <div className="listado-container">
            <div className="list-cont-titulo">
              <h1>Listado de citas</h1>
            </div>
            <div className="list-cont-lista">
            <Top icon={"PendingActionsOutlined"} name={"Citas"}></Top>

              <ListadoCitas></ListadoCitas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
