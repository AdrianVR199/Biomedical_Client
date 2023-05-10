import React, { useState, useEffect } from "react";
import "../styles/registro.css";
import logoT from "../assets/Logo horizontal- transparente.png";
import { Formik, Form } from "formik";
import {
  Box,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  styled,
  InputBase,
  Autocomplete,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "../Componentes/Popup";
import { DatePicker } from "@mui/x-date-pickers";
import { useAppContext } from "../context/ContextProvider";
import * as Yup from "yup";

function RegistroForm() {
  //llamado de los departamentos
  useEffect(() => {
    const getdepInfo = async () => {
      const uinfo = await getDepartamentos();
      sedepartamentosre(uinfo.data);
      sedepartamentosna(uinfo.data);

      // const uinfo4 = await getCiudades(5);
      // console.log(uinfo4.data);
      // console.log(uinfo.data, "info normi");
    };
    getdepInfo();
  }, []);
  const validationSchema = Yup.object().shape({
    nombre_completo: Yup.string().required("Ingrese su nombre completo"),
    // tipo_identificacion: Yup.string().required(
    //   "Seleccione un tipo de identifcacion"
    // ),
    num_identificacion: Yup.number()
      .typeError("Solo valores numericos")
      .required("Obligatorio"),
    // fecha_nacimiento: Yup.string().required(
    //   "Seleccione su fecha de nacimiento"
    // ),
    genero: Yup.string().required("Ingrese su genero"),
    nacionalidad: Yup.string().required("Obligatorio"),
    // id_ciudad_nac: Yup.string().required("Seleccione su ciudad de nacimiento"),
    //departamento_nac: Yup.string().required("Obligatorio"),
    pais_nac: Yup.string().required("Obligatorio"),
    //  id_ciudad_resi: Yup.string().required("Seleccione su ciudad de nacimiento"),
    // id_dep_resi: Yup.string().required(
    //   "Seleccione su departamento de nacimiento"
    // ),
    pais_res: Yup.string().required("Obligatorio"),
    direccion: Yup.string().required("Ingrese su direccion de residencia"),
    num_tel_celular: Yup.number()
      .typeError("Solo valores numericos")
      .required("Ingrese su numero de telefono"),
  });
  //context
  const { SignUpUser, getDepartamentos, getCiudades } = useAppContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { correo, contraseña } = state;
  //popup
  const [openPopup, setOpenPopup] = useState(false);
  console.log(correo, contraseña, "pasinfruit");
  //set de los values
  const [value, setValue] = useState(new Date());

  //valores departamento y ciudad nacimiento
  const [depSelectedna, setdepSelectedna] = React.useState(null);
  const [ciuSelectedna, setciuSelectedna] = React.useState(null);
  const [departamentosna, sedepartamentosna] = useState([]);
  const [ciudadesna, setciudadesna] = useState([]);
  const OptionsDepartamentosna = departamentosna.map((departamento) => {
    return {
      value: departamento.departamento_id,
      label: departamento.nombre_departamento,
    };
  });
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
  const OptionsDepartamentosre = departamentosre.map((departamento) => {
    return {
      value: departamento.departamento_id,
      label: departamento.nombre_departamento,
    };
  });
  const OptionsCiudadesre = ciudadesrere.map((city) => {
    return {
      value: city.ciudad_id,
      label: city.nombre_ciudad,
    };
  });

  const [UsuarioInfo, setUsuarioInfo] = useState("");
  const [idValue, setidValue] = useState("");

  //funciones
  const getcities = async (val) => {
    const uinfo4 = await getCiudades(val);
    console.log(uinfo4.data, "inposhilbe");
    setciudadesre(uinfo4.data);
    // console.log(uinfo.data, "info normi");
  };
  const getcities2 = async (val) => {
    const uinfo4 = await getCiudades(val);
    console.log(uinfo4.data, "inposhilbe");
    setciudadesna(uinfo4.data);
    // console.log(uinfo.data, "info normi");
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const handleChangeid = (event) => {
    setidValue(event.target.value);
  };
  const handleSignUpUser = async (userI) => {
    try {
      const response = await SignUpUser(userI);

      navigate("/inicio");
      console.log(response, "respuesta a la epticion en el signup");
    } catch (error) {
      console.log(error);
    }
  };

  // const options = [
  //   { value: "2", label: "carro" },
  //   { value: "3", label: "moto" },
  //   { value: "4", label: "bici" },
  //   { value: "5", label: "bici" },
  //   { value: "6", label: "dmoto opera" },
  //   { value: "7", label: "dhijuepuuta" },
  //   { value: "8", label: "fcarro montero cuarentai" },
  //   { value: "9", label: "fmoto opera" },
  //   { value: "10", label: "fhijuepuuta" },
  //   { value: "option12", label: "gcarro montero cuarentai" },
  //   { value: "option22", label: "gmoto opera" },
  //   { value: "option32", label: "ghijuepuuta" },
  //   { value: "option13", label: "hcarro montero cuarentai" },
  //   { value: "option23", label: "hmoto opera" },
  //   { value: "option33", label: "hhijuepuuta" },
  //   { value: "option14", label: "cjarro montero cuarentai" },
  //   { value: "option24", label: "jmoto opera" },
  //   { value: "option35", label: "jhijuepuuta" },
  // ];
  console.log(UsuarioInfo, "eldiaablo");

  //console.log(departamentos)
  //console.log(value, "fecha");
  // console.log(
  //   depSelectedre,
  //   ciuSelectedre,
  //   depSelectedna,
  //   ciuSelectedna,
  //   "ambos datos"
  // );
  // console.log(ciudadesrere, "arreglo de ciudades");

  return (
    <div className="form-reg-p">
      <div className="form-body">
        <div className="form-head">
          <div className="form-info">
            <h1>Crea tu cuenta personal</h1>
            <p>
              Ingresa por favor la siguiente informacion para completar tu
              registro en el sistema y poder acceder a tu cuenta:
            </p>
          </div>
          <div className="form-img">
            <img src={logoT} alt="" />
          </div>
        </div>
        <div className="titulos-reg">
          <p>Datos basicos</p>
          <p>Datos de nacimiento y residencia</p>
          <p>Datos de contacto</p>
        </div>
        <div className="form-reg">
          <Formik
            initialValues={{
              nombre_completo: "",
              correo: correo,
              contraseña: contraseña,
              tipo_identificacion: { idValue },
              num_identificacion: "",
              fecha_nacimiento: { value },
              genero: "",
              nacionalidad: "",
              pais_nac: "",
              departamento_nac: "",
              id_ciudad_nac: "",
              pais_res: "",
              departamento_res: "",
              id_ciudad_resi: "",
              id_tipo_usuario: 1,
              id_imagen: 0,
              direccion: "",
              num_tel_celular: "",
              num_tel_fijo: "",
              //id_nu: "fdfdfdf",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setOpenPopup(true);
              values.fecha_nacimiento = formatDate(value);
              values.tipo_identificacion = idValue;
              values.id_ciudad_nac = ciuSelectedna.value;
              values.id_ciudad_resi = ciuSelectedre.value;
              console.log(values);
              setUsuarioInfo({
                nombre_completo: values.nombre_completo,
                correo: values.correo,
                contraseña: values.contraseña,
                tipo_identificacion: values.tipo_identificacion,
                num_identificacion: values.num_identificacion,
                fecha_nacimiento: values.fecha_nacimiento,
                genero: values.genero,
                nacionalidad: values.nacionalidad,
                id_ciudad_nac: values.id_ciudad_nac,
                id_ciudad_resi: values.id_ciudad_resi,
                id_tipo_usuario: values.id_tipo_usuario,
                id_imagen: values.id_imagen,
                direccion: values.direccion,
                num_tel_celular: values.num_tel_celular,
                num_tel_fijo: values.num_tel_fijo,
              });
              console.log(UsuarioInfo, "eldiaablo");
            }}
          >
            {({ handleChange, handleSubmit, handleBlur, touched, errors }) => (
              <Form onSubmit={handleSubmit} id="form-registro-p">
                <div className="reg-input-bfield bfield-n">
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", height: "100%" }}
                  >
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
                        sx={{
                          m: 0,
                          marginTop: "11%",
                          marginLeft: "2%",
                          width: "90%",
                          height: "15%",
                        }}
                        focused
                        onBlur={handleBlur}
                        error={
                          touched.nombre_completo &&
                          Boolean(errors.nombre_completo)
                        }
                        helperText={
                          touched.nombre_completo && errors.nombre_completo
                        }
                      />
                      <TextField
                        label="correo electronico"
                        name="correo"
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
                        value={correo || ""}
                        onChange={handleChange}
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
                        focused
                        sx={{
                          marginTop: "10%",
                          marginLeft: "2%",
                          width: "20%",
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
                          <MenuItem value={"Cedula de ciudadania"}>
                            C.C
                          </MenuItem>

                          <MenuItem value={"Tarjeta de identidad"}>
                            T.I
                          </MenuItem>
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
                        sx={{
                          m: 0,
                          marginTop: "10%",
                          marginLeft: "2%",
                          width: "65%",
                          height: "15%",
                        }}
                        variant="outlined"
                        focused
                        onBlur={handleBlur}
                        error={
                          touched.num_identificacion &&
                          Boolean(errors.num_identificacion)
                        }
                        helperText={
                          touched.num_identificacion &&
                          errors.num_identificacion
                        }
                      />

                      <DatePicker
                        name="fecha_nacimiento"
                        label="fecha de nacimiento"
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
                        onSubmit={handleChange}
                        // handleChange={handleChange}
                        sx={{
                          m: 0,
                          marginTop: "10%",
                          marginLeft: "2%",
                          color: "biomedical.green",
                          width: "43%",
                          height: "15%",
                        }}
                        focused
                      />

                      <TextField
                        label="Género"
                        id="outlined-start-adornment"
                        name="genero"
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
                        //name="genero"
                        onChange={handleChange}
                        sx={{
                          m: 0,
                          marginTop: "10%",
                          marginLeft: "2%",
                          width: "43%",
                          height: "15%",
                        }}
                        focused
                        onBlur={handleBlur}
                        error={touched.genero && Boolean(errors.genero)}
                        helperText={touched.genero && errors.genero}
                      />
                    </div>
                  </Box>
                </div>
                <div className="bfield2 reg-input-bfield bfield-n ">
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", height: "100%" }}
                  >
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
                        sx={{
                          m: 0,
                          marginTop: "10%",
                          marginLeft: "2%",
                          width: "45%",
                          height: "15%",
                        }}
                        focused
                        onBlur={handleBlur}
                        error={
                          touched.nacionalidad && Boolean(errors.nacionalidad)
                        }
                        helperText={touched.nacionalidad && errors.nacionalidad}
                      />
                      <TextField
                        label="País de nacimiento"
                        // id="outlined-start-adornment"
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
                        onBlur={handleBlur}
                        error={touched.pais_nac && Boolean(errors.pais_nac)}
                        helperText={touched.pais_nac && errors.pais_nac}
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
                          if(newValue){
                            getcities2(newValue.value);
                            setdepSelectedna(newValue);

                          }
                          console.log(newValue, "mirahalssss");
                        }}
                        renderInput={(params) => (
                          <TextField
                          
                            {...params}
                            label="Departamento nacimiento"
                            //name="departamento_nac"
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
                          // getcities(newValue.value);
                           console.log(newValue, "miralooooo");
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
                      <TextField
                        label="País de residencia"
                        //id="outlined-start-adornment"
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
                        onBlur={handleBlur}
                        error={touched.pais_res && Boolean(errors.pais_res)}
                        helperText={touched.pais_res && errors.pais_res}
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
                          if(newValue){
                            getcities(newValue.value);
                            setdepSelectedre(newValue);

                          }
                          console.log(
                            newValue,
                            "mira departmanto residencia selected"
                          );
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
                        //defaultValue={{value: 15, label: 'BOYACÁ'}}
                        //getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, ciuSelectedre) =>
                          option.value === ciuSelectedre.value
                        }
                        value={ciuSelectedre}
                        // onClick={async () => {
                        //   const uinfo = await getCiudades(5);
                        //   console.log(uinfo.data);
                        //   // console.log(uinfo.data, "info normi");
                        // }}
                        onChange={(event, newValue) => {
                          // getcities(newValue.value);
                          // console.log(newValue.value, "mira");
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
                    </div>
                  </Box>
                </div>
                <div className="reg-input-bfield">
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", height: "100%" }}
                  >
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
                        onBlur={handleBlur}
                        error={touched.direccion && Boolean(errors.direccion)}
                        helperText={touched.direccion && errors.direccion}
                        onChange={handleChange}
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
                        onBlur={handleBlur}
                        error={
                          touched.num_tel_celular &&
                          Boolean(errors.num_tel_celular)
                        }
                        helperText={
                          touched.num_tel_celular && errors.num_tel_celular
                        }
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
                        sx={{
                          m: 0,
                          marginTop: "10%",
                          marginLeft: "2%",
                          width: "85%",
                          height: "15%",
                        }}
                        focused
                      />
                      <Button
                        variant="contained"
                        type="submit"
                        //onSubmit={onSubmit1}
                        sx={{
                          width: "50%",
                          color: "biomedical.white",
                          backgroundColor: "biomedical.blue",
                          fontSize: "16px",
                          margin: 0,
                          marginTop: "12%",
                          marginLeft: "36%",
                          ":hover": {
                            bgcolor: "biomedical3.blue", // theme.palette.primary.main
                            color: "white",
                          },
                        }}
                      >
                        Registrate
                      </Button>
                      <Popup
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        width="sm"
                        titulo="Confimar registro de paciente"
                      >
                        <div className="pop-div1">
                          Al dar click en confirmar tu información será guardada
                          y podras acceder al aplicativo.
                        </div>
                        <div className="pop-div2">
                          Recuerda que puedes realizar cambios a tu informacion
                          desde el apartado mi perfil en cualquier momento.
                        </div>
                        <div className="botones-popup-reg">
                          <Button
                            variant="contained"
                            onClick={() => setOpenPopup(false)}
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
                            Cancelar
                          </Button>
                          <Button
                            variant="contained"
                            //type="submit"
                            //onClick={async () => await SignUpUser(UsuarioInfo)}
                            onClick={() => handleSignUpUser(UsuarioInfo)}
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
    </div>
  );
}

export default RegistroForm;
