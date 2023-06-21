import "../styles/Perfil.css";
import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { Box, TextField, Button, IconButton } from "@mui/material";
import Popup from "./Popup";

import { useParams } from "react-router-dom";
import { useAppContext } from "../context/ContextProvider";
import { Close } from "@mui/icons-material";
import imgprofile from "../assets/Recurso 1@4x-100.jpg";

function PacientePview() {
  const params = useParams();
  const [value, setValue] = useState(new Date()); //Fecha actual
  const [openPopup, setOpenPopup] = useState(false);

  const { getUsuarioinfo, getUsuarioinfoFull, updateHistorial, getHistorial } =
    useAppContext();
  const [usuario, setUsuario] = useState("");
  const [docId, setdocId] = useState("");
  const [docType, setdocType] = useState("");
  const [usuariohist, setUsuariohist] = useState("");
  const [usuariohistD, setUsuariohistD] = useState("");

  const [botonVisible, setBotonVisible] = useState(true);

  const [disabled, setDisabled] = useState(true);

  const handleButtonClick = () => {
    setDisabled(!disabled);
  };
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  function handleClickbbb() {
    setDisabled(!disabled);
    setBotonVisible(false);
  }
  const handleClicsend = async (val) => {
    setOpenPopup(false);
    setDisabled(!disabled);
    setBotonVisible(true);
    const uuuu = await updateHistorial(params.id, {
      fecha_reg_hist: formatDate(value),
      descripcion: val,
      id_doctor: docId,
    });
    window.location.reload();
  };
  function formatDate1(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const formattedDate = `${day} de ${monthNames[month]} de ${year}`;

    return formattedDate;
  }
  function handleClickbbb1(resetForm) {
    setDisabled(!disabled);
    setBotonVisible(true);
    resetForm();
  }
  useEffect(() => {
    const getuserinfo = async () => {
      const uinfo = await getUsuarioinfoFull(params.id);
      const uinfo2 = await getHistorial(params.id);
      const uinfo3 = await getUsuarioinfo();

      setdocId(uinfo3.data.usuario_id);
      setdocType(uinfo3.data.id_tipo_usuario);
      setUsuario(uinfo.data);
      if (uinfo2.descripcion === "1") {
        setUsuariohistD("");
      } else {
        setUsuariohistD(uinfo2.descripcion);
      }
      setUsuariohist(uinfo2);
    };
    getuserinfo();
  }, []);

  function renderUpdated() {
    if (usuariohist.descripcion === "1") return <p>No hay registro</p>;
    return <p>Actualizado el:{usuariohist.fecha_reg_hist}</p>;
  }
  function renderUpdatedBy() {
    if (usuariohist.descripcion === "1") return <p></p>;
    return <p>Por:{usuariohist.nombre_medico}</p>;
  }

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "end",
          width: "90%",
          height: "22%",
          marginLeft: "5%",
          marginBottom: "1%",
        }}
      >
        <div style={{ width: "12%" }}>
          <img className="P-img-perfil" src={imgprofile} alt="" />
        </div>
        <div style={{ width: "68%" }}>
          <h1 style={{ fontSize: "20px" }}>Perfil de paciente</h1>
          <p style={{ fontSize: "16px" }}>{usuario.nombre_completo}</p>
        </div>
      </div>
      <div className="P-titulos-reg">
        <p>Datos básicos</p>
        <p>Datos de nacimiento y residencia</p>
        <p>Datos de contacto</p>
      </div>
      <div className="P-form-reg ">
        <Formik
          initialValues={{
            descripcion: usuariohistD,
          }}
          enableReinitialize
          onSubmit={(values) => {}}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            isSubmitting,
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit} id="P-form-registro-p">
              <div className="P-reg-input-bfield P-bfield-n">
                <Box sx={{ display: "flex", flexWrap: "wrap", height: "100%" }}>
                  <div>
                    <TextField
                      disabled
                      name="nombre"
                      size="small"
                      label="Nombre completo"
                      id="outlined-start-adornment"
                      value={usuario.nombre_completo || ""}
                      onChange={handleChange}
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
                        m: 0,
                        marginTop: "11%",
                        marginLeft: "2%",
                        width: "90%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      disabled
                      label="Correo electrónico"
                      size="small"
                      name="correo"
                      id="outlined-start-adornment"
                      onChange={handleChange}
                      value={usuario.correo || ""}
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
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "90%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="Tipo ID"
                      size="small"
                      disabled
                      name="tipo_id"
                      id="outlined-start-adornment"
                      onChange={handleChange}
                      value={usuario.tipo_identificacion || ""}
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
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "30%",
                        height: "15%",
                      }}
                      focused
                    />

                    <TextField
                      label="Número identificación"
                      disabled
                      size="small"
                      name="num_id"
                      id="outlined-start-adornment"
                      onChange={handleChange}
                      value={usuario.num_identificacion || ""}
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
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "57%",
                        height: "15%",
                      }}
                      variant="outlined"
                      focused
                    />

                    <TextField
                      label="Fecha de nacimiento"
                      disabled
                      size="small"
                      id="outlined-start-adornment"
                      name="fecha_nac"
                      onChange={handleChange}
                      value={usuario.fecha_nacimiento || ""}
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
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "43%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="Género"
                      size="small"
                      name="genero"
                      disabled
                      id="outlined-start-adornment"
                      onChange={handleChange}
                      value={usuario.genero || ""}
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
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "44%",
                        height: "15%",
                      }}
                      focused
                    />
                  </div>
                </Box>
              </div>
              <div className="P-bfield2 P-reg-input-bfield P-bfield-n ">
                <Box sx={{ display: "flex", flexWrap: "wrap", height: "100%" }}>
                  <div>
                    <TextField
                      label="Nacionalidad"
                      disabled
                      size="small"
                      id="outlined-start-adornment"
                      value={usuario.nacionalidad || ""}
                      onChange={handleChange}
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
                      name="nacionalidad"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="País de nacimiento"
                      disabled
                      size="small"
                      onChange={handleChange}
                      value={usuario.pais_nac || ""}
                      id="outlined-start-adornment"
                      InputLabelProps={{
                        classes: {
                          focused: "my-custom-focus-label",
                        },
                      }}
                      name="pais_nac"
                      InputProps={{
                        classes: {
                          focused: "my-custom-focus-class",
                        },
                      }}
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        color: "neutral",
                        height: "15%",
                        borderColor: "biomedical.green",
                      }}
                      focused
                    />
                    <TextField
                      label="Departamento de nacimiento"
                      disabled
                      size="small"
                      onChange={handleChange}
                      value={usuario.dep_nac || ""}
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
                      name="departamento_nac"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="Ciudad de nacimiento"
                      disabled
                      size="small"
                      onChange={handleChange}
                      value={usuario.ciudad_nac || ""}
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
                      name="ciudad_nac"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="País de residencia"
                      disabled
                      size="small"
                      onChange={handleChange}
                      value={usuario.pais_res || ""}
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
                      name="pais_res"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="Departamento de residencia"
                      disabled
                      size="small"
                      onChange={handleChange}
                      value={usuario.depa_res || ""}
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
                      name="departamento_res"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="Ciudad de residencia"
                      disabled
                      size="small"
                      onChange={handleChange}
                      value={usuario.ciudad_res || ""}
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
                      name="ciudad_res"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      focused
                    />
                  </div>
                </Box>
              </div>
              <div className="P-reg-input-bfield">
                <Box sx={{ display: "flex", flexWrap: "wrap", height: "100%" }}>
                  <div>
                    <TextField
                      label="Dirección de residencia"
                      disabled
                      size="small"
                      onChange={handleChange}
                      value={usuario.direccion || ""}
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
                      name="direccion"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "85%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="Teléfono móvil"
                      disabled
                      size="small"
                      onChange={handleChange}
                      value={usuario.num_tel_celular || ""}
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
                      name="movil"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "85%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="Teléfono fíjo"
                      disabled
                      size="small"
                      onChange={handleChange}
                      value={usuario.num_tel_fijo || ""}
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
                      name="fijo"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "85%",
                        height: "15%",
                      }}
                      focused
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "85%",
                        marginTop: "10%",
                        marginLeft: "2%",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => setOpenPopup(true)}
                        sx={{
                          width: "100%",
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
                        Historial clínico
                      </Button>
                    </div>
                  </div>
                </Box>
              </div>
              <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                width="md"
                titulo="Historial clínico"
              >
                <IconButton
                  aria-label="close"
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                  }}
                  onClick={() => setOpenPopup(false)}
                >
                  <Close />
                </IconButton>
                <div className="pop-div1">
                  <div> {renderUpdated()}</div>
                  <div> {renderUpdatedBy()}</div>
                </div>
                <div className="pop-div2">
                  <TextField
                    name="descripcion"
                    size="small"
                    id="outlined-start-adornment"
                    disabled={disabled}
                    onChange={handleChange}
                    value={values.descripcion || ""}
                    multiline
                    rows={10}
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
                    sx={{ width: "100%" }}
                  />
                </div>
                <div className="botones-popup-reg">
                  <div
                    style={{
                      width: "200px",
                      display: "flex",
                      justifyContent: " end",
                    }}
                  >
                    {botonVisible && docType === 2 && (
                      <Button
                        variant="contained"
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
                        onClick={handleClickbbb}
                      >
                        Editar
                      </Button>
                    )}
                    {!botonVisible && (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="outlined"
                          sx={{
                            width: "40%",
                            border: 2,
                            color: "biomedical.blue",
                            backgroundColor: "biomedical.white",
                            borderColor: "bioimedical.blue",
                            fontSize: "14px",
                            margin: 0,
                            ":hover": {
                              border: 2,
                              borderColor: "biomedical2.blue",
                            },
                          }}
                          onClick={() => handleClickbbb1(resetForm)}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="contained"
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
                          type="submit"
                          onClick={() => handleClicsend(values.descripcion)}
                          disabled={isSubmitting}
                        >
                          Confirmar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PacientePview;
