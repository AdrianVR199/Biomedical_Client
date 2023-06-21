import React from "react";
import { Formik, Form } from "formik";
import "../styles/Login.css";
import Logo_vert from "../assets/Logo vertical.png";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useAppContext } from "../context/ContextProvider";
import * as Yup from "yup";
function LoginForm() {
  const { LoginUser } = useAppContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [correoRegistrado, setcorreoRegistrado] = React.useState("");

  //mensaje de validacion
  function Mensaje(correoRegistrado) {
    return correoRegistrado === "nos" ? (
      <div style={{ fontSize: "13px", marginTop: "5px" }}>
        Contraseña erronea
      </div>
    ) : correoRegistrado === "no" ? (
      <div style={{ fontSize: "13px", marginTop: "5px" }}>
        El correo electronico no esta asociado a ningun usuario, registrate en
        la seccion inferior{" "}
      </div>
    ) : null;
  }
  //esquema de validacion
  const validationSchema = Yup.object().shape({
    correo: Yup.string()
      .email("Ingrese un correo electrónico válido")
      .required("Ingrese un correo electrónico"),
    contraseña: Yup.string().required("Ingrese una contraseña"),
  });
  //mostrar o no la contraseña
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Login-bod">
      <div className="Login-form">
        <div className="lado-izq">
          <img
            style={{ width: "65%", height: "auto" }}
            src={Logo_vert}
            alt=""
          />
        </div>
        <div className="lado-der">
          <div
            style={{ width: "80%", height: "auto" }}
            className="Login-form-titulo"
          >
            <h1 style={{ fontSize: "18px", textAlign: "center" }}>
              Ingresa a tu cuenta
            </h1>
            <p style={{ fontSize: "14px" }}>Ingresa tus credenciales</p>
          </div>
          <div
            style={{ width: "80%", height: "auto" }}
            className="Login-inputs-log"
          >
            <Formik
              initialValues={{
                correo: "",
                contraseña: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                try {
                  const response = await LoginUser(values);
                  if (response.data.id_tipo_usuario === 1) {
                    navigate("/inicio");
                  } else if (response.data.id_tipo_usuario === 2) {
                    navigate("/calendario");
                  } else if (response.data.id_tipo_usuario === 3) {
                    navigate("/Calendariocitas");
                  } else if (response.data.error === "Contraseña incorrecta") {
                    setcorreoRegistrado("nos");
                  } else {
                    setcorreoRegistrado("no");
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {({
                handleChange,
                handleSubmit,
                isSubmitting,
                handleBlur,
                touched,
                errors,
              }) => (
                <Form className="Login-formulario-log" onSubmit={handleSubmit}>
                  <TextField
                    className="standard-basic"
                    name="correo"
                    onChange={handleChange}
                    label="Correo electrónico"
                    variant="standard"
                    InputLabelProps={{
                      classes: {
                        focused: "focused-correo-la",
                      },
                    }}
                    sx={{
                      mb: "5px",
                    }}
                    onBlur={handleBlur}
                    error={touched.correo && Boolean(errors.correo)}
                    helperText={touched.correo && errors.correo}
                  />

                  <FormControl
                    sx={{ m: 0, width: "100%" }}
                    variant="standard"
                    className="input-passs"
                  >
                    <InputLabel className="input-pass-il" htmlFor="password">
                      Contraseña
                    </InputLabel>
                    <Input
                      onChange={handleChange}
                      name="contraseña"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      onBlur={handleBlur}
                      error={touched.contraseña && Boolean(errors.contraseña)}
                      className={
                        touched.contraseña && errors.contraseña ? "error" : null
                      }
                      aria-invalid={errors.contraseña ? "true" : "false"}
                    />
                    {touched.contraseña && errors.contraseña ? (
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#d32f2f",
                          marginTop: "2px",
                        }}
                      >
                        {errors.contraseña}
                      </div>
                    ) : null}
                  </FormControl>
                  <Button
                    variant="outlined"
                    type="submit"
                    sx={{
                      width: 1,

                      borderColor: "bioimedical.blue",
                      border: 2,
                      color: "biomedical.blue",
                      marginTop: "10px",
                      backgroundColor: "biomedical.white",
                      fontSize: "14px",
                      boxShadow:
                        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                      ":hover": {
                        border: 2,
                        borderColor: "biomedical2.blue",
                      },
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                </Form>
              )}
            </Formik>
            <div>{Mensaje(correoRegistrado)}</div>
          </div>
          <div style={{ width: "80%", height: "auto" }}>
            <p style={{ fontSize: "14px" }}>¿No tienes cuenta?</p>

            <Button
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{
                width: 1,

                color: "biomedical.white",
                backgroundColor: "biomedical.blue",
                fontSize: "14px",
                ":hover": {
                  bgcolor: "biomedical3.blue",
                  color: "white",
                },
              }}
            >
              Registrate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
