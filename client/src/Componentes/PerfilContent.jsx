import "../styles/Perfil.css";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Formik, Form } from "formik";
import {
  Box,
  TextField,
  Button,
  IconButton,
  DialogContent,
  Typography,
} from "@mui/material";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ContextProvider";
import imgprofile from "../assets/Recurso 1@4x-100.jpg";
import { Close } from "@mui/icons-material";

function PerfilContent() {
  const vvvvv =
    " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the likeWhere does it come from?Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33he Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 fromby Cicero a";
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup1, setOpenPopup1] = useState(false);
  const navigate = useNavigate();
  const [usuariohist, setUsuariohist] = useState("");
  const { getUsuarioinfo, getHistorial } = useAppContext();
  const [usuario, setUsuario] = useState("");
  const [nacFecha, setnacFecha] = useState("");
  const [fechaHist, setfechaHist] = useState("");
  useEffect(() => {
    const getuserinfo = async () => {
      const uinfo = await getUsuarioinfo();
      setUsuario(uinfo.data);
      const uinfo2 = await getHistorial(uinfo.data.usuario_id);
      setUsuariohist(uinfo2);
      setnacFecha(uinfo.data.fecha_nacimiento.slice(0, 10));

      setfechaHist(formatDate(uinfo2.fecha_reg_hist));
    };
    getuserinfo();
  }, []);
  function formatDate(dateString) {
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
  const formatFecha = (date) => {
    const dateObj = new Date(date);
    const formattedDate = format(dateObj, "yyyy-MM-dd");
    return formattedDate;
  };
  return (
    <div style={{ height: "100%" }}>
      <div className="P-form-head">
        <div style={{ width: "12%" }}>
          <img className="P-img-perfil" src={imgprofile} alt="" />
        </div>
        <div style={{ width: "57%" }}>
          <h1 style={{ fontSize: "20px" }}>Detalles de mi perfil</h1>
          <p style={{ fontSize: "15px" }}>
            En este apartado puedes observar tus datos personales y
            actualizarlos en cualquier momento.
          </p>
        </div>
        <div
          style={{
            width: "27%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/editarpaciente/perfil")}
            sx={{
              color: "biomedical.white",
              backgroundColor: "biomedical.blue",
              fontSize: "14px",
              margin: 0,
              width: "60%",
              ":hover": {
                bgcolor: "biomedical3.blue",
                color: "white",
              },
            }}
          >
            Editar perfil
          </Button>
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
            nombre: "",
            correo: "",
            tipo_id: "",
            num_id: "",
            fecha_nac: "",
            genero: "",
            nacionalidad: "",
            pais_nac: "",
            departamento_nac: "",
            ciudad_nac: "",
            pais_res: "",
            departamento_res: "",
            ciudad_res: "",
            direccion: "",
            movil: "",
            fijo: "",
          }}
          onSubmit={(values) => {}}
        >
          {({ handleChange, handleSubmit }) => (
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
                      name="num_id"
                      size="small"
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
                      value={nacFecha || ""}
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
                      name="genero"
                      size="small"
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
                    <div className="botones-perfil">
                      <Button
                        variant="contained"
                        onClick={() => setOpenPopup(true)}
                        sx={{
                          color: "biomedical.white",
                          backgroundColor: "biomedical.blue",
                          fontSize: "14px",
                          margin: 0,
                          width: "100%",
                          ":hover": {
                            bgcolor: "biomedical3.blue",
                            color: "white",
                          },
                        }}
                      >
                        Historial clínico
                      </Button>
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
                        <div>
                          {" "}
                          <p>Actualizado el: {fechaHist}</p>
                        </div>
                        <div>
                          {" "}
                          <p>Por: {usuariohist.nombre_medico} </p>
                        </div>
                      </div>
                      <div className="pop-div2">
                        <Box
                          sx={{
                            height: "50vh",
                            overflowY: "auto",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        >
                          <Typography variant="body1" sx={{ padding: "8px" }}>
                            {usuariohist.descripcion}
                          </Typography>
                        </Box>
                      </div>
                      <div className="botones-popup-reg"></div>
                    </Popup>
                    <Popup
                      openPopup={openPopup1}
                      setOpenPopup={setOpenPopup1}
                      width="sm"
                      titulo="Eliminar perfil personal permanentemente"
                    >
                      <div className="pop-div1">
                        ¿Estas seguro de que quieres eliminar tu cuenta?
                      </div>
                      <div className="pop-div2">
                        Ya no podras ingresar a tu espacio para agendamiento de
                        citas pero tus datos seran guardados en caso de que sea
                        necesario consultar tu actividad en Biomedical Group en
                        un futuro.
                      </div>
                      <div className="botones-popup-reg">
                        <Button
                          variant="outlined"
                          onClick={() => setOpenPopup1(false)}
                          sx={{
                            width: "20%",
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
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="contained"
                          type="submit"
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
                </Box>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PerfilContent;
