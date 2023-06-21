import React from 'react'
import ListadoPacientes from "../Componentes/ListadoPacientes";
import Top from "../Componentes/Top";

function PacientesList() {
  return (
    <div className="citas-body">
      <div className="citas-container">
        <div className="citas-container-info">
          <div className="listado-container">
            <div className="list-cont-titulo">
              <h1>Listado de pacientes</h1>
            </div>
            <div className="list-cont-lista">
              <Top icon={"PeopleOutline"} name={"Pacientes"}></Top>
              <ListadoPacientes></ListadoPacientes>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PacientesList
