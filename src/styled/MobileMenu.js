import React from "react";
import { Menu, Drawer, useMediaQuery, useTheme } from "@mui/material";

const MobileMenu = ({ children, component: Tag, ...props }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const Normal = Tag || Menu;
  const Component = isMobile ? Drawer : Normal;

  return (
    <Component anchor="bottom" {...props}>
      {children}
    </Component>
  );
};

export default MobileMenu;
