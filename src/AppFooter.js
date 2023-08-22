import React from "react";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";

function AppFooter() {
  return (
    <Box
      sx={{
        width: "calc(100vw - 32px)",
        position: "fixed",
        bottom: 0,
        left: 0,
        backgroundColor: "#fff",
        borderTop: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 16px",
      }}
    >
      <IconButton color="primary" aria-label="home">
        <HomeIcon />
      </IconButton>
      <IconButton color="primary" aria-label="search">
        <SearchIcon />
      </IconButton>
      <IconButton color="primary" aria-label="account">
        <AccountCircleIcon />
      </IconButton>
    </Box>
  );
}

export default AppFooter;
