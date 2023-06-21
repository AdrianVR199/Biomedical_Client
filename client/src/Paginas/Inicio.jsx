import React from "react";
import { useEffect, useState } from "react";
import CitaCard from "../Componentes/CitaCard";
import { Grid } from "@mui/material";
import "../styles/Inicio.css";
import { useAppContext } from "../context/ContextProvider";
import Top from "../Componentes/Top";
function Inicio() {
  const { getCitas } = useAppContext();
  const [listcitas, setlistcitas] = useState([]);
  useEffect(() => {
    const getlistCitas = async () => {
      const contentlist = await getCitas();

      setlistcitas(contentlist);
    };
    getlistCitas();
  }, []);

  function renderMain() {
    const now = new Date();
    const citasFiltradas = listcitas.filter((cita) => {
      if (!cita.fecha_reg) return false;
      const fechaCita = new Date(cita.fecha_reg);
      return fechaCita.getTime() > now.getTime();
    });

    if (citasFiltradas.length === 0)
      return (
        <h3 style={{ marginLeft: "3%", fontWeight: "normal" }}>
          No tienes citas pendientes
        </h3>
      );
    return citasFiltradas.map((cita) => (
      <CitaCard cita={cita} key={cita.cita_id} />
    ));
  }
  return (
    <div className="inicio-body">
      <Top icon={"HomeOutlined"} name={"Inicio"}></Top>
      <div className="inicio-container">
        <div className="inicio-container-info">
          <div
            style={{
              width: "90%",
              height: "10%",
              display: "flex",
              alignItems: "center",
              marginLeft: "5%",
              fontSize: "18px",
            }}
          >
            Citas pendientes
          </div>
          <div style={{ width: "95%", height: "90%", marginLeft: "4%" }}>
            <Grid container spacing={2} rowSpacing={1}>
              {renderMain()}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
