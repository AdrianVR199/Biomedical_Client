import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import BarraLateralR from "./BarraLateralR";
import { useAppContext } from "../context/ContextProvider";

export const ProtectedRoute2 = () => {
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
      <BarraLateralR user={usuario.nombre_completo}></BarraLateralR>
      <Outlet />
    </div>
  );
};
