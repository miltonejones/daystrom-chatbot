import React from "react";
import { Menu, Drawer, useMediaQuery, useTheme } from "@mui/material";

const MobileMenu = ({ children, ...props }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const Component = isMobile ? Drawer : Menu;

  return (
    <Component {...props} anchor="bottom">
      {children}
    </Component>
  );
};

export default MobileMenu;
