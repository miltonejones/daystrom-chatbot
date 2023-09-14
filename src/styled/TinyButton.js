import React from "react";
import { IconButton } from "@mui/material";

// const Icons = React.lazy(() => import('./icons'));

const TinyButton = ({ icon: Icon, ...props }) => {
  return (
    <IconButton
      {...props}
      sx={{
        width: 18,
        height: 18,
        color: "inherit",
        opacity: props.hide ? 0 : 1,
        transition: "all 0.1s linear",
      }}
    >
      <Icon sx={{ width: 16, height: 16 }} />
    </IconButton>
  );
};

export default TinyButton;
