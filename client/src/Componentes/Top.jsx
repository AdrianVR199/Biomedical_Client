import React from "react";
import "../styles/top.css";
import {
  HomeOutlined,
  PeopleOutline,
  PersonOutlineOutlined,
  PendingActionsOutlined,
  TextSnippetOutlined,
} from "@mui/icons-material";

function Top({ icon, name }) {
  return (
    <div className="top-body">
      <div className="top-body-info">
        {icon && icon === "HomeOutlined" && (
          <HomeOutlined
            sx={{
              pl: "15px",
              fontSize: "30px",
              color: "biomedical.white",
            }}
          />
        )}
        {icon && icon === "PeopleOutline" && (
          <PeopleOutline
            sx={{
              pl: "15px",
              fontSize: "30px",
              color: "biomedical.white",
            }}
          />
        )}
        {icon && icon === "PersonOutlineOutlined" && (
          <PersonOutlineOutlined
            sx={{
              pl: "15px",
              fontSize: "30px",
              color: "biomedical.white",
            }}
          />
        )}
        {icon && icon === "PendingActionsOutlined" && (
          <PendingActionsOutlined
            sx={{
              pl: "15px",
              fontSize: "30px",
              color: "biomedical.white",
            }}
          />
        )}
        {icon && icon === "TextSnippetOutlined" && (
          <TextSnippetOutlined
            sx={{
              pl: "15px",
              fontSize: "30px",
              color: "biomedical.white",
            }}
          />
        )}
        <p>{name}</p>
      </div>
    </div>
  );
}

export default Top;
