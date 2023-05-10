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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/FormAgenC.css";
import Popup from "../Componentes/Popup";
import { useAppContext } from "../context/ContextProvider";
function FormularioAgenC() {
  const { createCita, getHorarios, getCitas } = useAppContext();
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getlistCitas = async () => {
      const contentlist = await getCitas();
     
      setlistadoCitas2(contentlist);
    };
    getlistCitas();
  }, []);
  //valores de select
  const [value, setValue] = useState(new Date()); //Fecha actual
  const [idValue, setidValue] = useState(""); //id del doctor seleccionado para consulta de la base de datos
  const [idValue3, setidValue3] = useState(""); //hora de registro de la cita
  const [nombredoc, setnombredoc] = useState(""); //nombre del doctor seleccionado

  const [citainfoC, seticitainfoC] = useState(""); //Informacion completa de la cita
  const [listadoCitas, setlistadoCitas] = useState([]); //Listado de las citas medicas consultadas en la base de datos
  const [listadoCitas2, setlistadoCitas2] = useState([]); //Listado de las citas medicas actuales del usuario
  const [listadoCitas3, setlistadoCitas3] = useState([]); //Listado de los horarios de las citas actuales

  
  const [idValuedoc, setidValuedoc] = useState("");

  //formateador fecha
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  //funcion para traer el valor del id del doctor seleccionado de la lista de doctores
  function buscarObjetoPorPropiedad(lista, propiedad, valor) {
    return lista.find(function (objeto) {
      return objeto[propiedad] === valor;
    });
  }

  //controlador valores select de doctores
  const handleChangeid2 = (event) => {
    let objetoBuscado = buscarObjetoPorPropiedad(
      docs,
      "idd",
      event.target.value
    );
    setnombredoc(objetoBuscado);
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

  //crear cita
  const handleCreateCita = async (citaI) => {
    try {
      const response = await createCita(citaI);

      navigate("/inicio");
      
    } catch (error) {
      console.log(error);
    }
  };
  //consultar horarios disponibles para el agendamiento
  const gethorariosAvailable = async (infohorarios) => {
    const inforesult = await getHorarios(infohorarios);
    setlistadoCitas(inforesult);
   
  };

  //listados de horarios predeterminados y doctores de la base de datos
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
  const docs = [
    {
      docnombre: "Camilo Andres Perez Orejuela",
      idd: "be4ed420-e31c-11ed-a0b5-fb1ba4924789",
    },
    {
      docnombre: "Angela Maria Lopez Ortiz",
      idd: "f2769300-e31c-11ed-a0b5-fb1ba4924789",
    },
  ];
  function mostrarHoraConAmPm(hora) {
    const f = hora.slice(0, 2);
    if (f < 12) {
      const r = `${hora} am`;
      return r;
    } else {
      const r = `${hora} pm`;
      return r;
    }
  }
  const horariosDiferentes = horarios1.filter(
    (h1) =>
      !listadoCitas.some((h2) => h2.hora_reg === h1.hora_reg) &&
      !listadoCitas3.some((obj3) => obj3 === h1.hora_reg)
  );
  function horariosTomados(list, propValue) {
    return list
      .filter((obj) => formatDateslice(obj.fecha_reg) === propValue)
      .map((obj) => obj.hora_reg);
  }
  function formatDateslice(fec) {
    const frrr = fec.slice(0, 10);
    return frrr;
  }
 
  return (
    <div>
      <Formik
        initialValues={{
          fecha_reg: { value },
          id_doctor: "",
          hora_reg: "",
          tipo_cita: "",
          estado_asistencia: 1,
          motivo_consulta: "",
        }}
        onSubmit={(values) => {
         
          values.fecha_reg = formatDate(value);
          values.tipo_cita = idValue;
          values.id_doctor = idValuedoc;
          values.hora_reg = idValue3;
          seticitainfoC(values);
        }}
      >
        {({ handleChange, handleSubmit, values, }) => (
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
                    1. Selecciona el doctor que te atenderá:
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
                    4. Seleccion el tipo de cita.
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
                    medica.
                  </p>
                  <DatePicker
                    name="fecha_nac"
                    
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
                  <p>5. Describe el motivo de la consulta.</p>
                  <TextField
                    name="motivo_consulta"
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
                    sx={{ width: "70%" }}
                    focused
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <p>3. Selecciona el horario para tu cita.</p>
                  <FormControl
                    focused
                    sx={{
                      width: "70%",
                    }}
                  >
                    <Select
                    
                      value={idValue3}
                      onChange={handleChangeid3}
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
                   
                    onClick={() =>setOpenPopup(true)}
                    sx={{
                      height: "40%",
                      width: "70%",
                      color: "biomedical.white",
                      backgroundColor: "biomedical.blue",
                      fontSize: "16px",

                      ":hover": {
                        bgcolor: "biomedical3.blue",
                        color: "white",
                      },
                    }}
                  >
                    Agendar cita
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
                            marginBottom: "15px",
                            marginTop: "15px",
                            fontSize: "14px",
                          }}
                        >
                          Doctor
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
                          value={nombredoc.docnombre || ""}
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
                          // name="fecha_nac"
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
                          // value={value}
                          // onChange={(value)=>setValue()}
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          // handleChange={handleChange}
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
                          disabled
                          name="hora_reg"
                          size="small"
                          value={values.hora_reg || ""}
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
                            marginBottom: "15px",
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
                            marginBottom: "15px",
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum
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
                        onClick={() => handleCreateCita(citainfoC)}
                        sx={{
                          width: "35%",
                          color: "biomedical.white",
                          backgroundColor: "biomedical.blue",
                          fontSize: "14px",
                          margin: 0,

                          ":hover": {
                            bgcolor: "biomedical3.blue", // theme.palette.primary.main
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

export default FormularioAgenC;
