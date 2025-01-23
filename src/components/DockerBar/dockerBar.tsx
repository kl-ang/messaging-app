import { Box, IconButton, Stack, SvgIcon, Typography } from "@mui/material";
import { useState } from "react";
import { dockerBar } from "./const";
import "./styles.css"; 

export default function DockerBar() {
  const [dockValue, setDockValue] = useState(3);

  const handleDockChange = (event: React.SyntheticEvent, newDock: number) => {
    setDockValue(newDock);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      className="docker-bar"
    >
      {dockerBar.map((dock, index) => (
        <IconButton
          key={index}
          onClick={(e) => handleDockChange(e, index)}
        >
          <Box className="docker-item">
            <SvgIcon
              component={dock.icon}
              inheritViewBox
              className={dockValue === index ? "active" : ""}
            />
            <Typography
              variant="caption"
              className={dockValue === index ? "active" : ""}
            >
              {dock.label}
            </Typography>
          </Box>
        </IconButton>
      ))}
    </Stack>
  );
}
