import React from "react";
import "../styles/Formcita.css";
import FormularioAgenC from "../Componentes/FormularioAgenC";
import Top from '../Componentes/Top'

function FormCitas() {
  return (
    <div className="Form-cita-body">
            <Top icon={"TextSnippetOutlined"} name={"Agendar Cita"}></Top>

      <div className="Form-cita-container">
        <div className="Form-cita-container-info">
        <div className="form-container" style={{height:"100%"}}>
            <div className="form-cont-titulo">
              <p className="complete">Completa el siguiente formulario para agendar tu cita</p>
            </div>
            <div className="form-cont-lista">
              <FormularioAgenC></FormularioAgenC>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormCitas;
