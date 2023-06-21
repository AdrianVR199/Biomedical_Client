import React, { useState, useEffect } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";

import { PersonSearch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../context/ContextProvider";

function ListadoPacientes() {
  const { getUsuarios, getUsuarioinfo } = useAppContext();
  const [listPacientes, setlistPacientes] = useState([]);
  const navigate = useNavigate();
  const [userID, setuserID] = useState("");
  useEffect(() => {
    const getlistPacientes = async () => {
      const contentlist = await getUsuarios();
      const dataUser = await getUsuarioinfo();
      setlistPacientes(contentlist);
      setuserID(dataUser.data.id_tipo_usuario);
    };
    getlistPacientes();
  }, []);

  const rows1 = listPacientes.map((item) => ({
    id: item.usuario_id,
    col1: item.nombre_completo,
    col2: item.num_identificacion,
    col3: item.num_tel_celular,
    col4: item.correo,
  }));

  const handleButtonClick = (params, list) => {
    const rowData = params.row;
    const objetoEncontrado = list.find(
      (objeto) => objeto.usuario_id === rowData.id
    );
    if (objetoEncontrado) {
      if (userID === 2) {
        navigate(`/paciente/${objetoEncontrado.usuario_id}`);
      } else {
        navigate(`/Perfilpaciente/${objetoEncontrado.usuario_id}`);
      }
    }
  };

  const columns = [
    {
      field: "col1",
      headerName: "Nombre",
      flex: 1,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "col2",
      headerName: "Documento",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "col3",
      headerName: "Teléfono móvil",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "col4",
      headerName: "Correo electrónico",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "col5",
      align: "center",
      headerName: "Ver paciente",

      renderCell: (params) => (
        <PersonSearch
          style={{ cursor: "pointer" }}
          backgroundcolor="biomedical.green"
          onClick={() => handleButtonClick(params, listPacientes)}
        />
      ),
    },
  ];

  return (
    <div
      style={{ height: "100%", width: "100%", boxShadow: "2px 0px 6px #8888" }}
    >
      <DataGrid
        rows={rows1.reverse()}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        columns={columns}
        hideFooterSelectedRowCount
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  );
}

export default ListadoPacientes;
