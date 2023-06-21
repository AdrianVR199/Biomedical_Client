import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Form, Formik } from "formik";
import {
  Box,
  TextField,
  Button,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/FormAgenC.css";
import { format } from "date-fns";
import Popup from "../Componentes/Popup";
import { useAppContext } from "../context/ContextProvider";

function EditCita() {
  const params = useParams();
  const navigate = useNavigate();
  const { getHorarios, getCita, getCitas, UpdateCita } = useAppContext();

  useEffect(() => {
    const getcitainfo = async () => {
      const uinfo = await getCita(params.id);
      setcitaToUpdate(uinfo);
      setcitaid(uinfo.cita_id);
      setValue(formatDateSQL(uinfo.fecha_reg));
      setidValue(uinfo.tipo_cita);
      setidValuedoc(uinfo.id_doctor);
      setidValue3(uinfo.hora_reg);
      setnombredoc(uinfo.nombre_medico);
      horariosDiferentes.push(uinfo.hora_reg);
      const fecha = uinfo.fecha_reg.slice(0, 10);

      gethorariosAvailable({
        id_doctor: uinfo.id_doctor,
        fecha_reg: fecha,
      });
      const contentlist = await getCitas();

      setlistadoCitas2(contentlist);

      setlistadoCitas3(
        horariosTomados(contentlist, formatDateslice(uinfo.fecha_reg))
      );
    };

    getcitainfo();
  }, []);

  const [citaid, setcitaid] = useState(""); //id de la cita para la actualizacion de datos
  const [citaToUpdate, setcitaToUpdate] = useState(""); //datos de la cit a actualizar
  const [openPopup, setOpenPopup] = useState(false); //estado de los popup
  const today = new Date();
  //valores de select
  const [value, setValue] = useState(new Date()); //Fecha actual
  const [idValue, setidValue] = useState(""); //tipo de cita
  const [idValue3, setidValue3] = useState(""); //hora de registro de la cita
  const [nombredoc, setnombredoc] = useState(""); //nombre del doctor seleccionado
  const [userChanged, setuserChanged] = useState(""); //datos de cita para cambiar
  const [listadoCitas2, setlistadoCitas2] = useState([]); //Listado de las citas medicas actuales del usuario
  const [listadoCitas3, setlistadoCitas3] = useState([]); //Listado de los horarios de las citas actuales
  const [listadoCitas, setlistadoCitas] = useState([]); //listado de las citas en la base de datos
  const [idValuedoc, setidValuedoc] = useState("");

  //formateador fecha
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  //formateador fecha de datos sql
  function formatDateSQL(dateformSQL) {
    const date = new Date(dateformSQL);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");
    return new Date(`${year}-${month}-${day}`);
  }

  //funcion para traer el valor del id del doctor seleccionado de la lista de doctores
  function buscarObjetoPorPropiedad(lista, propiedad, valor) {
    return lista.find(function (objeto) {
      return objeto[propiedad] === valor;
    });
  }
  const formatFecha = (date) => {
    const dateObj = new Date(date);
    const formattedDate = format(dateObj, "yyyy-MM-dd");
    return formattedDate;
  };
  //controlador valores select de doctores
  const handleChangeid2 = (event) => {
    let objetoBuscado = buscarObjetoPorPropiedad(
      docs,
      "idd",
      event.target.value
    );
    setnombredoc(objetoBuscado.nombre_medico);
    setidValuedoc(event.target.value);
  };
  //controlador valores select de tipo de cita
  const handleChangeid = (event) => {
    setidValue(event.target.value);
  };
  //controlador valores select de horarios
  const handleChangeid3 = (event) => {
    setidValue3(event.target.value);
  };

  //actualizar cita
  const handleUpdateCita = async (citaI, infoactuali) => {
    try {
      const response = await UpdateCita(citaI, infoactuali);

      navigate("/inicio");
    } catch (error) {
      console.log(error);
    }
  };
  //obtener los horarios disponibles para agendamiento
  const gethorariosAvailable = async (infohorarios) => {
    const inforesult = await getHorarios(infohorarios);
    setlistadoCitas(inforesult);
  };
  // horarios predeterminados
  const horarios1 = [
    { hora_reg: "08:00:00" },
    { hora_reg: "08:30:00" },
    { hora_reg: "09:00:00" },
    { hora_reg: "09:30:00" },
    { hora_reg: "10:00:00" },
    { hora_reg: "10:30:00" },
    { hora_reg: "11:00:00" },
    { hora_reg: "11:30:00" },
    { hora_reg: "12:00:00" },
  ];
  //horarios comparados con los predetemrinados para mostrar los difernete
  const horariosDiferentes = horarios1.filter(
    (h1) =>
      !listadoCitas.some((h2) => h2.hora_reg === h1.hora_reg) &&
      !listadoCitas3.some((obj3) => obj3 === h1.hora_reg)
  );
  //horarios tomados por los usuarios registrados en la base de datos
  function horariosTomados(list, propValue) {
    return list
      .filter((obj) => formatDateslice(obj.fecha_reg) === propValue)
      .map((obj) => obj.hora_reg);
  }
  //formatear el dato de fecha para mostar los primero 11 valores
  function formatDateslice(fec) {
    const frrr = fec.slice(0, 10);
    return frrr;
  }
  //administrar el submit del formulario
  const handleSubmit = (values, initV) => {
    setOpenPopup(true);

    const changedFields = {};
    values.fecha_reg = formatDate(value);
    values.tipo_cita = idValue;
    values.id_doctor = idValuedoc;
    values.hora_reg = idValue3;

    Object.keys(values).forEach((key) => {
      if (values[key] !== citaToUpdate[key]) {
        changedFields[key] = values[key];
      }
      setuserChanged(changedFields);
    });
  };
  //listado de doctores
  const docs = [
    {
      nombre_medico: "Camilo Andres Perez Orejuela",
      idd: "be4ed420-e31c-11ed-a0b5-fb1ba4924789",
    },
    {
      nombre_medico: "Angela Maria Lopez Ortiz",
      idd: "f2769300-e31c-11ed-a0b5-fb1ba4924789",
    },
  ];
  //formatear hora del select
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

  return (
    <div>
      <Formik
        initialValues={{
          fecha_reg: citaToUpdate.fecha_reg,
          id_doctor: citaToUpdate.id_doctor,
          hora_reg: citaToUpdate.hora_reg,
          tipo_cita: citaToUpdate.tipo_cita,
          estado_asistencia: 1,
          motivo_consulta: citaToUpdate.motivo_consulta,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values }) => (
          <Form>
            <div>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  minHeight: "50% !important",
                  marginLeft: "50px",
                }}
              >
                <div style={{ width: "50%" }}>
                  <p style={{ width: "70%", marginBottom: "40px" }}>
                    1. Selecciona el médico que te atenderá:
                  </p>
                  <FormControl
                    focused
                    sx={{
                      width: "70%",
                    }}
                  >
                    <Select
                      className="iiiii"
                      size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={idValuedoc}
                      onChange={handleChangeid2}
                      sx={{
                        ".MuiOutlinedInput-notchedOutline": {
                          border: 1,
                          borderColor: "#d2d2d2",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: 1,
                          borderColor: "#d2d2d2",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: 1,
                          borderColor: "#d2d2d2",
                        },
                      }}
                    >
                      <MenuItem value={"be4ed420-e31c-11ed-a0b5-fb1ba4924789"}>
                        Camilo Andres Perez Orejuela
                      </MenuItem>

                      <MenuItem value={"f2769300-e31c-11ed-a0b5-fb1ba4924789"}>
                        Angela Maria Lopez Ortiz
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div style={{ width: "50%" }}>
                  <p style={{ width: "70%", marginBottom: "40px" }}>
                    4. Selecciona el tipo de cita:
                  </p>
                  <FormControl
                    focused
                    sx={{
                      width: "70%",
                    }}
                  >
                    <Select
                      className="iiiii"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      size="small"
                      value={idValue}
                      onChange={handleChangeid}
                      sx={{
                        ".MuiOutlinedInput-notchedOutline": {
                          border: 1,
                          borderColor: "#d2d2d2",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: 1,
                          borderColor: "#d2d2d2",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: 1,
                          borderColor: "#d2d2d2",
                        },
                      }}
                    >
                      <MenuItem value={"Cita de primera vez"}>
                        Cita de primera vez
                      </MenuItem>

                      <MenuItem value={"Cita de control"}>
                        Cita de control
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div style={{ width: "50%" }}>
                  <p style={{ width: "70%", marginBottom: "25px" }}>
                    2. Busca y selecciona la fecha deseada para agendar tu cita
                    médica:
                  </p>
                  <DatePicker
                    name="fecha_reg"
                    slotProps={{ textField: { size: "small" } }}
                    minDate={today}
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
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);

                      gethorariosAvailable(
                        {
                          id_doctor: idValuedoc,
                          fecha_reg: formatDate(newValue),
                        },
                        "yeah"
                      );
                      setlistadoCitas3(
                        horariosTomados(listadoCitas2, formatDate(newValue))
                      );
                    }}
                    sx={{
                      width: "70%",
                    }}
                    focused
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <p>5. Describe el motivo de la consulta:</p>
                  <TextField
                    name="motivo_consulta"
                    id="outlined-start-adornment"
                    multiline
                    size="small"
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
                    value={values.motivo_consulta || ""}
                    onChange={handleChange}
                    sx={{ width: "70%" }}
                    focused
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <p>3. Selecciona el horario para tu cita médica:</p>
                  <FormControl
                    focused
                    sx={{
                      width: "70%",
                    }}
                  >
                    <Select
                      value={idValue3}
                      onChange={handleChangeid3}
                      size="small"
                      sx={{
                        ".MuiOutlinedInput-notchedOutline": {
                          border: 1,
                          borderColor: "#d2d2d2",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: 1,
                          borderColor: "#d2d2d2",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: 1,
                          borderColor: "#d2d2d2",
                        },
                      }}
                    >
                      {horariosDiferentes.map((option) => (
                        <MenuItem key={option.hora_reg} value={option.hora_reg}>
                          {mostrarHoraConAmPm(option.hora_reg)}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      Hora actual de agendamiento: {citaToUpdate.hora_reg}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      height: "32%",
                      width: "70%",
                      marginBottom: "6%",
                      color: "biomedical.white",
                      backgroundColor: "biomedical.blue",
                      fontSize: "16px",

                      ":hover": {
                        bgcolor: "biomedical3.blue",
                        color: "white",
                      },
                    }}
                  >
                    Actualizar cita
                  </Button>
                </div>
              </Box>

              <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                width="md"
                height="80vh"
                titulo="Detalles de agendamiento de cita"
              >
                <div>
                  <div style={{ fontSize: "14px" }}>
                    Al continuar tu cita sera agendada en el sistema.
                  </div>
                  <div style={{ fontSize: "14px" }}>
                    Recuerda que puedes realizar cambios a la fecha y hora de tu
                    cita o cancelarla desde la pagina de inicio.
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
                          value={nombredoc || ""}
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
                          value={formatFecha(value)}
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
                            marginBottom: "10px",
                            marginTop: "15px",
                            fontSize: "14px",
                          }}
                        >
                          Hora
                        </p>
                        <TextField
                          disabled
                          name="hora_reg"
                          size="small"
                          value={mostrarHoraConAmPm(idValue3) || ""}
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
                          onChange={handleChange}
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
                          name="tipocita"
                          label={idValue}
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
                          onChange={handleChange}
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
                          name="motivo_consulta"
                          disabled
                          size="small"
                          value={values.motivo_consulta || ""}
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
                          onChange={handleChange}
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
                        generales a tener en cuenta para asistir a tu cita
                        médica en Biomedical Group : <br />
                        <br />
                        1. Prepárate para tu cita: Antes de asistir a tu cita
                        médica, asegurate de tener a mano toda información
                        relevante sobre tu situación de salud actual, historial
                        médico y síntomas.
                        <br />
                        <br />
                        2. Llega con anticipación: Intenta llegar al centro
                        médico con 20 minutos de anticipación para presentarte
                        en la recepción y evitar perder tu cita médica.
                        <br />
                        <br />
                        3. Se claro y específico: Durante tu cita médica, ten en
                        cuenta comunicar correctamente tus síntomas de forma
                        clara y concisa, proporcionando los detalles suficientes
                        para la correcta evaluación del médico.
                        <br />
                      </p>
                    </div>
                    <div className="F-A-botones-popup">
                      <Button
                        variant="outlined"
                        onClick={() => setOpenPopup(false)}
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
                        Cancelar
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        form="form-registro-p"
                        onClick={() => handleUpdateCita(params.id, userChanged)}
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
                        Confirmar
                      </Button>
                    </div>
                  </div>
                </div>
              </Popup>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditCita;
