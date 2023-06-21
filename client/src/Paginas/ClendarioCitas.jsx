import React from "react";
import Calendario from "../Componentes/Calendario";
import Top from "../Componentes/Top";

function ClendarioCitas() {
  return (
    <div className="citas-body">
      <div className="citas-container">
        <div
          style={{
            height: "98%",
            width: "98%",
            backgroundColor: "#ffff",
            borderRadius: "5px",
            boxShadow: "2px 0px 8px #afafaf88",
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
          }}
        >
          <div
          style={{
            height: "95%",
            width: "95%",
            
          }}>
            <Top icon={"HomeOutlined"} name={"Calendario"}></Top>
            <Calendario></Calendario>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClendarioCitas;
