import React, { useState, useEffect } from "react";
import "../styles/calendario.css";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import Popup from "../Componentes/Popup";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Select, MenuItem } from "@mui/material";
import { useAppContext } from "../context/ContextProvider";

function Calendario() {
  const { getCitasCompletas, getUsuarioinfo } = useAppContext();
  const [listcitas, setlistcitas] = useState([]);
  const [usuario, setUsuario] = useState({});
  const navigate = useNavigate();
  const mostrarHoraConAmPm = (hora) => {
    const f = hora.slice(0, 2);
    if (f < 12) {
      const r = `${hora.substring(0, 5)} am`;
      return r;
    } else {
      const r = `${hora.substring(0, 5)} pm`;
      return r;
    }
  };
  useEffect(() => {
    const getlistCitas = async () => {
      const contentlist = await getCitasCompletas();
      const uinfo = await getUsuarioinfo();
      setUsuario(uinfo.data);
      setlistcitas(contentlist);
    };
    getlistCitas();
  }, []);

  //función para ajustar el start de los event del calendario
  const setEventStart = (listcitas) => {
    return listcitas.fecha_reg.slice(0, 10) + "T" + listcitas.hora_reg;
  };
  function formatDateslice(fec) {
    const frrr = fec.slice(0, 10);
    return frrr;
  }
  const [openPopup, setOpenPopup] = useState(false); //estado del popup
  const [infovalue, setinfoValue] = useState([]); //información de la cita seleccionada del calendario
  const [value, setValue] = useState(new Date()); //valor de la fecha actual

  //función para seleccionar la info de la cita
  const handleEventClick = (info) => {
    setinfoValue(info.event); // actualiza el título del evento seleccionado en el estado
    setOpenPopup(true); // actualiza la descripción del evento seleccionado en el estado
  };

  // cierra el diálogo
  const handleDialogClose = () => {
    setOpenPopup(false);
  };

  const rowscitas11 = listcitas.map((item) => ({
    id: item.cita_id,
    title: "Paciente: " + item.nombre_paciente,
    start: setEventStart(item),
    backgroundColor:
      item.id_doctor === "be4ed420-e31c-11ed-a0b5-fb1ba4924789"
        ? "#6bd16f"
        : "#4fa9f0",
    borderColor:
      item.id_doctor === "be4ed420-e31c-11ed-a0b5-fb1ba4924789"
        ? "#6bd16f"
        : "#4fa9f0",
    extendedProps: {
      fecha_reg: item.fecha_reg,
      motivo_consulta: item.motivo_consulta,
      hora_reg: item.hora_reg,
      nombre_medico: item.nombre_medico,
      nombre_paciente: item.nombre_paciente,
      tipo_cita: item.tipo_cita,
      id_paciente: item.id_paciente,
      id_doctor: item.id_doctor,
    },
  }));
  const rowcitamed = listcitas
    .filter((obj) => obj.id_doctor === usuario.usuario_id)
    .map((item) => ({
      id: item.cita_id,
      title: "Paciente: " + item.nombre_paciente,
      start: setEventStart(item),
      backgroundColor:
        item.id_doctor === "be4ed420-e31c-11ed-a0b5-fb1ba4924789"
          ? "#6bd16f"
          : "#4fa9f0",
      borderColor:
        item.id_doctor === "be4ed420-e31c-11ed-a0b5-fb1ba4924789"
          ? "#6bd16f"
          : "#4fa9f0",
      extendedProps: {
        fecha_reg: item.fecha_reg,
        motivo_consulta: item.motivo_consulta,
        hora_reg: item.hora_reg,
        nombre_medico: item.nombre_medico,
        nombre_paciente: item.nombre_paciente,
        tipo_cita: item.tipo_cita,
        id_paciente: item.id_paciente,
        id_doctor: item.id_doctor,
      },
    }));
  const rowscitas12 = listcitas.map((item) => ({
    id: item.cita_id,
    title: "Paciente: " + item.nombre_paciente,
    start: setEventStart(item),
    backgroundColor:
      item.id_doctor === "be4ed420-e31c-11ed-a0b5-fb1ba4924789"
        ? "#6bd16f"
        : "#4fa9f0",
    borderColor:
      item.id_doctor === "be4ed420-e31c-11ed-a0b5-fb1ba4924789"
        ? "#6bd16f"
        : "#4fa9f0",
    extendedProps: {
      fecha_reg: item.fecha_reg, // "2023-02-21T05:00:00.000Z",
      motivo_consulta: item.motivo_consulta,
      hora_reg: item.hora_reg, /// "xxxxxxxxxxxxxxxxxxxxxxxx",
      nombre_medico: item.nombre_medico, // "carlos",
      nombre_paciente: item.nombre_paciente, // "andres",
      tipo_cita: item.tipo_cita, // "primera vez",
      id_paciente: item.id_paciente,
      id_doctor: item.id_doctor,
    },
  }));

  const [filterValue, setFilterValue] = useState("Todas las citas");
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };
  const filterEvents = (events) => {
    if (filterValue === "Todas las citas" || !filterValue) {
      return events;
    }

    return events.filter(
      (event) => event.extendedProps.id_doctor === filterValue
    );
  };

  return (
    <div style={{ height: "98%" }}>
      {usuario.id_tipo_usuario === 3 && (
        <Select
          style={{
            width: "235px",
            position: "absolute",
            left: "44%",
            top: "13.8%",
          }}
          size="small"
          value={filterValue}
          onChange={handleFilterChange}
        >
          <MenuItem value="Todas las citas">Todas las citas</MenuItem>
          <MenuItem value="be4ed420-e31c-11ed-a0b5-fb1ba4924789">
            Camilo Andres Perez Orejuela
          </MenuItem>
          <MenuItem value="f2769300-e31c-11ed-a0b5-fb1ba4924789">
            Angela Maria Lopez Ortiz
          </MenuItem>
        </Select>
      )}

      <FullCalendar
        events={
          usuario.id_tipo_usuario === 3 ? filterEvents(rowscitas11) : rowcitamed
        }
        eventClick={handleEventClick}
        locale={esLocale}
        expandRows={true}
        nowIndicator={true}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        height="100%"
        timeZone="America/New_York"
        defaultTimedEventDuration={"00:30:00"}
        slotMinTime="07:00:00"
        slotMaxTime="13:30:00"
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short",
          hour12: false,
        }}
        allDaySlot={false}
        headerToolbar={{
          start: "dayGridMonth,timeGridWeek,timeGridDay today",
          center: "",
          end: "title prevYear,prev next,nextYear",
        }}
      />
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        width="md"
        height="80vh"
        titulo="Detalles de agendamiento de cita"
      >
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
                    marginBottom: "15px",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  Nombre del paciente
                </p>

                <TextField
                  size="small"
                  disabled
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
                  value={
                    infovalue.extendedProps
                      ? infovalue.extendedProps.nombre_paciente
                      : ""
                  }
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
                    marginBottom: "15px",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  Fecha de agendamiento
                </p>
                <TextField
                  value={
                    infovalue.extendedProps
                      ? formatDateslice(infovalue.extendedProps.fecha_reg)
                      : ""
                  }
                  size="small"
                  disabled
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
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
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
                    marginBottom: "15px",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  Hora
                </p>
                <TextField
                  name="nombre"
                  size="small"
                  value={
                    infovalue.extendedProps
                      ? mostrarHoraConAmPm(infovalue.extendedProps.hora_reg)
                      : ""
                  }
                  disabled
                  id="outlined-start-adornment"
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
                    marginBottom: "15px",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  Tipo de cita
                </p>
                <TextField
                  name="nombre"
                  disabled
                  value={
                    infovalue.extendedProps
                      ? infovalue.extendedProps.tipo_cita
                      : ""
                  }
                  id="outlined-start-adornment"
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
            <div style={{ width: "100%" }}>
              <p
                style={{
                  margin: 0,
                  marginBottom: "15px",
                  marginTop: "15px",
                  fontSize: "14px",
                }}
              >
                Motivo de consulta
              </p>
              <TextField
                name="descripcion"
                disabled
                size="small"
                value={
                  infovalue.extendedProps
                    ? infovalue.extendedProps.motivo_consulta
                    : ""
                }
                id="outlined-start-adornment"
                multiline
                rows={5}
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
            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "flex-end",
                gap: "20px",
              }}
            >
              <Button
                variant="outlined"
                onClick={handleDialogClose}
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
                Cerrar
              </Button>
              <Button
                variant="contained"
                type="submit"
                form="form-registro-p"
                onClick={() => {
                  if (infovalue.extendedProps) {
                    navigate(
                      `/paciente/${infovalue.extendedProps.id_paciente}`
                    );
                  }
                }}
                sx={{
                  width: "40%",
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
                Ver paciente
              </Button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default Calendario;
