import React from "react";
import "../styles/EditaPerfilP.css";
import EditCita from "../Componentes/EditCita.jsx";
import Top from '../Componentes/Top'

function EditarCitaPage() {
    return (
        <div className="Form-cita-body">
            <Top icon={"TextSnippetOutlined"} name={"Editar Cita"}></Top>

        <div className="Form-cita-container">
          <div className="Form-cita-container-info">
          <div className="form-container" style={{height:"100%"}}>
              <div className="form-cont-titulo">
                <p className="complete">Edita cualquier campo del formulario para actualizar tu cita</p>
              </div>
              <div className="form-cont-lista">
                <EditCita></EditCita>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default EditarCitaPage
