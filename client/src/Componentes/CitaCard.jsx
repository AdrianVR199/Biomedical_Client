import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ContextProvider";
import Popup from "../Componentes/Popup";

function CitaCard({ cita }) {
  const { DeleteCita } = useAppContext();
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false); //estado del popup actualizar cita
  const [openPopupEC, setOpenPopupEC] = useState(false); //estado del popup cancelar cita

  useEffect(() => {
    const f = formatDateSQL(fechaObtenida);
    const fecha = fechaObtenida.slice(0, 10);
    setfechaAgen(fecha);
  }, []);

  const [fechaAgen, setfechaAgen] = useState(""); //fecha agendada
  const [fechaObtenida, setfechaObtenida] = useState(cita.fecha_reg); //fecha obtenida de la cita desde base de datos

  //formateo de la cita
  function formatDateSQL(fechatoformat) {
    const date = new Date(fechatoformat);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");
    return new Date(`${year}-${month}-${day}`);
  }

  //abrir popup
  const HandlesetCita = (idCita) => {
    setOpenPopupEC(true);
  };
  function mostrarHoraConAmPm(hora) {
    const f = hora.slice(0, 2);
    if (f < 12) {
      const r = `${hora.substring(0, 5)} am`;
      return r;
    } else {
      const r = `${hora.substring(0, 5)} pm`;
      return r;
    }
  }
  //eliminar cita
  const HandleDeleteCita = async (Citaid) => {
    try {
      const response = await DeleteCita(Citaid);
      setOpenPopup(false);
      setOpenPopupEC(false);
      navigate("/inicio");

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card
        sx={{
          maxWidth: 270,
          minWidth: 270,
          borderBottom: "2px solid #FDCB00",
          marginBottom: "15px",
          marginRight: "10px",
          marginBottom: "15px",
        }}
      >
        <CardContent sx={{ padding: "10px", paddingBottom: 0 }}>
          <Typography
            sx={{ fontSize: 14, mb: 1, fontWeight: "bold" }}
            gutterBottom
          >
            Detalles de cita agendada
          </Typography>
          <Typography sx={{ fontSize: 13 }}>
            Doctor: {cita.nombre_medico}
          </Typography>
          <Typography
            sx={{ mb: 1, fontSize: 14, display: "flex", alignItems: "center" }}
          >
            Tipo de cita: {cita.tipo_cita}
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: "bold" }}>
            Fecha: {fechaAgen} &nbsp; Hora: {mostrarHoraConAmPm(cita.hora_reg)}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            padding: "2px",
            paddingTop: 1,
            paddingRight: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={() => setOpenPopup(true)}
            sx={{ color: "#000000" }}
            size="small"
          >
            ver cita
          </Button>
        </CardActions>
      </Card>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        width="md"
        height="80vh"
        titulo="Detalles de agendamiento de cita"
      >
        <IconButton
          aria-label="close"
          style={{ position: "absolute", right: "5px", top: "5px" }}
          onClick={() => setOpenPopup(false)}
        >
          <Close />
        </IconButton>
        <div>
          <div style={{ fontSize: "14px" }}>
            Al continuar tu cita sera agendada en el sistema.
          </div>
          <div style={{ fontSize: "14px" }}>
            Recuerda que puedes realizar cambios a la fecha y hora de tu cita o
            cancelarla desde la pagina de inicio.
          </div>
        </div>
        <div className="F-A-popupcont-cita">
          <div style={{ width: "55%" }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                height: "100%",
              }}
            >
              <div style={{ width: "100%" }}>
                <p
                  style={{
                    margin: 0,
                    marginBottom: "10px",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  Médico
                </p>
                <TextField
                  disabled
                  size="small"
                  InputLabelProps={{
                    classes: {
                      focused: "my-custom-focus-label",
                    },
                  }}
                  InputProps={{
                    classes: {
                      focused: "my-custom-focus-class",
                    },
                  }}
                  value={cita.nombre_medico}
                  sx={{
                    width: "80%",
                  }}
                  focused
                />
              </div>
              <div style={{ width: "50%" }}>
                <p
                  style={{
                    margin: 0,
                    marginBottom: "10px",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  Fecha de agendamiento
                </p>
                <TextField
                  disabled
                  size="small"
                  InputLabelProps={{
                    classes: {
                      focused: "my-custom-focus-label",
                    },
                  }}
                  InputProps={{
                    classes: {
                      focused: "my-custom-focus-class",
                    },
                  }}
                  value={fechaAgen}
                  sx={{
                    width: "80%",
                  }}
                  focused
                />
              </div>
              <div style={{ width: "37%" }}>
                <p
                  style={{
                    margin: 0,
                    marginBottom: "10px",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  Hora
                </p>
                <TextField
                  name="nombre"
                  size="small"
                  disabled
                  id="outlined-start-adornment"
                  value={mostrarHoraConAmPm(cita.hora_reg) || ""}
                  InputLabelProps={{
                    classes: {
                      focused: "my-custom-focus-label",
                    },
                  }}
                  InputProps={{
                    classes: {
                      focused: "my-custom-focus-class",
                    },
                  }}
                  sx={{
                    width: "80%",
                  }}
                  focused
                />
              </div>
              <div style={{ width: "50%" }}>
                <p
                  style={{
                    margin: 0,
                    marginBottom: "10px",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  Tipo de cita
                </p>
                <TextField
                  name="nombre"
                  value={cita.tipo_cita || ""}
                  id="outlined-start-adornment"
                  disabled
                  size="small"
                  InputLabelProps={{
                    classes: {
                      focused: "my-custom-focus-label",
                    },
                  }}
                  InputProps={{
                    classes: {
                      focused: "my-custom-focus-class",
                    },
                  }}
                  sx={{
                    width: "80%",
                  }}
                />
              </div>
              <div style={{ width: "100%" }}>
                <p
                  style={{
                    margin: 0,
                    marginBottom: "10px",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  Motivo de consulta
                </p>
                <TextField
                  name="descripcion"
                  size="small"
                  disabled
                  value={cita.motivo_consulta || ""}
                  id="outlined-start-adornment"
                  multiline
                  rows={3}
                  InputLabelProps={{
                    classes: {
                      focused: "my-custom-focus-label",
                    },
                  }}
                  InputProps={{
                    classes: {
                      focused: "my-custom-focus-class",
                    },
                  }}
                  sx={{ width: "80%" }}
                />
              </div>
            </Box>
          </div>

          <div
            style={{
              width: "45%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h1 style={{ fontSize: "15px" }}>Recomendaciones</h1>
              <p style={{ fontSize: "14px" }}>
                Recuerda tener en cuenta las siguientes recomendaciones
                generales a tener en cuenta para asistir a tu cita médica en
                Biomedical Group : <br />
                <br />
                1. Prepárate para tu cita: Antes de asistir a tu cita médica,
                asegurate de tener a mano toda información relevante sobre tu
                situación de salud actual, historial médico y síntomas.
                <br />
                <br />
                2. Llega con anticipación: Intenta llegar al centro médico con
                20 minutos de anticipación para presentarte en la recepción y
                evitar perder tu cita médica.
                <br />
                <br />
                3. Se claro y específico: Durante tu cita médica, ten en cuenta
                comunicar correctamente tus síntomas de forma clara y concisa,
                proporcionando los detalles suficientes para la correcta
                evaluación del médico.
                <br />
              </p>
            </div>
            <div className="F-A-botones-popup">
              <Button
                variant="outlined"
                onClick={() => HandlesetCita(cita.cita_id)}
                sx={{
                  width: "35%",
                  borderColor: "bioimedical.blue",
                  border: 2,
                  color: "biomedical.blue",

                  backgroundColor: "biomedical.white",
                  fontSize: "14px",
                  margin: 0,
                  ":hover": {
                    border: 2,
                    borderColor: "biomedical2.blue",
                  },
                }}
              >
                Eliminar cita
              </Button>
              <Button
                variant="contained"
                type="submit"
                form="form-registro-p"
                onClick={() => navigate(`/editarcita/${cita.cita_id}`)}
                sx={{
                  width: "35%",
                  color: "biomedical.white",
                  backgroundColor: "biomedical.blue",
                  fontSize: "14px",
                  margin: 0,

                  ":hover": {
                    bgcolor: "biomedical3.blue",
                    color: "white",
                  },
                }}
              >
                Editar cita
              </Button>
            </div>
          </div>
        </div>
      </Popup>
      <Popup
        openPopup={openPopupEC}
        setOpenPopup={setOpenPopupEC}
        width="sm"
        titulo="Cancelar de cita médica"
      >
        <div className="pop-div1">
          ¿Estas seguro de que quieres cancelar tu cita medica?
        </div>
        <div className="pop-div2">
          El espacio reservado pasara a estar disponible para otros usuarios y
          perderas tu cita
        </div>
        <div className="botones-popup-reg">
          <Button
            variant="contained"
            onClick={() => setOpenPopupEC(false)}
            sx={{
              width: "20%",
              color: "biomedical.white",
              backgroundColor: "biomedical.blue",
              fontSize: "14px",
              margin: 0,
              ":hover": {
                bgcolor: "biomedical3.blue",
                color: "white",
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => HandleDeleteCita(cita.cita_id)}
            form="form-registro-p"
            sx={{
              width: "20%",
              color: "biomedical.white",
              backgroundColor: "biomedical.blue",
              fontSize: "14px",
              margin: 0,

              ":hover": {
                bgcolor: "biomedical3.blue",
                color: "white",
              },
            }}
          >
            Confirmar
          </Button>
        </div>
      </Popup>
    </div>
  );
}

export default CitaCard;
