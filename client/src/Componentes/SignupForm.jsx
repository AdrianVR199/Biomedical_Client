import React, { useState } from "react";
import { Formik, Form } from "formik";
import "../styles/Signup.css";
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
  Checkbox,
  DialogContent,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import * as Yup from "yup";
import { useAppContext } from "../context/ContextProvider";
import Popup from "../Componentes/Popup";

function SignupForm() {
  const { getCorreos } = useAppContext();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [correoRegistrado, setcorreoRegistrado] = React.useState("");

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const SignupSchema = Yup.object().shape({
    correo: Yup.string()
      .email("Ingrese un correo electrónico válido")
      .required("Ingrese un correo electrónico"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es requerida"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Debe confirmar la contraseña"),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      "Debe aceptar los términos y condiciones"
    ),
  });
  function Mensaje(correoRegistrado) {
    return correoRegistrado === "nos" ? (
      <div style={{ fontSize: "13px", marginTop: "5px" }}>
        El correo ya esta en uso, prueba otro.
      </div>
    )  : null;
  }
  return (
    <div className="Sign-up-bod">
      <div className="Sign-up-form">
        <div className="Sign-up-lado-izq">
          <img
            style={{ width: "65%", height: "auto" }}
            src={Logo_vert}
            alt=""
          />
        </div>
        <div className="Sign-up-lado-der">
          <div
            style={{ width: "80%", height: "auto" }}
            className="Sign-up-form-titulo"
          >
            <h1 style={{ fontSize: "18px", textAlign: "center" }}>
              Registrate
            </h1>
            <p style={{ fontSize: "14px" }}>
              Ingresa tu correo electrónico y crea una contraseña
            </p>
          </div>
          <div
            style={{ width: "80%", height: "auto" }}
            className="Sign-up-inputs-log"
          >
            <Formik
              initialValues={{
                correo: "",
                password: "",
                confirmPassword: "",
                acceptTerms: false,
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values) => {
                try {
                  const response = await getCorreos({ correo: values.correo });

                  if (response.data.message === "sigue") {
                    navigate("/registro", {
                      state: {
                        correo: values.correo,
                        contraseña: values.confirmPassword,
                      },
                    });
                  } else if (response.data.message === "ocupado") {
                    setcorreoRegistrado("nos");
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {({
                handleChange,
                handleSubmit,
                handleBlur,
                touched,
                errors,
                values,
              }) => (
                <Form
                  className="Sign-up-formulario-log"
                  onSubmit={handleSubmit}
                >
                  <div className="sign-in-input-group">
                    <TextField
                      className="SU-standard-basic"
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
                        mb: "10px",
                        width: 1,
                      }}
                      onBlur={handleBlur}
                      error={touched.correo && Boolean(errors.correo)}
                      helperText={touched.correo && errors.correo}
                    />
                    <FormControl
                      sx={{ m: 0, width: "100%" }}
                      variant="standard"
                      className="SU-input-passs"
                    >
                      <InputLabel
                        className="SU-input-pass-il"
                        htmlFor="password"
                      >
                        Contraseña
                      </InputLabel>
                      <Input
                        onChange={handleChange}
                        name="password"
                        type={showPassword1 ? "text" : "password"}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        className={
                          touched.password && errors.password ? "error" : null
                        }
                        aria-invalid={errors.password ? "true" : "false"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword1}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword1 ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        sx={{
                          borderColor: "biomedical.blue",
                          mb: "10px",
                        }}
                      />
                      {touched.password && errors.password ? (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#d32f2f",
                            marginTop: "2px",
                          }}
                        >
                          {errors.password}
                        </div>
                      ) : null}
                    </FormControl>
                    <FormControl
                      sx={{ m: 0, width: "100%" }}
                      variant="standard"
                      className="SU-input-passs"
                    >
                      <InputLabel
                        className="SU-input-pass-il"
                        htmlFor="password"
                      >
                        Confirmar contraseña
                      </InputLabel>
                      <Input
                        onChange={handleChange}
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        onBlur={handleBlur}
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        className={
                          touched.confirmPassword && errors.confirmPassword
                            ? "error"
                            : null
                        }
                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        sx={{
                          borderColor: "biomedical.blue",
                          mb: "5px",
                        }}
                      />
                      {touched.confirmPassword && errors.confirmPassword ? (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#d32f2f",
                            marginTop: "2px",
                          }}
                        >
                          {errors.confirmPassword}
                        </div>
                      ) : null}
                    </FormControl>
                  </div>
                  <div className="sign-up-red">
                    <div>
                      <Checkbox
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={values.acceptTerms}
                        onChange={handleChange}
                        sx={{
                          fontSize: "14px",
                          paddingLeft: "0",
                        }}
                      />
                      <label htmlFor="acceptTerms">
                        Acepto los{" "}
                        <span
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() => setOpenPopup(true)}
                        >
                          términos y condiciones
                        </span>
                      </label>

                      {errors.acceptTerms && (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#d32f2f",
                            marginTop: "2px",
                          }}
                        >
                          {errors.acceptTerms}
                        </div>
                      )}
                    </div>
<div>{Mensaje(correoRegistrado)}</div>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        width: 1,
                        marginTop: "25px",
                        color: "biomedical.white",
                        backgroundColor: "biomedical.blue",
                        fontSize: "14px",
                        ":hover": {
                          bgcolor: "biomedical3.blue",
                          color: "white",
                        },
                      }}
                    >
                      Registrarse
                    </Button>
                  </div>
                  <Popup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    width="md"
                    titulo="Terminos y condiciones "
                  >
                    <div className="pop-div2">
                      <DialogContent dividers>
                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          Introducción
                        </h1>
                        <div style={{ fontSize: "14px" }}>
                          Los presentes Términos y Condiciones de uso de la
                          página web destinada al agendamiento de citas, se
                          publican con el fin de informar a todos los Usuarios,
                          que Biomedical Group, ha puesto a su disposición la
                          presente página web con la finalidad de realizar sus
                          consultas en cuestiones de disponibilidad para asistir
                          a controles médicos y demás en las sedes puestas a
                          disposición por la compañía.
                        </div>
                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          Marco Legal
                        </h1>
                        <div style={{ fontSize: "14px" }}>
                          En el presente documento el usuario encontrará las
                          condiciones para el uso de la página web, así como el
                          marco que regirá el adecuado tratamiento de los datos
                          personales que sean incorporados o circulen en la
                          misma, incluyendo los datos de carácter sensible o
                          datos de salud. Teniendo en cuenta lo anterior, el
                          tratamiento de los datos personales del usuario será
                          realizado de conformidad con lo establecido en la
                          legislación vigente en materia de Habeas Data y de
                          manera particular por lo previsto en la Ley
                          Estatutaria 1581 de 2012, Decreto Único Reglamentario
                          del Sector Comercio, Industria y Turismo (Decreto 1074
                          de 2015). El contenido de los Términos y Condiciones
                          aquí previstos, puede ser objeto de modificaciones o
                          actualizaciones, razón por la que será obligación del
                          usuario revisar periódicamente el contenido de los
                          mismos con el fin de mantenerse informado frente a los
                          cambios que se puedan presentar. Por lo anterior,
                          mediante la puesta en conocimiento de los Términos y
                          Condiciones de la página web y la información
                          contenida en la misma, se entenderá cumplido el deber
                          de información al usuario.
                        </div>
                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          Uso de la página web de agendamiento de citas
                          Biomedical Group
                        </h1>
                        <div style={{ fontSize: "14px" }}>
                          La calidad de usuario se obtiene al momento en el que
                          la persona es registrada dentro de la base de datos de
                          la empresa, siendo necesarios una serie de datos
                          personales utilizados para la identificación del
                          usuario dentro del sistema. El proceso de registro lo
                          realiza uno de los trabajadores de la empresa ya sea
                          de forma presencial o a través de una de las líneas de
                          atención al cliente de la empresa. <br /> La calidad
                          de Usuario se perderá en los siguientes eventos:
                        </div>
                        <ul>
                          <li style={{ fontSize: "14px" }}>
                            1. En el evento en que se logre demostrar que
                            existió suplantación de identidad.
                          </li>
                          <li></li>
                          <li style={{ fontSize: "14px" }}>
                            2. En cualquier momento en que el usuario registrado
                            realice alguna actuación considerada como violatoria
                            de estos Términos y Condiciones o cualquier conducta
                            contraria a la legislación colombiana, el orden
                            público o las buenas costumbres.
                          </li>
                        </ul>
                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          Creación de Usuario para el acceso a la página web de
                          agendamiento de citas:
                        </h1>
                        <div style={{ fontSize: "14px" }}>
                          El Usuario de la mencionada página web entiende y
                          acepta que para hacer uso de la misma se requiere la
                          creación de una cuenta de usuario que lo identifique
                          como tal a la cual se podrá acceder por medio de una
                          contraseña que será de uso personal e intransferible.
                        </div>
                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          Uso de la contraseña.
                        </h1>
                        <div style={{ fontSize: "14px" }}>
                          El usuario acepta que las contraseñas ingresadas por
                          éste al momento de su registro para acceder al
                          contenido de los servicios de la página web de
                          agendamiento de citas son privadas e intransferibles,
                          por lo que tendrá la obligación de custodia de las
                          mismas, siendo el único responsable de las
                          consecuencias derivadas del uso que otras personas o
                          terceros hagan de ellas por la falta del cumplimiento
                          del deber de custodia de dichas contraseñas. Por lo
                          anterior, el usuario se compromete a informar a más
                          tardar dentro del día hábil siguiente a la compañía
                          Biomedical Group, la pérdida o robo de su contraseña,
                          el uso no autorizado de su contraseña por parte de
                          terceros o cualquier circunstancia que deba ser
                          conocida por esta con el fin de evitar actos
                          fraudulentos en contra de su propia persona, la
                          compañía o de terceros. El Usuario al hacer uso de su
                          contraseña, directamente o a través de su
                          representante, se obliga a abstenerse de realizar las
                          siguientes acciones: a) Acceder a documentos
                          confidenciales o datos de salud de personas de las que
                          no se encuentra legitimado por ley o por convención
                          para hacerlo. b) Suministrar información falsa a
                          título personal, de su grupo familiar o de la persona
                          a quien representa, así como omitir datos necesarios
                          para la buena prestación del servicio. c) Dar un uso
                          de la página web contraria a la Ley, la moral y las
                          buenas costumbres. d) Realizar acciones tendientes a
                          ocasionar daño o interrupción del servicio de la
                          página web de agendamiento de citas El Usuario que
                          viole cualquiera de las condiciones contenidas en este
                          numeral, será responsable por los daños y perjuicios
                          de cualquier naturaleza que pueda sufrir Biomedical
                          Group o cualquier tercero que resulte perjudicado por
                          esta actuación.
                        </div>
                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          Obligaciones del Usuario
                        </h1>
                        <ul>
                          <li style={{ fontSize: "14px" }}>
                            a. El Usuario y/o su representante, se compromete a
                            hacer uso de los Canales Virtuales, de conformidad
                            con la ley colombiana, estos Términos y Condiciones
                            y la demás información e instrucciones que sean
                            puestas en su conocimiento por parte de LA COMPAÑÍA,
                            así como de conformidad con el orden público, la
                            moral y las buenas costumbres.
                          </li>
                          <li style={{ fontSize: "14px" }}>
                            b. El usuario garantiza la autenticidad y veracidad
                            de todos aquellos datos personales e información que
                            entregue para completar el proceso de agendamiento
                            de la cita. Así mismo, el usuario se compromete y se
                            responsabiliza de mantener actualizada toda la
                            información que haya entregado, permitiendo con ello
                            prestar un mejor servicio por parte de la compañía.
                          </li>
                          <li style={{ fontSize: "14px" }}>
                            c. Cuando el usuario inserta o incorpora cualquier
                            información a la página web, garantiza a la compañía
                            que la información es completa y veraz, que posee
                            todos los derechos sobre la misma y/o que se
                            encuentra autorizado para entregarla, según
                            corresponda
                          </li>
                        </ul>
                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          Tratamiento de datos personales{" "}
                        </h1>
                        <div style={{ fontSize: "14px" }}>
                          La ley 1581 de 2012 y el Decreto Único Reglamentario
                          del Sector Comercio, Industria y Turismo-Decreto 1074
                          de 2015- establecen el marco de protección de datos
                          personales en Colombia. Por esta razón, todas las
                          personas tanto jurídicas como naturales que
                          intervienen en el Tratamiento de los datos personales
                          se encuentran sujetas a lo previsto en dicha
                          normatividad. Por lo anterior, teniendo en cuenta que
                          la información que circulará en la página web de
                          agendamiento de citas corresponde a información
                          personal de los usuarios, el Tratamiento de tales
                          datos será realizado por Biomedical Group con sujeción
                          a las finalidades autorizadas por los usuarios,
                          contenidas en estos Términos y Condiciones y a lo
                          previsto en la Política de Privacidad y Protección de
                          la Información que ésta ha adoptado, la cual se
                          encuentra contenida en el mencionado sitio web y se
                          expone al usuario cuando decide iniciar el proceso de
                          agendamiento.
                        </div>
                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          Derechos de Propiedad Industrial e Intelectual
                        </h1>
                        <div style={{ fontSize: "14px" }}>
                          Todas las marcas, nombres comerciales, signos
                          distintivos, diseños industriales, modelos de
                          utilidad, patentes, servicios, contenidos e
                          informaciones de cualquier clase que aparecen en la
                          página web de agendamiento de citas son propiedad de
                          Biomedical Group, por lo que no podrán ser
                          reproducidos, distribuidos, comunicados públicamente,
                          transformados o modificados sin autorización expresa.
                          Por lo anterior, el usuario se abstendrá de utilizar
                          en cualquier forma las marcas, nombres comerciales,
                          signos distintivos, diseños industriales, modelos de
                          utilidad, patentes y demás elementos sujetos a
                          propiedad intelectual de Biomedical Group.
                        </div>
                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          Derechos de autor{" "}
                        </h1>
                        <div style={{ fontSize: "14px" }}>
                          Todo el contenido de cualquier clase que aparezca en
                          la página de agendamiento de citas es susceptible de
                          ser objeto de derechos patrimoniales de autor,
                          conforme a la Ley 23 de 1982 y demás normas que
                          regulen esta materia, es propiedad de Biomedical
                          Group, por lo que no podrá ser reproducido,
                          distribuido, comunicado públicamente, transformado,
                          copiado o modificado sin autorización expresa. Por lo
                          anterior, el usuario se abstendrá de obtener los
                          contenidos de la página web de agendamiento de citas,
                          empleando para ello medios o procedimientos distintos
                          de los que, en algunos casos, se han puesto a su
                          disposición o, en general, de los que se empleen
                          habitualmente en Internet siempre que, estos últimos,
                          no entrañen un riesgo o daño o inutilización del sitio
                          Web y/o sus contenidos. En ningún caso se entenderá
                          que el acceso y la navegación del usuario en la página
                          de agendamiento de citas, implica que Biomedical Group
                          haya otorgado una autorización o haya renunciado,
                          transmitido, cedido total o parcialmente sus derechos,
                          ni la concesión de ningún derecho ni expectativa de
                          derecho y en concreto, la alteración, transformación,
                          explotación, reproducción, distribución, copia o
                          comunicación pública sobre cualquier contenido
                          susceptible de ser objeto de derechos de autor.
                        </div>

                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          Legislación y jurisdicción
                        </h1>
                        <div style={{ fontSize: "14px" }}>
                          Los presentes términos y condiciones se regirán por la
                          Legislación colombiana, y la jurisdicción competente
                          para conocer de cualquier demanda que el uso de la
                          página de agendamiento de citas suscite será la de los
                          Juzgados y Tribunales de la República de Colombia.
                        </div>
                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          Nulidad e ineficacia de los numerales o cláusulas
                        </h1>
                        <div style={{ fontSize: "14px" }}>
                          Si cualquier numeral o cláusula incluida en estos
                          Términos y Condiciones fuese declarado, total o
                          parcialmente, nulo o ineficaz, tal nulidad o
                          ineficacia afectará tan sólo a dicha disposición o a
                          la parte de la misma que resulte nula o ineficaz,
                          subsistiendo los Términos y Condiciones en todo lo
                          demás.
                        </div>
                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          POLÍTICA DE PRIVACIDAD
                        </h1>
                        <div style={{ fontSize: "14px" }}>
                          La presente Política de Privacidad establece los
                          términos en que usa y protege la información que es
                          proporcionada por sus usuarios al momento de utilizar
                          su sitio web. Esta compañía está comprometida con la
                          seguridad de los datos de sus usuarios. Cuando le
                          pedimos llenar los campos de información personal con
                          la cual usted pueda ser identificado, lo hacemos
                          asegurando que sólo se emplea de acuerdo con los
                          términos de este documento. Sin embargo esta Política
                          de Privacidad puede cambiar con el tiempo o ser
                          actualizada por lo que le recomendamos y enfatizamos
                          revisar continuamente esta página para asegurarse que
                          está de acuerdo con dichos cambios.
                        </div>
                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          Información que es recogida
                        </h1>
                        <div style={{ fontSize: "14px" }}>
                          Nuestro sitio web podrá recoger información personal
                          por ejemplo: Nombre, número de cédula, información de
                          contacto, dirección de correo electrónica e
                          información demográfica. Así mismo cuando sea
                          necesario podrá ser requerida información específica
                          para procesar su solicitud frente a la disponibilidad
                          de profesionales de la salud de Biomedical Group, con
                          el fin de atenderle.
                        </div>
                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          Uso de la información recogida
                        </h1>
                        <div style={{ fontSize: "14px" }}>
                          Nuestro sitio web emplea la información con el fin de
                          proporcionar el mejor servicio posible,
                          particularmente para mantener un registro de usuarios,
                          disponibilidad para atención, y mejorar nuestros
                          productos y servicios. Los datos almacenados de los
                          usuarios son utilizados con el objetivo de que en el
                          momento de realizar el agendamiento de las citas
                          médicas, sus datos sean enlazados a dicha cita, con lo
                          cual, en el momento de ser atendido por el médico,
                          este contará con la información necesaria para poder
                          brindar un espacio de atención médica personalizado y
                          ágil.
                        </div>
                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          Cookies
                        </h1>
                        <div style={{ fontSize: "14px" }}>
                          Nuestro sitio web emplea las cookies para poder
                          identificar las páginas que son visitadas y su
                          frecuencia. Esta información es empleada únicamente
                          para análisis estadístico y después la información se
                          elimina de forma permanente. Usted puede eliminar las
                          cookies en cualquier momento desde su ordenador. Sin
                          embargo las cookies ayudan a proporcionar un mejor
                          servicio de los sitios web, estás no dan acceso a
                          información de su ordenador ni de usted, a menos de
                          que usted así lo quiera y la proporcione directamente
                          . Usted puede aceptar o negar el uso de cookies, sin
                          embargo la mayoría de navegadores aceptan cookies
                          automáticamente pues sirve para tener un mejor
                          servicio web. También usted puede cambiar la
                          configuración de su ordenador para declinar las
                          cookies. Si se declinan es posible que no pueda
                          utilizar algunos de nuestros servicios.
                        </div>
                        <h1 style={{ fontSize: "18px", fontWeight: "normal" }}>
                          Control de su información personal
                        </h1>
                        <div style={{ fontSize: "14px" }}>
                          En cualquier momento usted puede restringir la
                          recopilación o el uso de la información personal que
                          es proporcionada a nuestro sitio web. Cada vez que se
                          le solicite rellenar un formulario, como el de alta de
                          usuario, puede marcar o desmarcar la opción de recibir
                          información por correo electrónico. Esta compañía no
                          venderá, cederá ni distribuirá la información personal
                          que es recopilada sin su consentimiento, salvo que sea
                          requerido por un juez con una orden judicial. Se
                          reserva el derecho de cambiar los términos de la
                          presente Política de Privacidad en cualquier momento.
                        </div>
                      </DialogContent>
                    </div>
                    <div className="botones-popup-reg">
                      <Button
                        variant="contained"
                        onClick={() => setOpenPopup(false)}
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
                        Acepto los terminos y condiciones
                      </Button>
                    </div>
                  </Popup>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
