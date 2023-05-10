import "../styles/Perfil.css";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  Box,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { useAppContext } from "../context/ContextProvider";
import imgprofile from '../assets/Recurso 1@4x-100.jpg'

function EditPerfilP() {
  const { getUsuarioinfo, updateUsuario, getDepartamentos, getCiudades } =
    useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getuserinfo = async () => {
      const uinfo = await getUsuarioinfo();
      setUsuario(uinfo.data);
      setidValue(uinfo.data.tipo_identificacion);
      setValue(formatDateSQL(uinfo.data.fecha_nacimiento));
      setdepSelectedre({
        value: uinfo.data.depa_res_id,
        label: uinfo.data.depa_res,
      });
      setdepSelectedna({
        value: uinfo.data.dep_nac_id,
        label: uinfo.data.dep_nac,
      });
      setciuSelectedna({
        value: uinfo.data.id_ciudad_nac,
        label: uinfo.data.ciudad_nac,
      });
      setciuSelectedre({
        value: uinfo.data.id_ciudad_resi,
        label: uinfo.data.ciudad_res,
      });
      const uinfo4 = await getCiudades(uinfo.data.depa_res_id);
     
      setciudadesre(uinfo4.data);
      const uinfo5 = await getCiudades(uinfo.data.dep_nac_id);
   
      setciudadesna(uinfo5.data);
      const uinfod = await getDepartamentos();
      sedepartamentosre(uinfod.data);
      sedepartamentosna(uinfod.data);
    };

    getuserinfo();

  }, []);
  const [usuario, setUsuario] = useState(""); //informacion del usuario desde la base de datos
  const [openPopup, setOpenPopup] = useState(false); //estado del popup
  const [openPopup1, setOpenPopup1] = useState(false); //estado del popup 2
  const [value, setValue] = useState(""); //fecha de nacimiento
  const [idValue, setidValue] = useState(""); //tipo de identificacion
  const [userChanged, setuserChanged] = useState(""); //usuario actualizado para enviar

  //valores departamento y ciudad nacimiento
  const [depSelectedna, setdepSelectedna] = React.useState(null);
  const [ciuSelectedna, setciuSelectedna] = React.useState(null);
  const [departamentosna, sedepartamentosna] = useState([]);
  const [ciudadesna, setciudadesna] = useState([]);

  //departamentos de nacimiento actuales
  const OptionsDepartamentosna = departamentosna.map((departamento) => {
    return {
      value: departamento.departamento_id,
      label: departamento.nombre_departamento,
    };
  });
  //ciudadess de nacimiento actuales
  const OptionsCiudadesna = ciudadesna.map((city) => {
    return {
      value: city.ciudad_id,
      label: city.nombre_ciudad,
    };
  });

  //valores departamento y ciudad residencia
  const [depSelectedre, setdepSelectedre] = React.useState(null);
  const [ciuSelectedre, setciuSelectedre] = React.useState(null);
  const [departamentosre, sedepartamentosre] = useState([]);
  const [ciudadesrere, setciudadesre] = useState([]);

  //departamentos de nacimiento actuales
  const OptionsDepartamentosre = departamentosre.map((departamento) => {
    return {
      value: departamento.departamento_id,
      label: departamento.nombre_departamento,
    };
  });
  //ciudadess de nacimiento actuales
  const OptionsCiudadesre = ciudadesrere.map((city) => {
    return {
      value: city.ciudad_id,
      label: city.nombre_ciudad,
    };
  });

  //funciones
  const getcities = async (val) => {
    const uinfo4 = await getCiudades(val);
   
    setciudadesre(uinfo4.data);
  
  };
  const getcities2 = async (val) => {
    const uinfo4 = await getCiudades(val);
    
    setciudadesna(uinfo4.data);
   
  };
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  function formatDateSQL(dateformSQL) {
    const date = new Date(dateformSQL);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");
    return new Date(`${year}-${month}-${day}`);
  }
  const handleChangeid = (event) => {
    setidValue(event.target.value);
  };
  const handleSubmit = (values, initV) => {
    setOpenPopup(true);
    // Obtener los campos que fueron cambiados
    const changedFields = {};
    values.fecha_nacimiento = formatDate(value);
    values.tipo_identificacion = idValue;
    values.id_ciudad_nac = ciuSelectedna.value;
    values.id_ciudad_resi = ciuSelectedre.value;
   
    Object.keys(values).forEach((key) => {
      if (values[key] !== usuario[key]) {
        changedFields[key] = values[key];
  
      }
      setuserChanged(changedFields);
    });
  

    // Aquí puedes enviar los campos cambiados al servidor
  };
  const handleUpdateUser = async (userid, newfields) => {
    try {
      const response = await updateUsuario(userid, newfields);
      if (usuario.id_tipo_usuario === 1) {
        navigate("/paciente/perfil");
        console.log(response, "paciente actualizado");
      } else if (usuario.id_tipo_usuario === 2) {
        navigate("/medico/perfil");
        console.log(response, "medico actualizado");
      } else if(usuario.id_tipo_usuario === 3) {
        navigate("/recepcionista/perfil");
        console.log(response, "recepcionista actualizado");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <div className="P-form-head">
        <div style={{ width: "12%" }}>
          <img
            className="P-img-perfil"
            src={imgprofile}
            alt=""
          />
        </div>
        <div style={{ width: "68%" }}>
          <h1 style={{ fontSize: "20px" }}>Detalles de mi perfil</h1>
          <p style={{ fontSize: "16px" }}>
            En este apartado puedes observar tus datos personales y
            actualizarlos en cualquier momento.
          </p>
        </div>
        <div
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={() => setOpenPopup1(true)}
            form="form-registro-p"
            sx={{
              width: "75%",
              height: "50%",
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
            Eliminar perfil
          </Button>
        </div>
      </div>
      <div className="P-titulos-reg">
        <p>Datos basicos</p>
        <p>Datos de nacimiento y residencia</p>
        <p>Datos de contacto</p>
      </div>
      <div className="P-form-reg ">
        <Formik
          initialValues={{
            nombre_completo: usuario.nombre_completo,
            correo: usuario.correo,
            tipo_identificacion: usuario.tipo_identificacion,
            num_identificacion: usuario.num_identificacion,
            fecha_nacimiento: usuario.fecha_nacimiento,
            genero: usuario.genero,
            nacionalidad: usuario.nacionalidad,
            pais_nac: usuario.pais_nac,
            dep_nac: usuario.dep_nac,
            ciudad_nac: usuario.ciudad_nac,
            pais_res: usuario.pais_res,
            depa_res: usuario.depa_res,
            ciudad_res: usuario.ciudad_res,
            id_ciudad_nac: usuario.id_ciudad_nac,
            id_ciudad_resi: usuario.id_ciudad_resi,
            direccion: usuario.direccion,
            num_tel_celular: usuario.num_tel_celular,
            num_tel_fijo: usuario.num_tel_fijo,
          }}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit} id="P-form-registro-p">
              <div className="P-reg-input-bfield P-bfield-n">
                <Box sx={{ display: "flex", flexWrap: "wrap", height: "100%" }}>
                  <div>
                    <TextField
                      name="nombre_completo"
                      label="nombre completo"
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
                      value={values.nombre_completo || ""}
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
                      label="correo electronico"
                      name="correo"
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
                      value={values.correo || ""}
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "90%",
                        height: "15%",
                      }}
                      focused
                    />

                    <FormControl
                      // focused
                      sx={{
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "25%",
                        height: "15%",
                      }}
                    >
                      <InputLabel
                        className="iiiii"
                        id="demo-simple-select-label"
                      >
                        Tipo Id
                      </InputLabel>
                      <Select
                        name="tipo_identificacion"
                        className="iiiii"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={idValue}
                        label="Agevvvvv"
                        onChange={handleChangeid}
                      >
                        <MenuItem value={"Cedula de ciudadania"}>C.C</MenuItem>
                        {/* <MenuItem value={""}></MenuItem> */}
                        <MenuItem value={"C.C"}>C.C</MenuItem>
                        <MenuItem value={"Tarjeta de identidad"}>T.I</MenuItem>
                        <MenuItem value={"Pasaporte"}>PS</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      label="Número identificación"
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
                      name="num_identificacion"
                      onChange={handleChange}
                      value={values.num_identificacion || ""}
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      variant="outlined"
                      focused
                    />

                    <DatePicker
                      // name="fecha_nac"
                      label="fecha de nacimiento"
                      name="fecha_nacimiento"
                      format="yyyy-MM-dd"
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
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        color: "biomedical.green",
                        width: "48%",
                        height: "15%",
                      }}
                      focused
                    />

                    <TextField
                      label="Género"
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
                      name="genero"
                      onChange={handleChange}
                      value={values.genero || ""}
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "38%",
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
                      name="nacionalidad"
                      onChange={handleChange}
                      value={values.nacionalidad || ""}
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
                      onChange={handleChange}
                      value={values.pais_nac || ""}
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
                    <Autocomplete
                      options={OptionsDepartamentosna}
                      sx={{
                        m: 0,
                        position: "relative",
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                        display: "-webkit-inline-box",
                      }}
                      isOptionEqualToValue={(option, depSelectedna) =>
                        option.value === depSelectedna.value
                      }
                      value={depSelectedna}
                      onChange={(event, newValue) => {
                        getcities2(newValue.value);
                     
                        setdepSelectedna(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          sx={{ m: 0 }}
                          {...params}
                          label="Departamento nacimiento"
                          variant="outlined"
                          focused
                          InputLabelProps={{
                            classes: {
                              focused: "my-custom-focus-label",
                            },
                          }}
                        />
                      )}
                    />
                    <Autocomplete
                      options={OptionsCiudadesna}
                      sx={{
                        m: 0,
                        position: "relative",
                        marginTop: "8%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                        display: "-webkit-inline-box",
                      }}
               
                      isOptionEqualToValue={(option, ciuSelectedna) =>
                        option.value === ciuSelectedna.value
                      }
                      value={ciuSelectedna}
                    
                      onChange={(event, newValue) => {
                   
                        setciuSelectedna(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="ciudad nacimiento"
                          variant="outlined"
                          focused
                          InputLabelProps={{
                            classes: {
                              focused: "my-custom-focus-label",
                            },
                          }}
                        />
                      )}
                    />
                    {/* <TextField
                      label="Departamento de nacimiento"
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
                      name="dep_nac"
                      onChange={handleChange}
                      value={values.dep_nac || ""}
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
                      onChange={handleChange}
                      value={values.ciudad_nac || ""}
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      focused
                    /> */}
                    <TextField
                      label="País de residencia"
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
                      onChange={handleChange}
                      value={values.pais_res || ""}
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      focused
                    />
                    <Autocomplete
                      options={OptionsDepartamentosre}
                      // defaultChecked={values.depa_res}
                      sx={{
                        m: 0,
                        position: "relative",
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                        display: "-webkit-inline-box",
                      }}
                      isOptionEqualToValue={(option, depSelected) =>
                        option.value === depSelected.value
                      }
                      value={depSelectedre}
                      onChange={(event, newValue) => {
                        getcities(newValue.value);
                   
                        setdepSelectedre(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          sx={{ m: 0 }}
                          {...params}
                          label="Departamento residencia"
                          variant="outlined"
                          focused
                          InputLabelProps={{
                            classes: {
                              focused: "my-custom-focus-label",
                            },
                          }}
                        />
                      )}
                    />
                    <Autocomplete
                      options={OptionsCiudadesre}
                      sx={{
                        m: 0,
                        position: "relative",
                        marginTop: "8%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                        display: "-webkit-inline-box",
                      }}
               
                      isOptionEqualToValue={(option, ciuSelectedre) =>
                        option.value === ciuSelectedre.value
                      }
                      value={ciuSelectedre}
                
                      onChange={(event, newValue) => {
                      
                        setciuSelectedre(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="ciudad residencia"
                          variant="outlined"
                          focused
                          InputLabelProps={{
                            classes: {
                              focused: "my-custom-focus-label",
                            },
                          }}
                        />
                      )}
                    />
                    {/* <TextField
                      label="Departamento de residencia"
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
                      name="depa_res"
                      onChange={handleChange}
                      value={values.depa_res || ""}
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
                      onChange={handleChange}
                      value={values.ciudad_res || ""}
                      sx={{
                        m: 0,
                        marginTop: "8%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      focused
                    /> */}
                  </div>
                </Box>
              </div>
              <div className="P-reg-input-bfield">
                <Box sx={{ display: "flex", flexWrap: "wrap", height: "100%" }}>
                  <div>
                    <TextField
                      label="Direccion de residencia"
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
                      onChange={handleChange}
                      value={values.direccion || ""}
                      sx={{
                        m: 0,
                        marginTop: "12%",
                        marginLeft: "2%",
                        width: "85%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="Teléfono móvil"
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
                      name="num_tel_celular"
                      onChange={handleChange}
                      value={values.num_tel_celular || ""}
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
                      name="num_tel_fijo"
                      onChange={handleChange}
                      value={values.num_tel_fijo || ""}
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
                        width: "100%",
                        marginTop: "10%",
                      }}
                    >
                      <Button
                        variant="contained"
                        type="submit"
                        //onClick={() => setOpenPopup(true)}
                        sx={{
                          width: "60%",
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
                        Confirmar cambios
                      </Button>
                    </div>

                    <Popup
                      openPopup={openPopup}
                      setOpenPopup={setOpenPopup}
                      width="sm"
                      titulo="Confimar actualización de datos"
                    >
                      <div className="pop-div1">
                        Al continuar tu información será actualizada
                      </div>
                      <div className="pop-div2">
                        Recuerda que puedes realizar cambios a tu informacion
                        desde el apartado mi perfil en cualquier momento.
                      </div>
                      <div className="botones-popup-reg">
                        <Button
                          variant="outlined"
                          onClick={() => setOpenPopup(false)}
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
                          //type="submit"
                          form="form-registro-p"
                          onClick={() =>
                            handleUpdateUser(usuario.usuario_id, userChanged)
                          }
                          sx={{
                            width: "20%",
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
                              bgcolor: "biomedical3.blue", // theme.palette.primary.main
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

export default EditPerfilP;
