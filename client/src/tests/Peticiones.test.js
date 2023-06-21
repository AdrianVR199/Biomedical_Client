import { React, useContext } from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import {
  loginUserRequest,
  loginUserRequest1,
  loadCorreosRequest,
  loadFullUserRequest,
  signupUserRequest,
  loadDepartamentosRequest,
  loadCiudadesRequest,
  CerrarSesionRequest,
  getCitasCRequest,
  ActualizarUsuarioRequest,
  createCitaRequest,
  getHorariosRequest,
  getCitasRequest,
  getCitaRequest,
  UpdateCitaRequest,
  DeleteCitaRequest,
  createHistorialRequest,
  getHistorialRequest,
  getHistorialesRequest,
  UpdateHistorialRequest,
  DeleteHistorialRequest,
  loadUserRequest,
  getUsuarioRequest,
  getUsuariosRequest,
  UpdateUsuarioRequest,
  DeleteUsuarioRequest,
} from "../api/routes.api";
import axios, { AxiosError } from "axios";
import { AppContext } from "../context/AppContext";
import { AppContextProvider, useAppContext } from "../context/ContextProvider";

/**
 * @jest-environment jsdom
 */

describe("test de la funcion para el login de los usuarios", () => {
  test("Inicio de sesión exitoso desde el cliente", async () => {
    const user = { correo: "correo12@gmail.com", contraseña: "12345" };
    const result = await loginUserRequest(user);
    expect(result.status).toBe(200);
  });
  test("Inicio de desion fallido por contraseña incorrecta", async () => {
    const user = { correo: "correo5f@gmail.com", contraseña: "testpassword" };

    const response = { error: "Contraseña incorrecta" };
    const result = await loginUserRequest(user);

    expect(result.data).toEqual(response);
    expect(result.status).toBe(200);
  });
  test("Inicio de desion fallido por correo incorrecta", async () => {
    const user = { correo: "correo5vf@gmail.com", contraseña: "testpassword" };
    const response = { error: "usuario no existe" };

    const result = await loginUserRequest(user);

    expect(result.data).toEqual(response);
    expect(result.status).toBe(200);
  });
});

test("Cierre de desión exitoso desde el cliente", async () => {
  const response = await CerrarSesionRequest();
  expect(response.status).toBe(200);
});

describe("Registro de usuario nuevo desde el cliente", () => {
  test("Debe ser exitoso el registro en el aplicativo con los datos completos de registro desde el cliente", async () => {
    const requestBodyUser = {
      nombre_completo: "Hector Oyala",
      correo: "Hector10@gmail.com",
      contraseña: "12345678",
      tipo_identificacion: "C.C",
      num_identificacion: "12345",
      fecha_nacimiento: "2000-04-18",
      genero: "Masculino",
      nacionalidad: "Colombiano",
      id_ciudad_nac: "4",
      id_ciudad_resi: "4",
      id_tipo_usuario: 1,
      id_imagen: 0,
      direccion: "Calle 28 #76-333",
      num_tel_celular: "33333",
      num_tel_fijo: "22222",
    };

    const result = await signupUserRequest(requestBodyUser);
    expect(result.status).toBe(200);
  });
});

describe("Peticiones desde el cliente", () => {
  test("Petición exitosa de departamentos", async () => {
    const result = await loadDepartamentosRequest();
    expect(result.status).toBe(200);
    expect(result.data).toEqual(expect.any(Array)); // Check if the response is an array
    expect(result.data.every((obj) => typeof obj === "object")).toBe(true);
  });
  test("Verificar que la petición de departamentos retorne una promesa", () => {
    const result = loadDepartamentosRequest();
    expect(result).toBeInstanceOf(Promise);
  });
  test("Petición exitosa de ciudades desde el cliente", async () => {
    const depValue = 5;
    const result = await loadCiudadesRequest(depValue);
    console.log(result.data);
    expect(result.status).toBe(200);
    expect(result.data).toEqual(expect.any(Array)); // Check if the response is an array
    expect(result.data.every((obj) => typeof obj === "object")).toBe(true);
  });
  test("Petición fallida de ciudades por valor de departamento erroneo", async () => {
    let error;
    await act(async () => {
      try {
        await loadCiudadesRequest(123);
      } catch (err) {
        error = err;
      }
    });
    expect(error).toBeDefined();
    expect(error.isAxiosError).toBe(true);
    expect(error.response.status).toBe(404);
  });
  test("Petición fallida del listado de citas por no estar logeado desde el cliente", async () => {
    let error;
    await act(async () => {
      try {
        const result = await getCitasCRequest();
      } catch (err) {
        error = err;
      }
    });
    expect(error).toBeDefined();
    expect(error.isAxiosError).toBe(true);
    expect(error.response.status).toBe(404);
  });
  test("Petición exitosa del listado de citas desde el cliente", async () => {
    const result = await getCitasCRequest();

    console.log(result);
    expect(result.status).toBe(200);
    expect(result.data).toEqual(expect.any(Array)); // Check if the response is an array
    expect(result.data.every((obj) => typeof obj === "object")).toBe(true);
  });
});
