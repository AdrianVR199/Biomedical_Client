import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import BarraLateralM from "./BarraLateralM";
import { useAppContext } from "../context/ContextProvider";

export const ProtectedRoute1 = () => {
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
      <BarraLateralM user={usuario.nombre_completo}></BarraLateralM>
      <Outlet />
    </div>
  );
};
