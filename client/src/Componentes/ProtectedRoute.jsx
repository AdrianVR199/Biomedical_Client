import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import BarraLateral from "./BarraLateral";
import { useAppContext } from "../context/ContextProvider";

export const ProtectedRoute = () => {
  const { getUsuarioinfo } = useAppContext();
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    const getuserinfo = async () => {
      const uinfo = await getUsuarioinfo();
      setUsuario(uinfo.data);
    };
    getuserinfo();
  }, []);

  return (
    <div>
      <BarraLateral user={usuario.nombre_completo}></BarraLateral>
      <Outlet />
    </div>
  );
};
